/*
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
*/

// Leetcode 23
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<pair<int, ListNode*>, vector<pair<int, ListNode*>>, greater<pair<int, ListNode*>>> pq;
        
        for(auto l:lists) {
            ListNode* temp = l;
            while(temp!=NULL) {
                pq.push({temp->val, temp});
                temp = temp->next;
            }
        }
        
        if(pq.size() == 0) return NULL;
        
        ListNode* head = pq.top().second;
        pq.pop();
        ListNode* cur = head;
            
        while(!pq.empty()) {
            cur->next = pq.top().second;
            cur = cur->next;
            pq.pop();
        }
        
        return head;
    }
};