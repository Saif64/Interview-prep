// https://leetcode.com/problems/median-of-two-sorted-arrays/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    const nums = [...nums1, ...nums2].sort((a, b) => a - b);
    const len = nums.length;
    const mid = Math.floor(len / 2);
    if (len % 2 == 1) return nums[mid];
    return (nums[mid] + nums[mid - 1]) / 2;
};

