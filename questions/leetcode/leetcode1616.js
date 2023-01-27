/**
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */
var checkPalindromeFormation = function (a, b) {
    const isPal = (s, start, end) => {
        while (start < end) {
            if (s[start] === s[end]) start++, end--;
            else return false;
        }
        return true;
    };

    // ap + bs
    let start = 0, end = b.length - 1;
    while (start < end && a[start] === b[end]) start++, end--;
    if (isPal(a, start, end) || isPal(b, start, end)) return true;

    //bs + ap
    start = 0, end = a.length - 1;
    while (start < end && b[start] === a[end]) start++, end--;
    if (isPal(a, start, end) || isPal(b, start, end)) return true;

    return false;
};