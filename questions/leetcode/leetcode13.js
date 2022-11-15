// This is Important

// https://leetcode.com/problems/roman-to-integer

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let sum = 0;

    s.split('').forEach(function (num, i) {
        if (roman[num] < roman[s[i + 1]]) return sum -= roman[num];
        else return sum += roman[num];
    });
    return sum;
};