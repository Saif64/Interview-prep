/*
You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.
Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
Return a list of integers representing the size of these parts.

Example 1:
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
*/

// Leetcode 763
class Solution {
public:
    vector<int> partitionLabels(string s) {
        vector<int> ans;
        int size = 0;
        vector<int> lastIndices(26, 0);
        for(int i=0;i<s.length();i++) {
            lastIndices[s[i]-'a'] = i;
        }
        for(int i=0;i<s.length();i++) {
            cout<<"here we come with i "<<i<<" and "<<lastIndices[s[i]-'a']<<endl;
                if(i == lastIndices[s[i]-'a']) {
                cout<<"here we come with i "<<i<<" and "<<lastIndices[s[i]-'a']<<endl;
                ans.push_back(size);
                size = 0;
            }
            size++;
        }
        return ans;
    }
};