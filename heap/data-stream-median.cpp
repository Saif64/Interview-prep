/*
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
*/

// Leetcode 295 
class MedianFinder {
    priority_queue<int> lower;
    priority_queue<int, vector<int>, greater<int>> upper;

public:
    // Adds a number into the data structure.
    void addNum(int num)
    {
        if(lower.empty()) {
            lower.push(num);
        } else if(lower.size() == upper.size()) {
            if(num < upper.top()) {
                lower.push(num);
            } else {
                upper.push(num);
                lower.push(upper.top());
                upper.pop();
            }
        } else {
            if(num > lower.top()) {
                upper.push(num);
            } else {
                lower.push(num);
                upper.push(lower.top());
                lower.pop();
            }
        }
    }

    // Returns the median of current data stream
    double findMedian()
    {
        return lower.size() == upper.size() ? (lower.top() + upper.top())/2.0 : lower.top();
    }
};