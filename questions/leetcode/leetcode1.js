// https://leetcode.com/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [i, map.get(diff)];
        } else {
            map.set(nums[i], i);
        }
    }
    return [];
};