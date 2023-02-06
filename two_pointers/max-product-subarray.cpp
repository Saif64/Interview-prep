/*
Given an integer array nums, find a subarray that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.

Example 1:
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
*/

// Leetcode 152
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int left = 1, right = 1, result = nums[0];
        for(int i=0;i<nums.size();i++) {
            left *= nums[i];
            right *= nums[nums.size()-1-i];
            result = max(result, max(left, right));
            if(left == 0) left = 1;
            if(right == 0) right = 1;
        }
        return result;
    }
};