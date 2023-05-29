package heap;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class HeapQuestions {
    public static void main(String[] args) {
        int[] arr = {18, 6, 2, 5, 12, 5, 17, 16};
        int[] nearlySorted = {2, 3, 1, 4, 6, 7, 5, 8, 9};
//        System.out.println(kLargestEelm(arr, 3));
        System.out.println(kSortedList(nearlySorted, 2));
    }

    // return k number of items in the list that are largest
    public static List<Integer> kLargestEelm(int[] arr, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {
            if (i < k) {
                pq.add(arr[i]);
            } else {
                if (arr[i] > pq.peek()) {
                    pq.remove();
                    pq.add(arr[i]);
                }
            }
        }
        while (pq.size() > 0) {
            list.add(pq.remove());
        }
        return list;
    }

    public static List<Integer> kSortedList(int[] arr, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i <= k; i++) {
            pq.add(arr[i]);
        }

        for (int i = k + 1; i < arr.length; i++) {
            list.add(pq.remove());
            pq.add(arr[i]);
        }

        while (pq.size() > 0) {
            list.add(pq.remove());
        }
        return list;
    }
}
