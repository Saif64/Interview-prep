// important
// https://leetcode.com/problems/generate-parentheses/

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n, str = '', left = 0, right = 0) {
    let arr = [];
    if (str.length == n * 2) return str;
    if (left < n) arr = arr.concat(generateParenthesis(n, str + '(', left + 1, right));
    if (right < n && right < left) arr = arr.concat(generateParenthesis(n, str + ')', left, right + 1));
    return arr;
};