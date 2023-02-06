/*
Alice and Bob take turns playing a game, with Alice starting first.

Initially, there is a number n on the chalkboard. On each player's turn, that player makes a move consisting of:

Choosing any x with 0 < x < n and n % x == 0.
Replacing the number n on the chalkboard with n - x.
Also, if a player cannot make a move, they lose the game.

Return true if and only if Alice wins the game, assuming both players play optimally.
*/

// Leetcode 1025
class Solution {
public:
    int dp[1001];

    int executeGame(int n) {
        if(n==1) return 0;
        if(dp[n]!=-1) return dp[n];

        for(int i=1;i*i<=n;i++) {
            if(n%i==0) {
                if(executeGame(n-i)==0) return dp[n]=1;
                if((i!=1) && (executeGame(n-(n/i))==0)) return dp[n]=1;
            }
        }

        return dp[n]=0;
    }

    bool divisorGame(int n) {
        memset(dp, -1, sizeof dp);
        return executeGame(n);
    }
};