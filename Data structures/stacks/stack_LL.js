// https://visualgo.net/en/list?slide=1

class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor () {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    isEmpty() {
        return 0;
    }

    peek() {
        if (this.isEmpty()) {
            return 0;
        }
        else {
            return this.top;
        }
    }

    push(value) {
        const newNode = new Node(value);
        if (this.length === 0) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            const holdingPointer = this.top;
            this.top = newNode;
            this.top.next = holdingPointer;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.top) {
            return null;
        }
        if (this.top === this.bottom) {
            this.bottom = null;
        }
        // const holdingPointer = this.top;
        this.top = this.top.next;
        this.length--;
        return this;
    }

}

const myStack = new Stack();
myStack.push(5);
myStack.push(4);
myStack.push(7);

console.log(myStack.peek());
myStack.pop();

// console.log(myStack);

/*  LIFO
        7
        4
        5
*/