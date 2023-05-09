package leetcode.array;

import java.util.Arrays;

public class Sorting {
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 2, 4};
        int[] duplicates = {4, 3, 2, 7, 8, 2, 3, 1};
        int[] negatives = {3, 4, -1, 1};
        int[] leetcode = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};

//        cyclic(leetcode);

//        leetcode = mergeSort(leetcode);
        quickSort(duplicates, 0, duplicates.length - 1);
        System.out.println(Arrays.toString(duplicates));
    }

    // Good for small data
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            arr[j + 1] = key;
        }
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

    // Good for LinkedList
    static int[] mergeSort(int[] arr) {
        if (arr.length == 1) {
            return arr;
        }

        int mid = arr.length / 2;

        int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
        int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));

        return merge(left, right);
    }

    // Not stable but Fastest and Good for Big data
    static void quickSort(int[] arr, int left, int right) {
        if (left >= right) return;

        int start = left;
        int end = right;
        int mid = start + (end - start) / 2;
        int pivot = arr[mid];

        while (start <= end) {
            // if the array is alrady sorted
            while (arr[start] < pivot) {
                start++;
            }
            while (arr[end] > pivot) {
                end--;
            }
            if (start <= end) {
                swap(arr, start, end);
                start++;
                end--;
            }
        }
        quickSort(arr, left, end);
        quickSort(arr, start, right);
    }


    // helper functions for the main sorting algo
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int i = 0, j = 0, k = 0;

        while (i < left.length && j < right.length) {
            result[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
        }

        while (i < left.length) {
            result[k++] = left[i++];
        }

        while (j < right.length) {
            result[k++] = right[j++];
        }

        return result;
    }

    private static void swap(int[] arr, int first, int second) {
        int temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;
    }
}
