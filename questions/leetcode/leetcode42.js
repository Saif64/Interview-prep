// https://leetcode.com/problems/trapping-rain-water/

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let left = 0;
    let right = height.length;
    let water = 0;
    let maxL = 0;
    let maxR = 0;
    while (left < right) {
        if (height[left] <= height[right]) {
            let count = maxL - height[left];
            if (count > 0) water += count;
            else maxL = height[left];
            left++;
        } else {
            let count = maxR - height[right];
            if (count > 0) water += count;
            else maxR = height[right];
            right--;
        }
    }
    return water;

};