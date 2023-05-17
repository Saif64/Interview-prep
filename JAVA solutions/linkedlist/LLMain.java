package leetcode.linkedlist;

public class LLMain {
    public static void main(String[] args) {
        LL list = new LL();
//        LL test = new LL();
//
//        test.deleteAt(3);

        list.addFirst(2);
        list.addFirst(3);
        list.addLast(5);
        list.addLast(7);
        list.addLast(8);
        list.addLast(9);
        list.addAt(10, 3);
        list.insertRec(25, 3);
        list.printList();

        System.out.println(list.getValueAt(4));
        System.out.println(list.size());

        CircularLL cList = new CircularLL();

        cList.add(1);
        cList.add(2);
        cList.add(3);
        cList.add(4);
        cList.add(5);

        cList.deleteAt(3);

        cList.printList();

//        list.deleteFirst();
//        list.deleteLast();
//        list.deleteAt(3);

//        list.reversePrint();


    }


}
