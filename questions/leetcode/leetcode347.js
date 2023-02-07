
/* * *@param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function (nums, k) {

    let map = new Map();
    let maxHeap = new MaxPriorityQueue((item) => item.value);


    // O(n) Time complexity
    for (let num of nums) {
        if (!map.get(num)) {
            map.set(num, 1);
        } else {
            map.set(num, map.get(num) + 1);
        }
    }



    let ans = [];
    // We are building a maxHeap for the D unique item
    // O(D) time complexity
    for (let [key, value] of map) {
        maxHeap.enqueue(key, value);
    }



    for (let i = 0; i < k; i++) {
        // We are dequeuing the k elements which can take upto O(klogD)
        let _item = maxHeap.dequeue();
        ans.push(_item.element);
    }

    return ans;
};