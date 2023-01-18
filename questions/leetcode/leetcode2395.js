// https://leetcode.com/problems/find-subarrays-with-equal-sum/description/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var findSubarrays = function (nums) {
    let sums = new Set();

    for (let i = 0; i < nums.length - 1; i++) {
        if (sums.has(nums[i] + nums[i + 1])) {
            return true;
        } else {
            sums.add(nums[i] + nums[i + 1]);
        }
    }

    return false;
};