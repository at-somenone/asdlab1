import { IAtom, createAtom } from 'mobx'
import LinkedListQueue from './LinkedListQueue'

export default class ObservableLinkedListQueue<T> extends LinkedListQueue<T> {
    private readonly atom: IAtom

    constructor() {
        super()
        this.atom = createAtom('ObservableArrayQueue')
    }

    enqueue(item: T) {
        super.enqueue(item)
        this.atom.reportChanged()
    }

    dequeue() {
        const result = super.dequeue()
        this.atom.reportChanged()
        return result
    }

    peek() {
        this.atom.reportObserved()
        return super.peek()
    }

    clear() {
        this.atom.reportChanged()
        super.clear()
    }

    length() {
        this.atom.reportObserved()
        return super.length()
    }

    isFull() {
        this.atom.reportObserved()
        return super.isFull()
    }

    isEmpty() {
        this.atom.reportObserved()
        return super.isEmpty()
    }

    contents() {
        this.atom.reportObserved()
        return super.contents()
    }
}
