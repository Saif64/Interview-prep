//https://leetcode.com/problems/substring-with-concatenation-of-all-words/

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    let n = words.length,
        wordLen = words[0].length,
        stringLen = s.length,
        map = new Map(),
        result = [];
    //basic test cases 	
    if (stringLen < n * wordLen) return [];
    if (s == words.join("")) return [0];
    // creating the hashmap
    for (let i = 0, j; i < n; i++) {
        if (map.get(words[i]) == undefined) {
            j = -1;
            while ((j = words.indexOf(words[i], j + 1)) >= 0)
                map.set(words[i], map.get(words[i]) + 1 || 1);
        }
    }

    for (let i = 0, j, ch, mapCopy; stringLen - i >= n * wordLen; i++) {
        j = i;
        ch = s.slice(j, j + wordLen);
        mapCopy = new Map(map);
        while (j - i <= n * wordLen && mapCopy.get(ch) > 0) {
            mapCopy.set(ch, mapCopy.get(ch) - 1);
            j += wordLen;
            ch = s.slice(j, j + wordLen);
        }
        if (j - i == n * wordLen) result.push(i);
    }
    return result;
};