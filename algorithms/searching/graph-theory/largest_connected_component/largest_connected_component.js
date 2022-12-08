/*
Write a function, largestComponent, that takes in the adjacency list of an undirected graph.
 The function should return the size of the largest connected component in the graph.

 test_00:
largestComponent({
  0: ['8', '1', '5'],
  1: ['0'],
  5: ['0', '8'],
  8: ['0', '5'],
  2: ['3', '4'],
  3: ['2', '4'],
  4: ['3', '2']
}); // -> 4
test_01:
largestComponent({
  1: ['2'],
  2: ['1','8'],
  6: ['7'],
  9: ['8'],
  7: ['6', '8'],
  8: ['9', '7', '2']
}); // -> 6
test_02:
largestComponent({
  3: [],
  4: ['6'],
  6: ['4', '5', '7', '8'],
  8: ['6'],
  7: ['6'],
  5: ['6'],
  1: ['2'],
  2: ['1']
}); // -> 5
test_03:
largestComponent({}); // -> 0
test_04:
largestComponent({
  0: ['4','7'],
  1: [],
  2: [],
  3: ['6'],
  4: ['0'],
  6: ['3'],
  7: ['0'],
  8: []
}); // -> 3
*/

// depth first
const largestComponent = (graph) => {
    const visited = new Set();
    let largest = 0;

    for (let node in graph) {
        const size = exploreSize(graph, node, visited);
        if (size > largest) largest = size;
    }

    return largest;
};

const exploreSize = (graph, node, visited) => {
    if (visited.has(node)) return 0;

    visited.add(node);

    let size = 1;
    for (let neighbor of graph[node]) {
        size += exploreSize(graph, neighbor, visited);
    }

    return size;
};