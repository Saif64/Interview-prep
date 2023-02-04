/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (text1, text2) {
    let arr = new Array(text1.length + 1);
    for (let a = 0; a < arr.length; a++) {
        arr[a] = new Array(text2.length + 1).fill(false);
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (j == 0 && i == 0) arr[i][j] = true;
            if (i > 0 && j == 0) arr[i][j] = false;
            if (i == 0 && j > 0) arr[i][j] = text2[j - 1] == '*' ? arr[i][j - 1] : false;
        }
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = 1; j < arr[0].length; j++) {
            if (text1[i - 1] == text2[j - 1] || text2[j - 1] == '?') arr[i][j] = arr[i - 1][j - 1];
            else if (text2[j - 1] == '*') arr[i][j] = arr[i][j - 1] || arr[i - 1][j];
            else arr[i][j] = false;
        }
    }
    return arr[text1.length][text2.length];
};