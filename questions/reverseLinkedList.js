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
var reverseList = function (head) {
    if (!head) return head;

    let node = head;
    let prev = null;

    while (node) {
        let tempNode = node.next;
        node.next = prev;
        prev = node;
        node = tempNode;
    }

    return prev;
};