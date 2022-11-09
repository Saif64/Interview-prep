// https://visualgo.net/en/list?slide=1

class Stack {
    constructor () {
        this.arr = [];
    }

    isEmpty() {
        return 0;
    }

    peek() {
        return this.arr[this.arr.length - 1];
    }

    push(value) {
        return this.arr.push(value);
    }

    pop() {
        return this.arr.pop();
    }

}

const myStack = new Stack();
myStack.push(5);
myStack.push(4);
myStack.push(7);
myStack.push(1);

// console.log(myStack.peek());
// myStack.pop();
// console.log(myStack.peek());

console.log(myStack);

/*  LIFO- Last In First Out

        1
        7
        4
        5
        
*/