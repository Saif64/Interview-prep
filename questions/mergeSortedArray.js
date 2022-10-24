// merge two sorted arrays in one


/* my solution */
const merge = (arr1, arr2) => {
    let res = [];
    for (let i = 0; i < arr1.length; i++) {
        res.push(arr1[i]);
        res.push(arr2[i]);
    }
    return res.sort((a, b) => a - b);
};

console.log(merge([1, 2], [3]));


/* optimal solution */
function mergeSortedArrays(array1, array2) {
    const mergedArray = [];
    let array1Item = array1[0];
    let array2Item = array2[0];
    let i = 1;
    let j = 1;

    //We should actually move these 2 if statements to line 2 so that we do the checks before we do assignments in line 3 and 4!
    if (array1.length === 0) {
        return array2;
    }
    if (array2.length === 0) {
        return array1;
    }

    while (array1Item || array2Item) {
        if (array2Item === undefined || array1Item < array2Item) {
            mergedArray.push(array1Item);
            array1Item = array1[i];
            i++;
        }
        else {
            mergedArray.push(array2Item);
            array2Item = array2[j];
            j++;
        }
    }
    return mergedArray;
}
