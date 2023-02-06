/*
Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.

Example 1:
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
*/

// Leetcode 647
class Solution {
public:
    int isPalindrome(string s, int start, int end) {
        while(start < end) {
            if(s[start++] != s[end--]) return 0;
        }
        return 1;
    }
    
    int countSubstrings(string s) {
        int dp[s.length()];
        dp[0] = 1;
        
        for(int i=1;i<s.length();i++) {
            dp[i] = dp[i-1];
            for(int j=0;j<=i;j++) {
                dp[i] += isPalindrome(s, j, i);
            }
        }
        
        return dp[s.length()-1];
    }
};