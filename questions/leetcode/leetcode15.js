// https://leetcode.com/problems/3sum/

// two pointer pattern

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    let result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let start = i + 1;
        let end = nums.length - 1;

        while (start < end) {
            if (nums[i] + nums[start] + nums[end] === 0) {
                result.push([nums[i], nums[start], nums[end]]);

                while (start < end && nums[start] === nums[start + 1]) {
                    start++;
                }
                start++;

                while (start < end && nums[end] === nums[end - 1]) {
                    end--;
                }
                end--;
            }
            else if (nums[i] + nums[start] + nums[end] > 0) end--;
            else start++;
        }
    }
    return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, 4]));