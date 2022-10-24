const strings = ['a', 'b', 'c', 'd'];
const numbers = [1, 2, 3, 4, 5];
// Variable array is somewhere in memory and the computer knows it.
// When I do array[2], i'm telling the computer, hey go to the array and grab the 3rd item from where the array is stored.

/* Adding the string 'e' to the end of the array. */
strings.push('e');


/* Removing the last item from the array. */
strings.pop();
strings.pop();

/* Adding the string 'x' to the beginning of the array. */
strings.unshift('x');

/* Adding the string 'alien' to the array at index 2. */
strings.splice(2, 0, 'alien');

console.log(strings);