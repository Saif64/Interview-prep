/*
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
You must solve this problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
*/

// Leetcode 75
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int left = 0, right = nums.size()-1, k = 0;
        while(k <= right) {
            if(nums[k] == 0) {
                swap(nums[k++], nums[left++]);
            } else if(nums[k] == 1) {
                k++;
            } else {
                swap(nums[k], nums[right--]);
            }
        }
    }
};