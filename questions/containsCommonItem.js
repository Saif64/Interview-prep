/*  
Given 2 arrays, create a function that let's a user know (true/false) whether these two arrays contain any common items
For Example:
const array1 = ['a', 'b', 'c', 'x']; const array2 = ['z', 'y', 'i'];
should return false.
--------------------------------------------------------------------
 const array1 = ['a', 'b', 'c', 'x']; const array2 = ['z', 'y', 'x'];
 should return true. */


// watch for BigO_Cheatsheet_Zero_To_Mastery_V1.01.pdf for the steps

//  HashMap solution  T(n) = O(a+b)   S(n) = O(a)
const array1 = ['a', 'b', 'c', 'x'];
const array2 = ['z', 'x', 'i'];

const containsItem = (arr1, arr2) => {
    // let newMap = new Map();             // this is the new method
    let map = {};
    for (let i = 0; i < arr1.length; i++) {
        if (!map[arr1[i]]) {
            const item = arr1[i];
            map[item] = true;
            // map.set(arr1[i], true);   // this is the new method
        }
    }
    // console.log(map);
    for (let j = 0; j < arr2.length; j++) {
        if (map[arr2[j]]) {
            return true;
        }
    }
    return false;
};

console.log(containsItem(array1, array2));

//  using JS built-in method

const containsItem2 = (arr1, arr2) => {
    return arr1.some(item => arr2.includes(item));
};