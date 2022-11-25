// find sum [1,5,2,-1] using recursion onlys

const sum = (arr) => {
    if (arr.length === 0) return 0;
    const rest = arr.slice(1);   // this will bottleneck for sure
    return arr[0] + sum(rest);
};
/*
    Time: O(n^2)         :(
    Space: O(n)
*/

// -----------------------------------------------------------------------------------

// More optimized and efficient method
const sum2 = (arr) => {
    return _sum(arr, 0);
};

const _sum = (arr, idx) => {
    if (idx === arr.length) return 0;
    return arr[idx] + _sum(arr, (idx + 1));
};
/*
    Time: O(n)         :)
    Space: O(n)
*/




console.log(sum2([1, 5, 2, -1])); // 11
console.log(sum2([1, 2, 3, 5, 4, 6])); // 21

