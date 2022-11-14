// this is important

//https://leetcode.com/problems/zigzag-conversion/

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = (s, numRows) => {
    // 1. Make an array with the zigzag sequence
    const zigzag = [...new Array(numRows).keys()];
    zigzag.push(...zigzag.slice(1, -1).reverse());
    // 2. Make an array with as many strings as we need rows
    const rows = new Array(numRows).fill('');
    // 3. Append the characters to the row strings in zigzag sequence
    [...s].forEach((c, i) => (rows[zigzag[i % zigzag.length]] += c));
    // 4. Join the row strings in the array together
    return rows.join('');
};