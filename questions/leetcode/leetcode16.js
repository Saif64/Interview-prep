// https://leetcode.com/problems/3sum-closest/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    nums = nums.sort((a, b) => a - b);

    let min = Number.MAX_SAFE_INTEGER;
    let ans = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        let j = i + 1;
        let k = n - 1;

        while (j < k) {
            const sum = nums[i] + nums[j] + nums[k];

            if (min > Math.abs(target - sum)) {
                min = Math.abs(target - sum);
                ans = sum;
            }

            if (sum > target) {
                k--;
            } else if (sum < target) {
                j++;
            } else {
                return sum;
            }
        }
    }

    return ans;
};

