const isPalindrome = (input) => {
    // The base case or Stopping condition
    if (input.length < 2) return true;

    // Some work to shrink the problem space
    if (input[0] === input[input.length - 1]) {
        return isPalindrome(input.substr(1, input.length - 2));
    }

    // Additional base case to handle non-palindromes
    return false;
};

console.log(isPalindrome('abba'));

/*
! PsedoCode for other language

function isPalindrome(str) {
if (str.length < 2) {
        return true;
    }

    if (firstCharacter(str) === lastCharacter(str)) {
        return isPalindrome(middleCharacters(str));
    }

    return false;
}
*/