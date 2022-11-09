// https://visualgo.net/en/list?slide=11


class Queue {               //FIFO - First in First Out
    constructor () {
        this.arr = [];
    }

    isEmpty() {
        return 0;
    }

    peek() {
        return this.arr[0];
    }

    queue(value) {
        return this.arr.push(value);
    }

    deQueue() {
        return this.arr.shift();
    }
}


const myQueue = new Queue();

myQueue.queue('saif');
myQueue.queue('ananna');
myQueue.queue('rafiq');

console.log(myQueue.peek());