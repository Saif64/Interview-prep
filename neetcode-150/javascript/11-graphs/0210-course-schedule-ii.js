// 210. Course Schedule II — Medium
// https://leetcode.com/problems/course-schedule-ii/
// Pattern: Graphs (topological sort)
// Time O(V + E) | Space O(V + E)
//
// Idea: identical to 207, but record the removal order — that order *is* a valid topological
// sort. A cycle shows up as an order shorter than numCourses, and the problem wants [] then.
// Many valid orders can exist; any one is accepted.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = (numCourses, prerequisites) => {
  const dependents = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    dependents[prereq].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);

  const order = [];
  while (queue.length) {
    const course = queue.pop();
    order.push(course);
    for (const next of dependents[course]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return order.length === numCourses ? order : [];
};

module.exports = { findOrder };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(findOrder(2, [[1, 0]]), [0, 1]);
  assert.deepStrictEqual(findOrder(1, []), [0]);
  assert.deepStrictEqual(findOrder(2, [[1, 0], [0, 1]]), []); // cycle

  // Any order is fine as long as every prerequisite comes first.
  const prereqs = [[1, 0], [2, 0], [3, 1], [3, 2]];
  const order = findOrder(4, prereqs);
  assert.strictEqual(order.length, 4);
  const position = new Map(order.map((c, i) => [c, i]));
  for (const [course, prereq] of prereqs) assert.ok(position.get(prereq) < position.get(course));
  console.log('210 ok');
}
