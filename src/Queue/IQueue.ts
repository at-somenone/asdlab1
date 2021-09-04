export default interface IQueue<T> {
    enqueue(item: T): void
    dequeue(): T
    peek(): T
    clear(): void   
    length(): number
    isFull(): boolean
    isEmpty(): boolean
    contents(): T[]
}