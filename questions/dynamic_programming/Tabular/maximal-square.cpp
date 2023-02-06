/*
Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
*/

// Leetcode 221
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n));
        int ms = 0;
        
        for(int i=0;i<m;i++) {
            for(int j=0;j<n;j++) {
                if(i == 0 || j == 0) {
                    dp[i][j] = matrix[i][j]-'0';
                } else if(matrix[i][j] == '1') {
                    dp[i][j] = min(min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1]) + 1;
                }
                ms = max(ms, dp[i][j]);
            }
        }
        
        return ms*ms;
    }
};