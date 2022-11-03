// https://visualgo.net/en/list


/* 10 --> 5 --> 16  this is how it should look like
let linkedList = {
    head: {
        value: 10,
        next: {
            value: 5,
            next: {
                value: 16,
                next: null
            }
        }
    }
};
*/

// implement by class
/* class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}
*/
class LinkedList {
    /**
     * The constructor function creates a new node with the value passed to the constructor, and sets
     * the head and tail to be the same node, and sets the length to be 1.
     * @param value - The value of the node.
     */
    constructor (value) {
        this.head = {
            value: value,
            next: null
        };
        this.tail = this.head;
        this.length = 1;
    }

    /**
     * The append function takes a value and adds it to the end of the linked list.
     * @param value - the value to be added to the end of the list
     * @returns The linked list object.
     */
    append(value) {
        // const newNode = new Node(value);  // this is when we use Node class and we need to extend OOP
        const newNode = {   // this can have it's own class as well like above
            value: value,
            next: null
        };
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    };

    /**
     * We create a new node, set the next property to be the current head, and then set the head to be
     * the new node.
     * @param value - value,
     * @returns The entire object is being returned.
     */
    prepend(value) {
        const newNode = {    // this is nothing but creating a newNode only like a shell
            value: value,
            next: null
        };
        newNode.next = this.head;       // setting the pointer here
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

    /**
     * We create a new node, then we find the leader node, then we make the leader node point to the
     * new node, then we make the new node point to the follower node, then we increment the length of
     * the list, then we return the list.
     * @param index - the index where you want to insert the value
     * @param value - the value of the new node
     * @returns The return value is the printList() method.
     */
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
            next: null
        };
        const leader = this.treverseToIndex(index - 1);
        const holdingPointer = leader.next;
        leader.next = newNode;
        newNode.next = holdingPointer;
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

    /**
     * The remove function takes in an index and removes the node at that index
     * @param index - the index of the node you want to remove
     * @returns The printList() method is being returned.
     */
    remove(index) {
        const leader = this.treverseToIndex(index - 1);
        const unWantedNode = leader.next;
        leader.next = unWantedNode.next;
        this.length--;
        return this.printList();
    }
}


// initilization
const myLinkedList = new LinkedList(10);

myLinkedList.append(5);
myLinkedList.append(16); // 10 -- > 5 -- > 16;
myLinkedList.prepend(1);  // 1 --> 10 -- > 5 -- > 16;
/*  
             #      #
              \   /                 # means node as example
                #
*/
myLinkedList.insert(2, 99);  // 1 --> 10 --> 99 --> 5 --> 16
myLinkedList.insert(10, 101);  // 1 --> 10 --> 99 --> 5 --> 16 --> 101
myLinkedList.remove(2);  // 1 --> 10 --> 5 --> 16 --> 101

console.log(myLinkedList.printList());

// console.log(myLinkedList);

