// https://leetcode.com/problems/reverse-string-ii/description/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (str, k) {
    str = str.split('');
    for (let i = 0; i < str.length; i += 2 * k) {
        let start = i;
        let end = start + k - 1;
        if (end > str.length - 1) end = str.length - 1;

        while (start < end) {
            [[str[start++]], [str[end--]]] = [[str[end]], [str[start]]];
        }
    }
    return str.join('');
};