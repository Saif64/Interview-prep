/*  Google Question
Given an array = [2,5,1,2,3,5,1,2,4]:
It should return 2

Given an array = [2,1,1,2,3,5,1,2,4]:
It should return 1

Given an array = [2,3,4,5]:
It should return -1 */

// brute force method
const firstRecurringCharacter = (input) => {            // O(n^2)
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] === input[j]) return input[i];
        }
    }
    return -1;
};

// console.log(firstRecurringCharacter([1, 5, 1, 1, 3, 5, 1, 2, 4]));


const hashMethod = (arr) => {               //O(n)
    let map = {};
    for (let i = 0; i < arr.length; i++) {
        if (map[arr[i]] !== undefined) {
            return arr[i];
        } else {
            map[arr[i]] = i;
        }
        console.log(map);
    }
    // console.log(map);
    return -1;
};

// console.log(hashMethod([1, 5, 5, 1, 3, 5, 1, 2, 4]));
console.log(hashMethod([2, 5, 5, 2, 3, 5, 1, 2, 4]));

//Bonus... What if we had this:
// [2,5,5,2,3,5,1,2,4]
// return 5 because the pairs are before 2,2