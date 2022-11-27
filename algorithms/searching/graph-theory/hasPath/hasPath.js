/*
Write a function, hasPath, t
hat takes in an object representing the adjacency list of a directed acyclic graph
and two nodes (src, dst).
The function should return
a boolean indicating whether or not there exists a directed path between the source and destination nodes.


test_00:

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: []
};

hasPath(graph, 'f', 'k'); // true

test_01:

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: []
};

hasPath(graph, 'f', 'j'); // false

test_02:

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: []
};

hasPath(graph, 'i', 'h'); // true

test_03:

const graph = {
  v: ['x', 'w'],
  w: [],
  x: [],
  y: ['z'],
  z: [],
};

hasPath(graph, 'v', 'w'); // true

test_04:

const graph = {
  v: ['x', 'w'],
  w: [],
  x: [],
  y: ['z'],
  z: [],
};

hasPath(graph, 'v', 'z'); // false
*/


// depth first
/* 
    n = number of nodes
    e = number edges
    Time: O(e)
    Space: O(n)
*/
const hasPathD = (graph, src, dst) => {
    if (src === dst) return true;

    for (let neighbor of graph[src]) {
        if (hasPathD(graph, neighbor, dst) === true) {
            return true;
        }
    }

    return false;
};


// breadth first
/* 
    n = number of nodes
    e = number edges
    Time: O(e)
    Space: O(n)
*/
const hasPathB = (graph, src, dst) => {
    const queue = [src];

    while (queue.length) {
        const current = queue.shift();
        if (current === dst) return true;

        for (let neighbor of graph[current]) {
            queue.push(neighbor);
        }
    }

    return false;
};

