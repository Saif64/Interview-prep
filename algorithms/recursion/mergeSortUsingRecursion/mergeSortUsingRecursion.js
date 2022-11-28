const mergeSort = (array) => {
    if (array.length == 1) { // when you have one item left, return to the previous branch
        return array;
    } else { // otherwise
        let half = Math.floor(array.length / 2); // get a halfway point for your array
        mergeSort(array.slice(0, array.length - half)); // split the first half into the left branch
        mergeSort(array.slice(0 - half)); // and the right half into the right branch
        return; // do something with your branches as you pull back ...
    }
};

let arr = [-5, 3, 20, 10, 2, 0];
mergeSort(arr, 0, arr.length - 1); // run and debug in vscode to show the call stack
