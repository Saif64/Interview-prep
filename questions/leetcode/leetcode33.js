//https://leetcode.com/problems/search-in-rotated-sorted-array/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let startIndex = 0;
    let endIndex = nums.length - 1;

    if (startIndex > endIndex) return -1;

    while (startIndex <= endIndex) {
        let midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

        if (nums[midIndex] === target) return midIndex;

        if (nums[startIndex] <= nums[midIndex]) {
            if (nums[startIndex] <= target && target < nums[midIndex]) endIndex = midIndex - 1;
            else startIndex = midIndex + 1;
        } else {
            if (nums[midIndex] < target && target <= nums[endIndex]) startIndex = midIndex + 1;
            else endIndex = midIndex - 1;
        }
    }

    return -1;
};