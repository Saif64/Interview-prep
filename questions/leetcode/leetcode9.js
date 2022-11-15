// https://leetcode.com/problems/palindrome-number/

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let num = x.toString();
    let rev = "";

    for (let i = num.length - 1; i >= 0; i--) {
        rev += num[i];
    }
    if (num == rev) {
        return true;
    }
    else {
        return false;
    }
};