package leetcode.strings;

public class Patterns {
    public static void main(String[] args) {
//        printTriangle(4);
        pattern2(5);
    }

    static void printTriangle(int rows) {
        for (int i = 1; i <= rows; i++) {                                   // *
            for (int j = 1; j <= i; j++) {                                  // **
                System.out.print("*");                                      // ***
            }                                                               // ****
            System.out.println();
        }
    }


    static void pattern2(int rows) {
        for (int i = 1; i <= rows; i++) {
            for (int j = i; j <= rows; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
