/*
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
*/

// Leetcode 198
// memoised recursion
class Solution {
public:
    int helper(vector<int>& nums, vector<int>& dp, int house) {
        if(house >= nums.size()) return 0;
        if(dp[house] != -1) return dp[house];
        
        return dp[house] = max(nums[house] + helper(nums, dp, house+2), helper(nums, dp, house + 1));
    }
    
    int rob(vector<int>& nums) {
        vector<int> dp(nums.size(), -1);
        return helper(nums, dp, 0);
    }
};

// tabular
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        int dp[n+1];
        dp[n] = 0;
        for(int i=nums.size()-1;i>=0;i--) {
            int sum = nums[i];
            if(i+2 < n) sum += dp[i+2];
            dp[i] = max(sum, dp[i + 1]);
        }
        return dp[0];
    }
};