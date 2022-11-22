/*
Write a function, treeSum, that takes in the root of a binary tree that contains number values.
The function should return the total sum of all values in the tree.

test_00:

const a = new Node(3);
const b = new Node(11);
const c = new Node(4);
const d = new Node(4);
const e = new Node(-2);
const f = new Node(1);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

      3
   /    \
  11     4
 / \      \
4   -2     1

treeSum(a); // -> 21

test_01:

const a = new Node(1);
const b = new Node(6);
const c = new Node(0);
const d = new Node(3);
const e = new Node(-6);
const f = new Node(2);
const g = new Node(2);
const h = new Node(2);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
e.left = g;
f.right = h;

     1
   /   \
  6     0
 / \     \
3   -6    2
   /       \
  2         2

treeSum(a); // -> 10

test_02:

treeSum(null); // -> 0
*/

// *depth first + recursive
/*
    n = number of nodes
    Time: O(n)
    Space: O(n)

*/
const treeSumD = (root) => {
    if (root === null) return 0;

    return root.val + treeSum(root.left) + treeSum(root.right);
};


//*bredth first
/*
    n = number of nodes
    Time: O(n)
    Space: O(n)
Note: this solution should really be considered O(n^2) runtime 
because the JavaScript shift() methods runs in O(n). 
JavaScript does not have a native queue data structure that is maximally efficient.
*/
const treeSumB = (root) => {
    if (root === null) return 0;

    const queue = [root];
    let totalSum = 0;
    while (queue.length > 0) {
        const node = queue.shift();
        totalSum += node.val;
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
    }

    return totalSum;
};
