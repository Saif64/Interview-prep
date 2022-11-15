// https://leetcode.com/problems/string-to-integer-atoi/

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (str) {
    var i = 0;
    var sign = 1;
    var res = 0;
    var len = str.length;
    var INT_MAX = 2147483647;
    var INT_MIN = - INT_MAX - 1;

    while (str[i] === ' ') i++;

    if (str[i] === '+' || str[i] === '-') {
        sign = str[i] === '+' ? 1 : -1;
        i++;
    }

    while (str[i] >= '0' && str[i] <= '9') {
        res = (res * 10) + (str[i] - 0);
        if (sign === 1 && res > INT_MAX) return INT_MAX;
        if (sign === -1 && res > INT_MAX + 1) return INT_MIN;
        i++;
    }

    return res * sign;
};