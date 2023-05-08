package leetcode.strings;

public class StringDemo {
    public static void main(String[] args) {
        String a = "abaa";

        System.out.println(isPalindrome(a));
    }

    static boolean isPalindrome(String s) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < s.length(); i++) {
            sb.append(s.charAt(i));
        }

        return sb.reverse().toString().equals(s);
    }
}
