// https://leetcode.com/problems/longest-substring-without-repeating-characters/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const n = s.length;

    let left = 0;
    let right = 0;
    let max = 0;
    let set = new Set();

    while (right < n) {
        const character = s[right];
        if (!set.has(character)) {
            set.add(character);
            right++;
            max = Math.max(set.size, max);
        } else {
            set.delete(s[left]);
            left++;
        }
    }
    return max;

};