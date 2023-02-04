var isValidSudoku = function (board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== ".") {
                var val = board[i][j];
                if (i < 8) {
                    for (let t = i + 1; t < 9; t++) {
                        if (board[t][j] === val) {
                            return false;
                        }
                    }
                }
                if (j < 8) {
                    for (let t = j + 1; t < 9; t++) {
                        if (board[i][t] === val) {
                            return false;
                        }
                    }
                }
                if (i % 3 < 2) {
                    for (let p = i + 1; p < i - i % 3 + 3; p++) {
                        for (let q = j - j % 3; q < j - j % 3 + 3; q++) {
                            if (q !== j && board[p][q] === val) {
                                return false;
                            }
                        }
                    }
                }

            }
        }
    }
    return true;
};