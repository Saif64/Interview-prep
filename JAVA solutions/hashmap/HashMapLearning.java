package hashmap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HashMapLearning {
    public static void main(String[] args) {
        String s = "abracadabra";
        int[] a1 = {1, 1, 1, 2, 2, 3, 4, 5};
        int[] a2 = {1, 1, 2, 2, 5};
//        System.out.println(highestFreqChar(s));
//        System.out.println(commonElem(a1, a2));
        System.out.println(commonElm2(a1, a2));
    }


    public static char highestFreqChar(String s) {
        Map<Character, Integer> map = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (map.containsKey(ch)) {
                int of = map.get(ch);
                int nf = of + 1;
                map.put(ch, nf);
            } else {
                map.put(ch, 1);
            }
        }
        char mfc = s.charAt(0);
        for (Character key : map.keySet()) {
            if (map.get(key) > map.get(mfc)) {
                mfc = key;
            }
        }
        return mfc;
    }

    public static List<Integer> commonElem(int[] arr1, int[] arr2) {
        Map<Integer, Integer> map = new HashMap<>();
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < arr1.length; i++) {
            if (map.containsKey(arr1[i])) {
                int of = map.get(arr1[i]);
                int nf = of + 1;
                map.put(arr1[i], nf);
            } else {
                map.put(arr1[i], 1);
            }
        }
        for (int i = 0; i < arr2.length; i++) {
            if (map.containsKey(arr2[i])) {
                list.add(arr2[i]);
                map.remove(arr2[i]);
            }
        }
        return list;
    }

    public static List<Integer> commonElm2(int[] a1, int[] a2) {
        Map<Integer, Integer> map = new HashMap<>();
        List<Integer> list = new ArrayList<>();

        for (int val : a1) {
            if (map.containsKey(val)) {
                int of = map.get(val);
                int nf = of + 1;
                map.put(val, nf);
            } else {
                map.put(val, 1);
            }
        }

        for (int val : a2) {
            if (map.containsKey(val) && map.get(val) > 0) {
                list.add(val);
                int of = map.get(val);
                int nf = of - 1;
                map.put(val, nf);
            }
        }
        return list;
    }
}
