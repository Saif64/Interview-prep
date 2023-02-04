/*
You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
*/

// Leetcode 70
class Solution {
public:
    int climbStairs(int n) {
        if(n < 2) return 1;
        
        int steps[n+1];
        steps[0] = 1;
        steps[1] = 1;
        
        for(int i=2;i<=n;i++) {
            steps[i] = steps[i-1] + steps[i-2];
        }
        
        return steps[n];
    }
};