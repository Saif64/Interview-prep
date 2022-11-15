// https://leetcode.com/problems/integer-to-roman/

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (N) {
    const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    let ans = "";
    for (let i = 0; N; i++)
        while (N >= val[i]) ans += rom[i], N -= val[i];
    return ans;
};