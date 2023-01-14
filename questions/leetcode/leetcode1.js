// https://leetcode.com/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        const numTofind = target - nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            if (numTofind === nums[j]) {
                return [i, j];
            }
        }
    }
    return null;
};

let arr = [1, 2, 5, 3, 6];
console.log(twoSum(arr, 8));  // this case fails to find all the solution as 5+3=8 as well


// more efficient solution using HashMap

const twoSumHash = (nums, target) => {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        const currentVal = map[nums[i]];
        if (currentVal >= 0) return [currentVal, i];
        else {
            const numToFind = target - nums[i];
            map[numToFind] = i;
        }
    }
    return null;
};

console.log(twoSumHash(arr, 8));