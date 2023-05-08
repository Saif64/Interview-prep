package leetcode.strings;

public class LeetcodeString {
    //https://leetcode.com/problems/reverse-prefix-of-word/
    public String reversePrefix(String word, char ch) {
        StringBuilder sb = new StringBuilder();
        int index = word.indexOf(ch);
        sb.append(word.substring(0, index + 1));
        sb.reverse();
        sb.append(word.substring(index + 1));
        return sb.toString();

    }

    //https://leetcode.com/problems/maximum-number-of-words-found-in-sentences/
    public int mostWordsFound(String[] sentences) {
        int count = 0;
        for (int i = 0; i < sentences.length; i++) {
            String[] len = sentences[i].split(" ");
            int size = len.length;
            if (size > count) count = size;
        }
        return count;
    }

    //https://leetcode.com/problems/circular-sentence/
    public boolean isCircularSentence(String s) {
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ' ') {
                if (s.charAt(i - 1) != s.charAt(i + 1)) {
                    return false;
                }
            }
        }
        return s.charAt(0) == s.charAt(s.length() - 1);
    }

    //https://leetcode.com/problems/adding-spaces-to-a-string/
    public String addSpaces(String s, int[] spaces) {
        StringBuilder sb = new StringBuilder(s);

        for (int i = 0; i < spaces.length; i++) {
            sb.insert(spaces[i] + i, " ");
        }

        return sb.toString();

    }
}
