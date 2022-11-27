const binarySearchRecursively = (arr, left, right, key) => {
    arr.sort((a, b) => a - b);
    if (left > right) return -1;

    let mid = (left + right) / 2;

    if (key === arr[mid]) return mid;

    if (key < arr[mid]) {
        return binarySearchRecursively(arr, left, mid - 1, key);  // goes left
    }
    return binarySearchRecursively(arr, mid + 1, right, key);  // goes right
};