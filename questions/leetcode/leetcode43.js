https://leetcode.com/problems/multiply-strings/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    var result = Array(num1.length + num2.length).fill(0);
    for (var j = num2.length - 1; j >= 0; j--) {
        // k is the index in the result: where to add to 
        var k = num1.length + j;
        var overflow = 0;
        for (var i = num1.length - 1; i >= 0; i--) {
            product = num2[j] * num1[i] + overflow + result[k];
            result[k] = product % 10;
            overflow = (product - result[k]) / 10;
            k--;
        }
        result[k] += overflow;
    }
    // Convert result to string, removing any prepadded zeroes
    return result.join('').replace(/^0+(.)/, '$1');
};