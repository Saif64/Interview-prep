/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
    let result = 0;
    let length = columnTitle.length;
    for (let i = 0; i < length; i++) {
        result += (columnTitle.charCodeAt(i) - 64) * Math.pow(26, length - (i + 1));
    }
    return result;
};


/*
Very simple charCode of a upper case character - 64 = their alphabet position and 26 pow position of the character (starting from right) - so length - (i+1) means that the last character will end up being just it's alphabet position (character * 1), the one before is going to be * 26, the one before * 26 * 26 and so on.
Simple math solution that works just fine.
*/