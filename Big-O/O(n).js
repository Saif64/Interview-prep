const arr = ['saif'];
const large = new Array(10000).fill('saif');

const findName = arr => {
    let t0 = performance.now();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'saif') {
            console.log('found the name');
            break; // this is to so that the loop does not run for arr.length times
        }
    }
    let t1 = performance.now();
    let time = t1 - t0;
    console.log(`took ${ time } miliseconds`);
};

// alternatively we can write in ES6 version
const findNameAlt = arr => {
    arr.forEach(element => console.log(element));
};

// * O(n) --> Linear time
findName(large);
findNameAlt(large);



/* 
! another example of rule 2
 */
function printFirstItemThenFirstHalfThenSayHi100Times(items) {
    console.log(items[0]);

    var middleIndex = Math.floor(items.length / 2);
    var index = 0;

    while (index < middleIndex) {
        console.log(items[index]);
        index++;
    }

    for (var i = 0; i < 100; i++) {
        console.log('hi');
    }
}

/*
* o(1 + n/2 + 100)
* = O(n/2 + 101)
* = O(n/2)
* = O(n)
 */

