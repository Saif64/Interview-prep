// https://visualgo.net/en/list?slide=1-1

// implement by class
/* class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
*/
class DoublyLinkedList {
    constructor (value) {
        this.head = {
            value: value,
            next: null,
            prev: null
        };
        this.tail = this.head;
        this.length = 1;
    }
    append(value) {
        // const newNode = new Node(value);  // this is when we use Node class and we need to extend OOP
        const newNode = {   // this can have it's own class as well like above
            value: value,
            next: null,
            prev: null
        };
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    };

    prepend(value) {
        const newNode = {    // this is nothing but creating a newNode only like a shell
            value: value,
            next: null,
            prev: null
        };

        newNode.next = this.head;       // setting the pointer here
        this.head.prev = newNode;
        this.head = newNode;            // setting the reference here
        this.length++;
        return this;
    }

    printList() {
        const arr = [];
        let currentNode = this.head;

        while (currentNode !== null) {
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return arr;
    }

    insert(index, value) {
        /* If the index is greater than or equal to the length of the list, then we just append the
        value to the end of the list. */
        if (index >= this.length) return this.append(value);

        /* If the index is 0, then we just prepend the value to the list. */
        if (index === 0) {
            this.prepend(value);
            return this.printList();
        }

        const newNode = {
            value: value,
            next: null,
            prev: null
        };
        const prevNode = this.treverseToIndex(index - 1);
        const nextNode = prevNode.next;
        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = nextNode;
        this.length++;
        return this.printList();
    }

    treverseToIndex(index) {
        let counter = 0;
        let currentNode = this.head;

        while (counter !== index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    remove(index) {
        const prevNode = this.treverseToIndex(index - 1); // grabs the prev node of the index given
        // console.log(prevNode);
        const unWantedNode = prevNode.next;
        prevNode.next = unWantedNode.next;
        this.length--;
        return this.printList();
    }
}


// initilization
const myDoublyLinkedList = new DoublyLinkedList(10);

myDoublyLinkedList.append(5);
myDoublyLinkedList.append(16); // 10 <-- > 5 <-- > 16;
myDoublyLinkedList.prepend(1);  // 1 <--> 10 <-- > 5 <-- > 16;
/*  
             #      #
              \   /                 # means node as example
                #
*/
myDoublyLinkedList.insert(1, 99);  // 1 <--> 10 <--> 99 <--> 5 <--> 16
// myDoublyLinkedList.insert(10, 101);  // 1 <--> 10 <--> 99 <--> 5 <--> 16 <--> 101
// myDoublyLinkedList.remove(2);  // 1 <--> 10 <--> 5 <--> 16 <--> 101

console.log(myDoublyLinkedList.printList());

console.log(myDoublyLinkedList);