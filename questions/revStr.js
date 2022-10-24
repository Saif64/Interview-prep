// input: 'My name is Saif'
// output: 'fiaS si eman yM'

function reverse(str) {
    // check input first
    if (str.length < 2 || !str || typeof str !== 'string') return;

    return str.split('').reverse().join('');
}

//new ES6 way modern way
const revStr = str => [...str].reverse().join('');

console.log(revStr('My name is Saif'));