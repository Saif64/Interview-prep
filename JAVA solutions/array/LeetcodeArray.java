package leetcode.array;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LeetcodeArray {

    static boolean even(int num) {
        int count = 0;
        while (num > 0) {
            count++;
            num = num / 10;
        }

        return count % 2 == 0;
    }

    private static void swap(int[] arr, int first, int second) {
        int temp = arr[first];
        arr[first] = arr[second];
        arr[second] = temp;
    }

    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int temp = m;
        for (int i = 0; i < nums2.length; i++) {
            nums1[temp] = nums2[i];
            temp++;
        }
        Arrays.sort(nums1);
    }

    public int findNumbers(int[] nums) {
        int count = 0;

        for (int num : nums) {
            if (even(num)) {
                count++;
            }
        }

        return count;
    }

    public int maximumWealth(int[][] accounts) {
        int res = 0;

        for (int i = 0; i < accounts.length; i++) {
            int sum = 0;
            for (int j = 0; j < accounts[i].length; j++) {
                sum += accounts[i][j];
            }
            if (res < sum) {
                res = sum;
            }
        }

        return res;
    }

    // https://leetcode.com/problems/missing-number/
    public int missingNumber(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length; i++) {
            if (i != nums[i]) {
                return i;
            }
        }
        return nums.length;
    }

    //https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int i = 0;
        while (i < nums.length) {
            int correctIndex = nums[i] - 1;
            if (nums[i] != nums[correctIndex]) {
                swap(nums, i, correctIndex);
            } else {
                i++;
            }
        }
        List<Integer> list = new ArrayList<>();
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] != j + 1) {
                list.add(j + 1);
            }
        }
        return list;
    }

    //https://leetcode.com/problems/find-all-duplicates-in-an-array/
    public List<Integer> findDuplicates(int[] nums) {
        int i = 0;
        while (i < nums.length) {
            int correctIndex = nums[i] - 1;
            if (nums[i] != nums[correctIndex]) {
                swap(nums, i, correctIndex);
            } else {
                i++;
            }
        }

        List<Integer> list = new ArrayList<>();
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] != j + 1) {
                list.add(nums[j]);
            }
        }
        return list;
    }

    //https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three/
    public int averageValue(int[] nums) {
        int count = 0;
        int sum = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] % 2 == 0 && nums[i] % 3 == 0) {
                count++;
                sum += nums[i];
            }
        }
        if (count == 0) {
            return 0;
        }

        return sum / count;
    }

    //https://leetcode.com/problems/convert-the-temperature/
    public double[] convertTemperature(double celsius) {
        double k = celsius + 273.15;
        double f = celsius * 1.80 + 32.00;

        return new double[]{k, f};
    }


    // https://leetcode.com/problems/check-if-n-and-its-double-exist/description/
    public boolean checkIfExist(int[] arr) {
        Arrays.sort(arr);
        for (int i = 0; i < arr.length; i++) {
            int target = 2 * arr[i];
            int start = 0, end = arr.length - 1;
            while (start <= end) {
                int mid = start + (end - start) / 2;
                if (arr[mid] == target && mid != i)
                    return true;
                if (arr[mid] < target)
                    start = mid + 1;
                else
                    end = mid - 1;
            }
        }

        return false;
    }

    //https://leetcode.com/problems/determine-the-winner-of-a-bowling-game/
    public int isWinner(int[] player1, int[] player2) {
        int sum1 = 0, sum2 = 0;
        for (int i = 0; i < player1.length; i++) {
            if (i == 1) {
                if (player1[i - 1] == 10) {
                    sum1 += (2 * player1[i]);
                } else {
                    sum1 += player1[i];
                }
            } else if (i > 1) {
                if (player1[i - 1] == 10 || player1[i - 2] == 10) {
                    sum1 += (2 * player1[i]);
                } else {
                    sum1 += player1[i];
                }
            } else {
                sum1 += player1[i];
            }
        }
        for (int i = 0; i < player1.length; i++) {
            if (i == 1) {
                if (player2[i - 1] == 10) {
                    sum2 += (2 * player2[i]);
                } else {
                    sum2 += player2[i];
                }
            } else if (i > 1) {
                if (player2[i - 1] == 10 || player2[i - 2] == 10) {
                    sum2 += (2 * player2[i]);
                } else {
                    sum2 += player2[i];
                }
            } else {
                sum2 += player2[i];
            }
        }
        return sum1 > sum2 ? 1 : sum2 > sum1 ? 2 : 0;
    }


    //    https://leetcode.com/problems/flipping-an-image/
    public int[][] flipAndInvertImage(int[][] image) {
        for (int[] row : image) {
            for (int i = 0; i < (image[0].length + 1) / 2; i++) {
                int temp = row[i] ^ 1;
                row[i] = row[image[0].length - i - 1] ^ 1;
                row[image[0].length - i - 1] = temp;
            }
        }
        return image;
    }


    //https://leetcode.com/problems/matrix-diagonal-sum/description/
    public int diagonalSum(int[][] mat) {
        int i = mat.length-1;
        int j = mat[0].length-1;
        int sum = 0;

    while(i >= 0) {
        sum += mat[i][i];
        i--;
    }
    i++;
    while(i < mat.length) {
        if(i != j) sum += mat[i][j];
        i++;
        j--;
    }
    return sum;
    }
}
