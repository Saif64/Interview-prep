#!/usr/bin/env node
/**
 * Compiles every Kotlin solution in one kotlinc pass, then runs each file's `main`.
 *
 *   node tools/test-kotlin.js            # everything
 *   node tools/test-kotlin.js trees      # only paths containing "trees"
 *   node tools/test-kotlin.js --no-build # reuse the previous compile
 *
 * Requires kotlinc on PATH, or a SDKMAN install at ~/.sdkman/candidates/kotlin.
 * Skips with exit 0 (and a note) when Kotlin is absent, so contributors without it can
 * still run the rest of the suite.
 */

const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const KOTLIN_DIR = path.join(ROOT, 'neetcode-150', 'kotlin');
const SRC = path.join(KOTLIN_DIR, 'src');
const BUILD = path.join(KOTLIN_DIR, 'build');

const args = process.argv.slice(2);
const noBuild = args.includes('--no-build');
const filter = args.find((a) => !a.startsWith('--'));

/** Find kotlinc: PATH first, then a SDKMAN install. */
const findKotlinHome = () => {
  const onPath = spawnSync('which', ['kotlinc'], { encoding: 'utf8' });
  if (onPath.status === 0) return path.dirname(path.dirname(onPath.stdout.trim()));
  const sdkman = path.join(os.homedir(), '.sdkman', 'candidates', 'kotlin', 'current');
  if (fs.existsSync(path.join(sdkman, 'bin', 'kotlinc'))) return sdkman;
  return null;
};

const kotlinHome = findKotlinHome();
if (!kotlinHome) {
  console.log('kotlinc not found — skipping the Kotlin suite.');
  console.log('Install it with:  sdk install kotlin   (https://sdkman.io)');
  process.exit(0);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.kt') ? [full] : [];
  });

/**
 * Work out the JVM class a Kotlin file compiles to.
 * `@file:JvmName("TwoSum")` in package `neetcode.arrayshashing` -> neetcode.arrayshashing.TwoSum
 */
const classNameFor = (file) => {
  const source = fs.readFileSync(file, 'utf8');
  const jvmName = source.match(/@file:JvmName\("([^"]+)"\)/);
  const pkg = source.match(/^package\s+([\w.]+)/m);
  if (!jvmName || !pkg) return null;
  return `${pkg[1]}.${jvmName[1]}`;
};

if (!noBuild) {
  process.stdout.write('compiling… ');
  const started = Date.now();
  try {
    execFileSync(path.join(kotlinHome, 'bin', 'kotlinc'), [SRC, '-d', BUILD, '-nowarn'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch (error) {
    console.error('\nCompilation failed:\n');
    console.error((error.stderr?.toString() || error.message).split('\n').slice(0, 40).join('\n'));
    process.exit(1);
  }
  console.log(`${((Date.now() - started) / 1000).toFixed(1)}s`);
}

const stdlib = path.join(kotlinHome, 'lib', 'kotlin-stdlib.jar');
const classpath = [BUILD, stdlib].join(path.delimiter);

const targets = walk(SRC)
  .filter((f) => !filter || f.includes(filter))
  .map((file) => [path.relative(ROOT, file), classNameFor(file)])
  .filter(([, className]) => className && !className.startsWith('neetcode.lib.'))
  .sort();

let passed = 0;
const failures = [];

for (const [label, className] of targets) {
  try {
    execFileSync('java', ['-cp', classpath, className], { stdio: 'pipe', timeout: 30000 });
    passed++;
  } catch (error) {
    const message = (error.stderr?.toString() || error.message).trim().split('\n').slice(0, 5).join('\n');
    failures.push([label, message]);
  }
}

for (const [label, message] of failures) {
  console.error(`\nFAIL ${label}\n${message}`);
}

console.log(`\n${passed}/${targets.length} passed${failures.length ? `, ${failures.length} failed` : ''}`);
process.exit(failures.length ? 1 : 0);
