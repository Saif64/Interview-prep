//Write a function, breadthFirstValues, that takes in the root of a binary tree.
// The function should return an array containing all values of the tree in breadth - first order.

/* 
!test_00:

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

     a
   /   \
  b     c
 / \     \
d   e     f

breadthFirstValues(a);
   -> ['a', 'b', 'c', 'd', 'e', 'f']

!test_01:

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const f = new Node('f');
const g = new Node('g');
const h = new Node('h');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
e.left = g;
f.right = h;

     a
   /   \
  b     c
 / \     \
d   e     f
   /       \
  g         h

breadthFirstValues(a);
  -> ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

!test_02:

const a = new Node('a');

     a

breadthFirstValues(a);
   -> ['a']

!test_03:

const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const d = new Node('d');
const e = new Node('e');
const x = new Node('x');

a.right = b;
b.left = c;
c.left = x;
c.right = d;
d.right = e;

     a
      \
       b
      /
     c
   /  \
  x    d
        \
         e

breadthFirstValues(a);
   -> ['a', 'b', 'c', 'x', 'd', 'e']

!test_04:

breadthFirstValues(null);
   -> []
*/


// class Node {
//   constructor(val) {
//     this.val = val;
//     this.left = null;
//     this.right = null;
//   }
// }


/*
n = number of nodes;
Time: O(n);
Space: O(n)

*Note: this solution should really be considered O(n^2) runtime
*because the JavaScript shift() methods runs in O(n). 
*JavaScript does not have a native queue data structure that is maximally efficient.
*/
const breadthFirstValues = (root) => {
    if (root === null) return [];

    const values = [];
    const queue = [root];

    while (queue.length > 0) {
        const currentNode = queue.shift();
        values.push(currentNode.val);

        if (currentNode.left !== null) queue.push(currentNode.left);

        if (currentNode.right !== null) queue.push(currentNode.right);
    }

    return values;
};

