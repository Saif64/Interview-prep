/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    let row = matrix.length;
    let row0 = false;
    let col0 = false;
    let column = matrix[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (matrix[i][j] === 0) {
                if (i === 0) {
                    row0 = true;
                }
                if (j === 0) {
                    col0 = true;
                }

                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (let i = 1; i < row; i++) {
        for (let j = 1; j < column; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (row0) {
        for (let j = 0; j < column; j++) {
            matrix[0][j] = 0;
        }
    }
    if (col0) {
        for (let i = 0; i < row; i++) {
            matrix[i][0] = 0;
        }
    }
};