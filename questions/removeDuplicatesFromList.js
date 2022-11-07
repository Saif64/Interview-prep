// ref: https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var deleteDuplicates = function (head) {
    var currentNode = head;

    while (currentNode) {
        if (currentNode.next !== null && currentNode.val == currentNode.next.val) {
            currentNode.next = currentNode.next.next;
        } else {
            currentNode = currentNode.next;
        }
    }

    return head;
};