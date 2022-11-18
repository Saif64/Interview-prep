// efficient than bubble and selection sort
// TC = O(n^2)
// SC = O(1)

const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function insertionSort(arr) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        if (arr[i] < arr[0]) {
            //move number to the first position
            arr.unshift(arr.splice(i, 1)[0]);
        } else {
            // only sort number smaller than number on the left of it. This is the part of insertion sort that makes it fast if the arr is almost sorted.
            if (arr[i] < arr[i - 1]) {
                //find where number should go
                for (var j = 1; j < i; j++) {
                    if (arr[i] >= arr[j - 1] && arr[i] < arr[j]) {
                        //move number to the right spot
                        arr.splice(j, 0, arr.splice(i, 1)[0]);
                    }
                }
            }
        }
    }
}

insertionSort(numbers);
console.log(numbers);