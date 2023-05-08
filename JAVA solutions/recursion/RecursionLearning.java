package recursion;

public class RecursionLearning {
    public static void main(String[] args) {
//        printNumebr(1); // prints 1 to 5
//        printEven(1);
//        printNumebr(1, 10);
//        int[] arr = {1, 2, 3, 4, 5};
//        printArray(arr, 0);

//        System.out.println(sum(1, 5));
//        int[] arr = {1, 2, 3, 4, 5, 6};

//        System.out.println(binarySearch(arr, 5, 0, arr.length - 1));

//        printReversed(10, 1);
//        System.out.println(prod(3));
//        System.out.println(sumOfDifgits(123));

        System.out.println(prodOfDgits(23));

    }

    static int binarySearch(int[] arr, int target, int start, int end) {
        if (start > end) return -1;

        int mid = start + (end - start) / 2;

        if (arr[mid] == target) return mid;

        if (arr[mid] < target) {
            return binarySearch(arr, target, mid + 1, end);
        }
        return binarySearch(arr, target, start, mid - 1);
    }

    static void printNumebr(int start, int end) {
        if (start > end) {
            return;
        }
        System.out.print(start + " ");
        printNumebr(start + 1, end);
    }

    static void printReversed(int end, int start) {
        if (end < start) {
            return;
        }
        System.out.print(end + " ");
        printReversed(end - 1, start);
    }

    static void printEven(int n) {
        if (n > 10) {
            return;
        }
        if (n % 2 == 0) System.out.println(n);

        printEven(n + 1);
    }

    static void printArray(int[] arr, int n) {
        if (n == arr.length) return;

        System.out.println(arr[n]);
        printArray(arr, n + 1);
    }

    static int sum(int start, int end) {
        if (start == end) {
            return start;
        }
        return start + sum(start + 1, end);
    }

    static int prod(int n) {
        if (n == 1) {
            return n;
        }

        return n * prod(n - 1);
    }

    static int sumOfDifgits(int n) {
        if (n == 0) {
            return 0;
        }

        return sumOfDifgits(n / 10) + n % 10;
    }

    static int prodOfDgits(int n) {
        if (n % 10 == n) {
            return n;
        }

        return (n % 10) * prodOfDgits(n / 10);
    }

    static boolean isArraySorted(int[] arr, int index) {
        if (index == arr.length - 1) return true;

        return arr[index] < arr[index + 1] && isArraySorted(arr, index + 1);
    }

    static boolean linearSearch(int[] arr, int target, int index) {
        if (index == arr.length) return false;

        return arr[index] == target || linearSearch(arr, target, index + 1);
    }
}
