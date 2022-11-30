/*
Return an array consisting of the largest number from each provided sub-array.
 For simplicity, the provided array will contain exactly 4 sub-arrays.

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]) should return an array.
largestOfFour([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]) should return [27, 5, 39, 1001].
largestOfFour([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]) should return [9, 35, 97, 1000000].
largestOfFour([[17, 23, 25, 12], [25, 7, 34, 48], [4, -10, 18, 21], [-72, -3, -17, -10]]) should return [25, 48, 21, -3].
*/

// (Procedural approach)

function largestOfFour(arr) {  // O(n^2)
    const results = [];
    for (let i = 0; i < arr.length; i++) {
        let largestNumber = arr[i][0];
        for (let j = 1; j < arr[i].length; j++) {
            if (arr[i][j] > largestNumber) {
                largestNumber = arr[i][j];
            }
        }
        results[i] = largestNumber;
    }

    return results;
}

// (Declarative approach)
function largestOfFour(arr) {
    return arr.map(Function.apply.bind(Math.max, null));
}

/*
Code Explanation of Declarative approach
We build a special callback function (using the Function.bind method), that works just like Math.max but also has Function.prototype.apply's ability to take arrays as its arguments.

We start by mapping through the elements inside the main array. Meaning each one of the inner arrays.
Now the need a callback function to find the max of each inner array provided by the map.
So we want to create a function that does the work of Math.max and accepts input as an array (which by it doesn’t by default).

In other words, it would be really nice and simple if this worked by itself:

Math.max([9, 43, 20, 6]); // Resulting in 43

Alas, it doesn’t.

To do the work of accepting arguments in the shape of an array, there is this Function.prototype.apply method, but it complicates things a bit by invoking the context function.
i.e. Math.max.apply(null, [9, 43, 20, 6]); would invoke something like a Max.max method. What we’re looking for… almost.

Here we’re passing null as the context of the Function.prototype.apply method as Math.max doesn’t need any context.

Since arr.map expects a callback function, not just an expression, we create a function out of the previous expression by using the Function.bind method.
Since, Function.prototype.apply is a static method of the same Function object, we can call Function.prototype.bind on Function.prototype.apply i.e. Function.prototype.apply.bind.
Now we pass the context for the Function.prototype.apply.bind call (in this case we want Math.maxso we can gain its functionality).
Since the embedded Function.prototype.apply method will also require a context as it’s 1st argument, we need to pass it a bogus context.
So, we pass null as the 2nd param to Function.prototype.apply.bind which gives a context to the Math.max method.

Since, Math.max is independent of any context, hence, it ignores the bogus context given by Function.prototype.apply method call.

Thus, our Function.prototype.apply.bind(Math.max, null) makes a new function accepting the arr.map values i.e. the inner arrays.
*/

// Recursive Approach
function largestOfFour(arr, finalArr = []) {
    return !arr.length
        ? finalArr
        : largestOfFour(arr.slice(1), finalArr.concat(Math.max(...arr[0])));
}
