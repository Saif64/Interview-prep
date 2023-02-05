/*
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
*/

// Leetcode 347
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> umap;
        priority_queue<pair<int, int>> pq;
        vector<int> ans;
        
        for(int n:nums) {
            umap[n]++;
        }
        
        for(auto it = umap.begin();it != umap.end(); it++) {
            pq.push({ it->second, it->first });
        }
        
        for(int i=0;i<k;i++) {
            ans.push_back(pq.top().second);
            pq.pop();
        }
        
        return ans;
    }
};