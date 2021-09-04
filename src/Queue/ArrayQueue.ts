import { makeAutoObservable } from 'mobx'
import IQueue from './IQueue'

export default class ArrayQueue<T> implements IQueue<T> {
    private array: (T | undefined)[]
    private head: number
    private tail: number
    private count = 0

    constructor(readonly size: number) {
        this.array = Array<T>(size + 1)
        this.head = 0
        this.tail = 0
        makeAutoObservable(this)
    }

    enqueue(item: T): void {
        if (this.isFull()) throw new Error('Queue is full')
        this.array[this.tail] = item
        this.tail = (this.tail + 1) % (this.size + 1)
        this.count += 1
    }

    dequeue(): T {
        if (this.isEmpty()) throw new Error('Queue is empty')
        const result = this.peek()
        this.array[this.head] = undefined
        this.head = (this.head + 1) % (this.size + 1)
        this.count -= 1

        return result
    }

    peek(): T {
        if (this.isEmpty()) throw new Error('Queue is empty')
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.array[this.head]!
    }
    
    clear() {
        this.count = 0
        this.array = Array<T>(this.size + 1)
        this.head = 0
        this.tail = 0
    }

    length(): number {
        return this.count
    }

    isFull(): boolean {
        return this.count === this.size
    }

    isEmpty(): boolean {
        return this.count === 0
    }

    contents(): T[] {
        if (this.tail >= this.head) {
            return this.array
                .slice(this.head, this.tail + 1)
                .filter((i): i is T => i !== undefined)
        } else
            return [
                ...this.array.slice(this.head),
                ...this.array.slice(0, this.tail),
            ].filter((i): i is T => i !== undefined)
    }
}
