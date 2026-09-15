// 207. Course Schedule — Medium
// https://leetcode.com/problems/course-schedule/
// Pattern: Graphs (topological sort)
// Time O(V + E) | Space O(V + E)
//
// Idea: "can every course be taken?" is "is this dependency graph acyclic?".
// Kahn's algorithm: repeatedly remove a node with no remaining prerequisites. If some nodes
// can never be removed, they are stuck in a cycle.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites  [course, prerequisite]
 * @return {boolean}
 */
const canFinish = (numCourses, prerequisites) => {
  const dependents = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    dependents[prereq].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);

  let taken = 0;
  while (queue.length) {
    const course = queue.pop();
    taken++;
    for (const next of dependents[course]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return taken === numCourses;
};

module.exports = { canFinish };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(canFinish(2, [[1, 0]]), true);
  assert.strictEqual(canFinish(2, [[1, 0], [0, 1]]), false); // cycle
  assert.strictEqual(canFinish(1, []), true);
  assert.strictEqual(canFinish(3, [[0, 1], [1, 2], [2, 0]]), false);
  assert.strictEqual(canFinish(5, [[1, 0], [2, 0], [3, 1], [4, 2]]), true); // a tree
  console.log('207 ok');
}
