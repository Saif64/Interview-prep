/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
var isLongPressedName = function (name, typed) {
    let start = 0;
    let end = 0;

    for (let i = 0; i < name.length; i++) {
        end = start;
        if (name[i] !== typed[start]) return false;

        while (name[i] === name[i + 1] && name[i] === typed[start] && name[i + 1] === typed[start + 1]) {
            start++;
            i++;
        }
        while (name[i] === typed[start] && name[i] !== name[i + 1]) {
            start++;
        }
        if (start === end) return false;
    }
    if (start !== typed.length) return false;

    return true;
};