const findBox = (box1, box2) => {
    box1.forEach((box) => {
        console.log(box);       // O(a)
    });

    box2.forEach((box) => {
        console.log(box);    // O(b)
    });
};

// T(N) = O(a + b)