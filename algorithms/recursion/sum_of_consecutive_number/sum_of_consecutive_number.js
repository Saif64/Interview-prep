const recursiveSum = (num) => {
    if (num <= 1) return num;

    return num + recursiveSum(num - 1);
};



console.log(recursiveSum(10));
// 10 + 9
// 9 + 8
// 8 + 7
// 7 + 6
// 6 + 5
//..... 1 + 0