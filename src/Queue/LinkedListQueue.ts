import IQueue from './IQueue'

type Node<T> = {
    item: T
    next?: Node<T>
}

export default class LinkedListQueue<T> implements IQueue<T> {
    private firstNode?: Node<T>
    private lastNode?: Node<T>
    private size = 0

    enqueue(item: T): void {
        const newNode = { item }

        if (!this.firstNode) {
            this.firstNode = newNode
            this.lastNode = newNode
        } else if (this.lastNode) {
            this.lastNode.next = newNode
            this.lastNode = this.lastNode.next
        }

        this.size += 1
    }

    dequeue(): T {
        if (!this.firstNode) throw new Error('Queue is empty')
        const result = this.firstNode.item
        if (this.lastNode === this.firstNode) this.lastNode = undefined
        this.firstNode = this.firstNode.next
        return result
    }

    peek(): T {
        if (!this.firstNode) throw new Error('Queue is empty')
        return this.firstNode.item
    }

    clear(): void {
        this.firstNode = undefined
        this.lastNode = undefined
    }

    length(): number {
        return this.size
    }

    isFull(): boolean {
        return false
    }

    isEmpty(): boolean {
        return !this.firstNode
    }

    contents(): T[] {
        const arr = []
        let currentNode = this.firstNode
        while (currentNode) {
            arr.push(currentNode.item)
            currentNode = currentNode.next
        }

        return arr
    }
}
