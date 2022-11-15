

let count = 0;

const inception = () => {
    console.log(count);
    if (count > 3) {
        return 'done';
    }
    count++;
    return inception();  // the function calls itself untill it completes the if task
};