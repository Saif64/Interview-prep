package leetcode.array;

import java.util.Arrays;

public class Sorting {
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 2, 4};
        int[] duplicates = {4, 3, 2, 7, 8, 2, 3, 1};
        int[] negatives = {3, 4, -1, 1};
        int[] leetcode = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};

//        cyclic(leetcode);

        negatives = mergeSort(negatives);
        System.out.println(Arrays.toString(negatives));
    }

    // if array is given 0 to N then always this sorting
    static void cyclic(int[] arr) {
        int i = 0;
        while (i < arr.length) {
            int correctIndex = arr[i] - 1;
            if (arr[i] != arr[correctIndex]) {
                swap(arr, i, correctIndex);
            } else {
                i++;
            }
        }
    }

    static int[] mergeSort(int[] arr) {
        if (arr.length == 1) {
            return arr;
        }

        int mid = arr.length / 2;

        int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
        int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));

        return merge(left, right);
    }

//    static int[] quickSort(int[] arr) {
//
//    }


    // helper functions for the main sorting algo
    private static int[] merge(int[] left, int[] right) {
        int leftPointer = 0;
        int rightPointer = 0;
        int newPointer = 0;

        int[] newArray = new int[left.length + right.length];

        while (leftPointer < left.length && rightPointer < right.length) {
            if (left[leftPointer] < right[rightPointer]) {
                newArray[newPointer] = left[leftPointer];
                leftPointer++;
            } else {
                newArray[newPointer] = right[rightPointer];
                rightPointer++;
            }
            newPointer++;
        }

        while (leftPointer < left.length) {
            newArray[newPointer] = left[leftPointer];
            leftPointer++;
            newPointer++;
        }
        while (rightPointer < right.length) {
            newArray[newPointer] = right[rightPointer];
            rightPointer++;
            newPointer++;
        }
        return newArray;
    }

    private static void swap(int[] arr, int first, int second) {
        int temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;
    }
}
