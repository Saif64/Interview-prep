// https://leetcode.com/problems/group-anagrams/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
    // Sorting
    const strSort = strs.map(word => word.split('').sort().join(''));
    // Create HashMap
    const hashMap = {};

    // Iterate with normal For-Loop
    for (let i = 0; i < strs.length; i++) {
        if (!hashMap[strSort[i]]) {
            hashMap[strSort[i]] = [strs[i]];
        } else {
            hashMap[strSort[i]].push(strs[i]);
        }
    }
    return Object.values(hashMap);
};