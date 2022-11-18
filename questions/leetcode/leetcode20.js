// very important
// https://leetcode.com/problems/valid-parentheses/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let brac = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    let stack = [];

    for (let i of s) {
        if (brac[i]) {
            stack.push(brac[i]);
        } else {
            if (stack.pop() !== i) return false;
        }
    }
    return !stack.length;
};