function numSquares(n) {

    // General strategy is to build up a memoization array with the smallest amount of squares needed to make the number at each index
    // since the only square in the beginning is 1, until we see 4, it's very boring:
    // to make 1, we use 1, to make 2 we use two 1's, to make 3, we use three 1's
    // mem[1] = 1, d[2] = 2, mem[3] = 3
    // initially, mem[4] will also use 1s and end up at 4
    // but now we can consider 2^2 too since the inner loop now allows it
    // we then compare, is what we have calculated so far better? or using this new square?
    // To answer that, we subtract the current square (4) from i (4) and look up in our mem lookup to see how many steps that took
    // mem[0] is zero of course, so we end up with Math.min(4, 0 + 1). The 2nd is less of course, so we set mem[4] to 1

    // Our memory lookup. Others often name this 'dp'
    let mem = [0];
    let i, j;

    // Outer loop, where we build up till we reach n
    for (i = 1; i <= n; i++) {

        // Initially, we have no idea how many steps it will take
        mem[i] = Infinity;

        // Now loop over all squares that are smaller or equal to the current i.
        for (j = 1; j * j <= i; j++) {

            // The smalles amount of squares is either what we already have, or what we can build with a new square and remainder
            mem[i] = Math.min(mem[i], mem[i - j * j] + 1);
        }


    }
    return mem[n];
}

// Math solution (https://leetcode.com/problems/perfect-squares/solutions/476318/math-solution-explained-beats-100-javascript-whiteboard/?orderBy=most_votes&languageTags=javascript)

var numSquares = n => {

    //returns if the number x is a valid square root ( can be represented as the square of an integer)
    let isSquare = x => Math.floor(Math.sqrt(x)) ** 2 === x;

    if (isSquare(n))
        return 1; // that would be the fact that its equal to itself

    // Legendre's three square theorem: A natural number n can be represented as 
    // the sum of AT MOST three squares of integers if and only if : n!= 4^x ( 8*m+7)
    while (n % 4 === 0)
        n /= 4;
    //Try contradicting Legendre
    if (n % 8 === 7)
        return 4;

    // Manually checking for result 2, because Legendre states  AT MOST 3, 
    // so 2 is possible aswell
    for (let i = 0; i <= n; i++)
        // if x=n-i*i   and x is a valid square then OBVIOUSLY
        // n=i^2 +sqrt(x)^2  ,so n is a square of two numbers   
        if (isSquare(n - i * i))
            return 2;

    // Legendre applies
    return 3;
};