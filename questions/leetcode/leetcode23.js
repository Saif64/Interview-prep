/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    // Return early if no ListNodes were supplied
    if (!lists.length) return null;

    // Loop through the supplied ListNodes
    for (let i = 1; i < lists.length; i++) {
        // Merge each ListNode with the first
        lists[0] = merge(lists[0], lists[i]);
    }

    // Return the merged ListNode
    return lists[0];
};

var merge = function (l1, l2) {
    // If either list is empty, return the other list's node
    if (l1 == null) return l2;
    if (l2 == null) return l1;

    // If l1 is lower
    if (l1.val < l2.val) {
        l1.next = merge(l1.next, l2);
        return l1;
    }
    // If l2 is lower
    else {
        l2.next = merge(l1, l2.next);
        return l2;
    }
};