const arr = [2, 3, 1, 4, 7, 5];


// TC = O(n^2)
// SC = O(n)
const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {  // arr.sort((a,b) => a - b)  change to arr[j] < arr[j+1] for descending order
                // swap Number
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
};

console.log(bubbleSort(arr));   // [1,2,3,4,5,7]