// https://leetcode.com/problems/number-of-arithmetic-triplets/description/

// initial brute force solution using 3 loops
/**
 * @param {number[]} nums
 * @param {number} diff
 * @return {number}
 */
var arithmeticTriplets = function (nums, diff) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[j] - nums[i] === diff && nums[k] - nums[j] === diff) {
                    count++;
                }
            }
        }
    }
    return count;
};

// optimized solution
var arithmeticTripletsOptimized = function (nums, diff) {
    let count = 0;
    for (let num of nums) {
        if (nums.includes(num + diff) && nums.includes(num + diff * 2)) {
            count++;
        }
    }
    return count;
};

var arithmeticTripletsOptimized2 = function (nums, diff) {
    let count = 0;
    for (let i = nums.length - 1; i > 0; i--) {
        if (nums.includes(nums[i] - diff) && nums.includes(nums[i] - diff * 2)) {
            count++;
        }
    }
    return count;
};

// Set solution
const arithmeticTripletsSet = (nums, diff) => {
    let count = 0;
    const set = new Set(nums);

    for (let i = nums.length - 1; i > 0; i--) {
        if (set.has(nums[i] - diff) && set.has(nums[i] - diff * 2)) {
            count++;
        }
    }
    return count;

};

const nums = [4, 5, 6, 7, 8, 9], diff = 2;

console.log(arithmeticTripletsSet(nums, diff));



