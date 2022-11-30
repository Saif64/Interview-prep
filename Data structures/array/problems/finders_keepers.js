/*
Create a function that looks through an array arr 
and returns the first element in it that passes a 'truth test'. This means that given an element x, 
the 'truth test' is passed if func(x) is true. If no element passes the test, return undefined.

findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }) should return 8.
findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; }) should return undefined.
*/

function findElement(arr, func) {
    let num = 0;

    for (let i = 0; i < arr.length; i++) {
        num = arr[i];
        if (func(num)) {
            return num;
        }
    }

    return undefined;
}


// ES6 approach
function findElement(arr, func) {
    return arr[arr.map(func).indexOf(true)];
}

// ** Recursive Solution**
function findElement(arr, func) {
    if (arr.length > 0 && !func(arr[0])) {
        return findElement(arr.slice(1), func);
    } else {
        return arr[0];
    }
}
