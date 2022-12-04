// https://leetcode.com/problems/maximum-subarray/description/?envType=study-plan&id=data-structure-i
// important question

var maxSubArray = function (nums) {
    var maxHere = nums[0];
    var maxSoFar = nums[0];

    for (var i = 1; i < nums.length; i++) {
        maxHere = Math.max(nums[i], maxHere + nums[i]);
        maxSoFar = Math.max(maxHere, maxSoFar);
    }

    return maxSoFar;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));