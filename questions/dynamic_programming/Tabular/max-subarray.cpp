/*
Given an integer array nums, find the subarray with the largest sum, and return its sum.
 
Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
*/

// Leetcode 53
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max_sum = INT_MIN;
        int current_sum = 0;
        
        for(int n:nums) {
            current_sum = max(n, current_sum+n);
            max_sum = max(current_sum, max_sum);
        }
        
        return max_sum;
    }
};
