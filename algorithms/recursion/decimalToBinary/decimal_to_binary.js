const IntToBinary = (num, result = "") => {
    if (num === 0) return result;

    if (num % 2 === 0) result = "0" + result;
    else result = "1" + result;
    return IntToBinary(Math.floor(num / 2), result);
};

console.log(IntToBinary(15));