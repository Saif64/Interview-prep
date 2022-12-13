/* write a function that takes in a number as an argument.
 The function should return the n-th number of the Fibonacci series.

 n:         1, 2, 3, 4, 5, 6, 7, 8
 fib(n):    1, 1, 2, 3, 5, 8, 13, 21
*/


// const fib = (n) => {
//     if (n <= 2) return 1;
//     return fib(n - 1) + fib(n - 2);
// };

// if I use fib(50) it will take a long time to finish this job. It is too slow.
// So we will try to improve it's efficiancy and make it into DP

/* Memoization */
// JS object, Keys will be args to fn, value will be the return value

const fibDP = (n, memo = {}) => {
    // Base case
    if (n in memo) return memo[n];
    if (n <= 2) return 1;

    // Recursive case
    memo[n] = fibDP(n - 1, memo) + fibDP(n - 2, memo);
    return memo[n];
};

console.log(fibDP(50));

// this is way faster than the upper one or the tradditional one. :)