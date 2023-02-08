var solve = function (board) {
    if (board.length == 0) return;

    // dfs searching for '0'
    var recur = function (i, j) {
        if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) return;
        if (board[i][j] != 'O') return;
        board[i][j] = '-';
        recur(i + 1, j);
        recur(i - 1, j);
        recur(i, j + 1);
        recur(i, j - 1);
    };

    // check left & right boundary
    for (let i = 0; i < board.length; i++) {
        recur(i, 0);
        recur(i, board[0].length - 1);
    }

    // check top & bot boundary
    for (let i = 0; i < board[0].length; i++) {
        recur(0, i);
        recur(board.length - 1, i);
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == 'O') board[i][j] = "X";
            if (board[i][j] == '-') board[i][j] = "O";
        }
    }
};