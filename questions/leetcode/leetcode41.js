/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    var i = 0;

    if (!nums.includes(1))
        return 1;

    nums.sort((a, b) => a - b);
    while (i < nums.length) {
        if (nums[i] < 0 || nums[i] + 1 > nums[i + 1]) {
            i++;
            continue;
        }
        if (nums[i + 1] && nums[i] + 1 != nums[i + 1]) {
            return nums[i] + 1;
        }
        i++;
    }

    return nums[i - 1] + 1;
};