/**
 * @param {number[]} nums
 * @return {number}
 */
// O(n) time | O(1) space
var rob = function (nums) {
    if (nums === null || nums.length === 0) {
        return 0;
    }
    let dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }
    return dp[nums.length - 1];
};