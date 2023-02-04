/*
Given an array of positive integers nums and a positive integer target, return the minimal length of a 
subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
 
Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
*/

// Leetcode 209
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int sum = 0;
        int len = INT_MAX;
        
        int left = 0, right = 0;
        
        while(right < nums.size()) {
            sum += nums[right];
            if(sum >= target) {
                while(sum >= target) {
                    sum -= nums[left++];
                    if(sum < target) {
                        len = min(len, right-left+2);
                    }
                }
            }
            right++;
        }
        
        return len == INT_MAX ? 0 : len;
    }
};