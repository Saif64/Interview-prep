package leetcode.linkedlist;

public class LL {
    private Node head;
    private Node tail;
    private int size;

    public LL() {
        this.size = 0;
    }

    public Node get(int index) {
        Node node = head;
        for (int i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }


    public void reversePrint() {
        int index = 1;
        Node temp = get(size - index);
        while (temp != head) {
            temp = get(size - index);
            System.out.print("[" + temp.value + "] => ");
            index++;
        }
        System.out.println("null");
    }

    public void addFirst(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;

        if (tail == null) tail = head;
        size++;
    }

    public void addLast(int value) {
        Node node = new Node(value);
        if (tail == null) addFirst(value);
        tail.next = node;
        tail = node;
        size++;
    }

    public void addAt(int value, int index) {
        if (index == 0) {
            addFirst(value);
            return;
        }

        if (index == size) {
            addLast(value);
            return;
        }

        Node temp = head;
        for (int i = 1; i < index; i++) {
            temp = temp.next;
        }

        Node node = new Node(value, temp.next);
        temp.next = node;
        size++;
    }


    public void deleteFirst() {
        head = head.next;
        size--;
    }

    public void deleteLast() {
        if (size <= 1) {
            deleteFirst();
        }
        Node secondLast = get(size - 2);
        tail = secondLast;
        tail.next = null;
        size--;
    }

    public void deleteAt(int index) {
        if (head == null && tail == null) {
            System.out.println("There is no nodes to delete");
            return;
        }

        Node removeNode = get(index);
        Node prevNode = get(index - 1);

        prevNode.next = removeNode.next;
        size--;
    }

    public int getValueAt(int index) {
        Node target = get(index);
        Node temp = head;
        while (temp != target) {
            temp = temp.next;
        }

        return temp.value;
    }

    public int size() {
        return size;
    }

    public void printList() {
        Node temp = head;

        while (temp != null) {
            System.out.print("[" + temp.value + "] => ");
            temp = temp.next;
        }
        System.out.println("Null");
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
