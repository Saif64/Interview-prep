/*
*Write a function, treeIncludes, that takes in the root of a binary tree and a target value.;
*The function should return a boolean indicating whether or not the value is contained in the tree.;

test_00:

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

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

treeIncludes(a, "e"); // -> true

test_01:

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

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

treeIncludes(a, "a"); // -> true

test_02:

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

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

treeIncludes(a, "n"); // -> false

test_03:

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");
const g = new Node("g");
const h = new Node("h");

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

treeIncludes(a, "f"); // -> true

test_04:

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");
const g = new Node("g");
const h = new Node("h");

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

treeIncludes(a, "p"); // -> false

test_05:

treeIncludes(null, "b"); // -> false
*/


// ?breadth first search Aproach
/*
    n = number of nodes
    Time: O(n)
    Space: O(n)
Note: this solution should really be considered O(n^2) runtime 
because the JavaScript shift() methods runs in O(n). 
JavaScript does not have a native queue data structure that is maximally efficient.
*/


const treeIncludesB = (root, target) => {    // remove B before running
    if (root === null) return false;

    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        if (node.val === target) return true;
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
    }

    return false;
};

// *depth first search
/*
    n = number of nodes
    Time: O(n)
    Space: O(n)

*/
const treeIncludesD = (root, target) => {       // remove D before running
    if (root === null) return false;
    if (root.val === target) return true;
    return treeIncludes(root.left, target) || treeIncludes(root.right, target);
};
