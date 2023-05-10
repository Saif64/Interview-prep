package recursion.subsetsAndSequence;

import java.util.ArrayList;
import java.util.List;

public class Recursion_II {
    public static void main(String[] args) {
        String s = "baaacd";
        String seq = "abc";
//        skipChar("", s, 'c');
//        System.out.println(skipStr("University", "ver"));
//        seqOfString("", seq);
        System.out.println(seqOfStringRet("", seq));
        System.out.println("total subsets are: " + (int) Math.pow(2, seq.length()));  // to find how many subsets there can be of a string
    }

    // ******* String *********
    static void skipChar(String ans, String initalStr, char wantToSkip) {
        if (initalStr.isEmpty()) {
            System.out.println(ans);
            return;
        }
        char ch = initalStr.charAt(0);
        if (ch == wantToSkip) {
            skipChar(ans, initalStr.substring(1), wantToSkip);
        } else {
            skipChar(ans + ch, initalStr.substring(1), wantToSkip);
        }
    }

    static String skipStr(String str, String wantToSkip) {
        if (str.isEmpty()) return "";

        if (str.startsWith(wantToSkip)) {
            return skipStr(str.substring(wantToSkip.length()), wantToSkip);
        } else {
            return str.charAt(0) + skipStr(str.substring(1), wantToSkip);
        }
    }

    // ******* Subsets & Sequence *********
    static void seqOfString(String p, String up) {  // p --> processed  || up --> unprocessed
        if (up.isEmpty()) {
            System.out.println(p);
            return;
        }
        char ch = up.charAt(0);

        seqOfString(p + ch, up.substring(1));
        seqOfString(p, up.substring(1));
    }

    static List<String> seqOfStringRet(String p, String up) {  // p --> processed  || up --> unprocessed
        if (up.isEmpty()) {
            List<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }
        char ch = up.charAt(0);

        List<String> left = seqOfStringRet(p + ch, up.substring(1));
        List<String> right = seqOfStringRet(p, up.substring(1));

        left.addAll(right);
        return left;
    }
}
