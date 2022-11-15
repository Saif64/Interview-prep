// https://leetcode.com/problems/reverse-integer/

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let num = x.toString();
    let rev = "";

    if (num.includes('-')) {
        let without = num.split('-')[1];
        for (let i = without.length - 1; i >= 0; i--) {
            rev += without[i];
        }
    }
    else {
        for (let i = num.length - 1; i >= 0; i--) {
            rev += num[i];
        }
    }
    let number = parseInt(rev);

    if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) return 0;

    else if (num.includes('-')) return number * -1;
    else return number;



};