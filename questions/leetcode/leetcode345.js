// https://leetcode.com/problems/reverse-vowels-of-a-string/description/

/**
 * @param {string} s
 * @return {string}
 */

var reverseVowels = function (s) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let ans = s.split('');
    let start = 0;
    let end = s.length - 1;

    while (start < end) {
        if (vowels.includes(s[start].toLowerCase()) && vowels.includes(s[end].toLowerCase())) {
            [ans[start], ans[end]] = [ans[end], ans[start]];
            start++;
            end--;
        }
        if (!vowels.includes(s[start].toLowerCase())) {
            start++;
        }
        if (!vowels.includes(s[end].toLowerCase())) {
            end--;
        }
    }

    return ans.join('');
};

