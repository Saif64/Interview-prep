/*
You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times:
Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.
Return the maximum number of points you can earn by applying the above operation some number of times.

Example 1:
Input: nums = [3,4,2]
Output: 6
Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.
*/

// Leetcode 740
// memoised recursive
class Solution {
public:
    int dp[20001];
    int helper(vector<int>& nums, int position) {
        if(position >= nums.size()) return 0;
        if(dp[position] != -1) return dp[position];
        
        int curSum = 0;
        int i = position;
        while(i < nums.size() && nums[i]==nums[position]) {
            curSum += nums[i];
            i++;
        }
        
        while(i < nums.size() && nums[i]==nums[position]+1) {
            i++;
        }
        
        return dp[position] = max(curSum + helper(nums, i), helper(nums, position + 1));
    }
    
    int deleteAndEarn(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        memset(dp, -1, sizeof dp);
        return helper(nums, 0);
    }
};
 
// tabular approach
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int dp[nums.size()+1];
        dp[nums.size()] = 0;
        sort(nums.begin(), nums.end());
        for(int i=nums.size()-1;i>=0;i--) {
            int current = i;
            int sum = 0;
            int value = nums[i];
            while(current < nums.size() && value == nums[current]) {
                sum += nums[current++];
            }
            while(current < nums.size() && value+1 == nums[current]) {
                current++;
            }
            dp[i] = max(sum+dp[current], dp[i+1]);
        }
        return dp[0];
    }
};