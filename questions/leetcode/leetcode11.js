// https://leetcode.com/problems/container-with-most-water/

/**
 * @param {number[]} height
 * @return {number}
 */

// brute force solution
const maxWater = (arr) => {
    let maxArea = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let min = Math.min(arr[i], arr[j]) * (j - i);
            if (maxArea < min) {
                maxArea = min;
            }
        }
    }
    return maxArea;
};

// optimized
var maxArea = function (height) {
    const len = height.length;
    let L = 0;
    let R = len - 1;
    let max = 0;
    while (L < R) {
        let width = R - L;
        let length = Math.min(height[L], height[R]);
        max = Math.max(max, width * length);
        if (height[L] > height[R]) {
            R--;
        } else if (height[R] > height[L]) {
            L++;
        } else {
            R--;
        }
    }
    return max;
};