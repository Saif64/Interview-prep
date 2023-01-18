// https://leetcode.com/problems/check-distances-between-same-letters/description/

var checkDistances = function (s, distance) {
    let arr = Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        if (arr[s.charCodeAt(i) - 97] != 0 && i - arr[s.charCodeAt(i) - 97] != distance[s.charCodeAt(i) - 97])
            return false;
        arr[s.charCodeAt(i) - 97] = i + 1;
    }
    return true;
};