// https://leetcode.com/problems/append-characters-to-string-to-make-subsequence/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var appendCharacters = function (s, t) {
    let i = 0;
    let j = 0;

    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            j++;
        }
        i++;
    }

    return t.length - j;
};