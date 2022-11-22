// 5! = 5 * 4 * 3 * 2 * 1


let t0 = performance.now();
function findFactorialRecursively(n) {

    if (n === 2) {
        return 2;
    }
    return n * findFactorialRecursively(n - 1);
}
let t1 = performance.now();
// console.log(t1 - t0);

// using loop method which iterates over the number
let t3 = performance.now();
function findFactorialIteratively(num) {
    let answer = 1;
    for (let i = 2; i <= num; i++) {
        answer *= i;
    }
    return answer;
}
let t4 = performance.now();
// console.log(t4 - t3);

// console.log(findFactorialIteratively(5));
// console.log(findFactorialRecursively(5));
