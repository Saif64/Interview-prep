// class Node {
//     constructor (value) {
//         this.value = value;
//         this.next = null;
//     }
// }

const reverList = (head) => {
    if (head === null || head.next === null) return head;

    let node = reverList(head.next);
    head.next.next = head;
    head.next = null;
    return node;
};