// https://leetcode.com/problems/divide-two-integers/

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    if (dividend === -2147483648 && divisor === -1) {
        return 2147483647;
    }
    var isNeg = dividend > 0 ^ divisor > 0;
    var res = 0;

    dividend = Math.abs(dividend);
    subtract(Math.abs(divisor), 1);

    function subtract(d, q) {
        if (dividend > d) {
            subtract(d + d, q + q);
        }
        if (dividend >= d) {
            dividend -= d;
            res += q;
        }
    }

    return isNeg ? -res : res;
};