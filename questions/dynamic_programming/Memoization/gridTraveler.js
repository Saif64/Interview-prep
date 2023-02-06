/* You are a traveler on a 2D grid. YOu begin in the top-left corder and your goal
 is to travel to the bottom to the bottom right. You may only move down or right.

 In how many ways can you travel to the goal on a grid with dimensions m * n ?
*/


const gridTraveler = (m, n, memo = {}) => {
    const key = m + ',' + n;

    if (key in memo) return memo[key];
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;
    memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
    return memo[key];
};

console.log(gridTraveler(18, 18));
console.log(gridTraveler(0, 1));
console.log(gridTraveler(3, 3));