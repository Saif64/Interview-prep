/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    let result = false;
    var check = function (r, c, i) {
        if (!result) {
            if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) return; // out of boundary
            if (board[r][c] != word[i]) return; // wrong character
            if (i == word.length - 1) { // got to the end means we found a correct path
                result = true;
                return;
            }
            board[r][c] = null; // mark our path so we dont go back and forth
            // try all directions
            check(r + 1, c, i + 1);
            check(r - 1, c, i + 1);
            check(r, c + 1, i + 1);
            check(r, c - 1, i + 1);
            board[r][c] = word[i]; // reset our board , very important
        }
    };

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == word[0]) {
                check(i, j, 0);
                if (result) return result;
            }
        }
    }

    return result;
};