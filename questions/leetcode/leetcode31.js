//https://leetcode.com/problems/next-permutation/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (N) {
    const swap = (a, b) => [N[a], N[b]] = [N[b], N[a]];
    let len = N.length - 1, i, j;
    for (i = len - 1; N[i] >= N[i + 1];) i--;
    for (let k = i + 1; len > k; k++, len--) swap(k, len);
    if (~i) {
        for (j = i + 1; N[i] >= N[j];) j++;
        swap(i, j);
    }
};