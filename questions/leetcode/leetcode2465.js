// https://leetcode.com/problems/number-of-distinct-averages/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctAverages = function (nums) {
    //Sort the array from min to max number
    nums = nums.sort((a, b) => a - b);
    //Create set to store only distint averages
    let s = new Set();
    //Loop from 0 to middle and calculate average of min element and max (at the end of the sorted array), then add it to the set
    for (let i = 0; i < (nums.length / 2); i++) {
        s.add((nums[i] + nums[nums.length - i - 1]) / 2);
    } return s.size; //the size of the set is the answer (distinct averages)  
};