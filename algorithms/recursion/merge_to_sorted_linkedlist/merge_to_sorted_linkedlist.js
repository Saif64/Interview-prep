/*
    @parm a is node
    @parm b is node

*/

const merge = (a, b) => {
    if (a === null) return b;
    if (b === null) return a;

    if (a.data < b.data) {
        a.next = merge(a.next, b);
        return a;
    } else {
        b.next = merge(a, b.next);
        return b;
    }
};