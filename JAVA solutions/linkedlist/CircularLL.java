package leetcode.linkedlist;

public class CircularLL {
    private Node head;
    private Node tail;

    public CircularLL() {
        this.head = null;
        this.tail = null;
    }

    public Node get(int index) {
        Node node = head;
        for (int i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }

    public void add(int value) {
        Node node = new Node(value);
        if (head == null) {
            head = node;
            tail = node;
        }

        tail.next = node;
        node.next = head;
        tail = node;
    }

    public void deleteAt(int index) {
        Node temp = get(index);
        Node prev = get(index - 1);

        prev.next = temp.next;
    }


    public void printList() {
        Node temp = head;

        do {
            System.out.print("[" + temp.value + "] => ");
            temp = temp.next;
        } while (temp != head);
        System.out.println("HEAD");
    }

    private class Node {
        int value;
        Node next;

        public Node(int value) {
            this.value = value;
        }

        public Node(int value, Node next) {
            this.value = value;
            this.next = next;
        }
    }
}
