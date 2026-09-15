package neetcode.lib

/**
 * Shared test helpers for the NeetCode 150 Kotlin solutions.
 *
 * Deliberately dependency-free: no JUnit, no Kotest. Each solution declares a `main`
 * that asserts its own behaviour, so a single `kotlinc` pass plus a `java` invocation is
 * the entire test story. See tools/test-kotlin.js.
 */

/** A singly linked list node, matching LeetCode's definition. */
class ListNode(@JvmField var `val`: Int = 0, @JvmField var next: ListNode? = null)

/** A binary tree node, matching LeetCode's definition. */
class TreeNode(
    @JvmField var `val`: Int = 0,
    @JvmField var left: TreeNode? = null,
    @JvmField var right: TreeNode? = null,
)

/** Build a linked list from values. */
fun listOfNodes(vararg values: Int): ListNode? {
    val dummy = ListNode()
    var tail = dummy
    for (v in values) {
        tail.next = ListNode(v)
        tail = tail.next!!
    }
    return dummy.next
}

/**
 * Flatten a linked list back to a List.
 * Stops after [limit] nodes so a cycle can never hang a test.
 */
fun ListNode?.toList(limit: Int = 10_000): List<Int> {
    val out = ArrayList<Int>()
    var node = this
    while (node != null && out.size < limit) {
        out.add(node.`val`)
        node = node.next
    }
    return out
}

/** Build a binary tree from LeetCode's level-order array format (null = missing child). */
fun treeOf(vararg values: Int?): TreeNode? {
    if (values.isEmpty() || values[0] == null) return null
    val root = TreeNode(values[0]!!)
    val queue = ArrayDeque<TreeNode>()
    queue.addLast(root)
    var i = 1
    while (i < values.size && queue.isNotEmpty()) {
        val node = queue.removeFirst()
        if (i < values.size) {
            values[i]?.let { node.left = TreeNode(it); queue.addLast(node.left!!) }
            i++
        }
        if (i < values.size) {
            values[i]?.let { node.right = TreeNode(it); queue.addLast(node.right!!) }
            i++
        }
    }
    return root
}

/** Flatten a binary tree back to level-order, trailing nulls trimmed. */
fun TreeNode?.toLevelOrder(): List<Int?> {
    if (this == null) return emptyList()
    val out = ArrayList<Int?>()
    val queue = ArrayDeque<TreeNode?>()
    queue.addLast(this)
    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        if (node == null) {
            out.add(null)
        } else {
            out.add(node.`val`)
            queue.addLast(node.left)
            queue.addLast(node.right)
        }
    }
    while (out.isNotEmpty() && out.last() == null) out.removeAt(out.size - 1)
    return out
}

/**
 * Assert equality with a message that shows both sides.
 *
 * Kotlin's stdlib `check` only reports that something was false, which is useless when a
 * test fails weeks later. This prints what was expected and what actually arrived.
 */
fun <T> eq(actual: T, expected: T, note: String = "") {
    if (actual != expected) {
        val where = if (note.isEmpty()) "" else " ($note)"
        throw AssertionError("expected <$expected> but was <$actual>$where")
    }
}

/** Array-aware variant of [eq], since IntArray equality is referential. */
fun eq(actual: IntArray, expected: IntArray, note: String = "") {
    if (!actual.contentEquals(expected)) {
        val where = if (note.isEmpty()) "" else " ($note)"
        throw AssertionError(
            "expected <${expected.toList()}> but was <${actual.toList()}>$where"
        )
    }
}

/** Assert a condition holds. */
fun that(condition: Boolean, note: String = "condition failed") {
    if (!condition) throw AssertionError(note)
}

/**
 * Order-insensitive comparison for a list of lists, for problems whose answers may come
 * back in any order (subsets, combinations, groupings).
 *
 * Named separately from [bag] rather than overloaded: both erase to the same JVM
 * signature, so the compiler rejects them as a platform declaration clash.
 */
fun <T : Comparable<T>> bagOfLists(items: Iterable<List<T>>): List<List<T>> =
    items.map { it.sorted() }.sortedBy { it.joinToString(",") }

/** Order-insensitive comparison for a flat collection. */
fun <T : Comparable<T>> bag(items: Iterable<T>): List<T> = items.sorted()
