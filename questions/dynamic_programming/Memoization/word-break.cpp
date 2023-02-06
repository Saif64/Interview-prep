/*
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
Note that the same word in the dictionary may be reused multiple times in the segmentation.

 
Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
*/

// Leetcode 139
class Solution {
public:
    int dp[301];
    int helper(int position, string s, unordered_set<string>& wordSet) {
        if(position == s.size()) return 1;
        if(dp[position] != -1) return dp[position];
        string temp;
        for(int i=position;i<s.size();i++) {
            temp += s[i];
            if(wordSet.find(temp) != wordSet.end()) {
                if(helper(i+1, s, wordSet)) return dp[position] = 1;
            }
        }
        return dp[position] = 0;
    }
    
    bool wordBreak(string s, vector<string>& wordDict) {
        memset(dp, -1, sizeof dp);
        unordered_set<string> wordSet;
        for(string word:wordDict) {
            wordSet.insert(word);
        }
        return helper(0, s, wordSet);
    }
};