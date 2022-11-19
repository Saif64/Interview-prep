//https://leetcode.com/problems/search-insert-position/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        let mid = Math.floor((start + end) / 2);
        if (nums[mid] === target) return mid;
        nums[mid] > target ? end = mid : start = mid + 1;
    }
    if (start === end) {
        return target <= nums[start] ? start : start + 1;
    }
};