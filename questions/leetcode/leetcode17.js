/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits) return [];
    const kb = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let str = [],
        res = [];
    BT();
    return res;
    function BT(idx = 0) {
        if (idx === digits.length) {
            res.push(str.join(""));
            return;
        }
        let digit = digits[idx], charStr = kb[+digit];
        //each layer we start from index 0.
        for (let i = 0; i < charStr.length; i++) {
            str.push(charStr[i]);
            BT(idx + 1);
            str.pop();
        }
    }
};