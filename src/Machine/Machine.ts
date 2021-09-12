import { action, computed, makeObservable, observable } from 'mobx'
import IQueue from '../Queue/IQueue'
import Piece from '../Piece/Piece'

export default class Machine {
    @observable private pieces: IQueue<Piece>
    @observable lastProcessed?: Piece

    constructor(queue: IQueue<Piece>) {
        this.pieces = queue
        makeObservable(this)
    }

    @action reset() {
        this.pieces.clear()
        this.lastProcessed = undefined
    }

    @action progress() {
        if (this.pieces.isEmpty()) return
        const current = this.pieces.peek()
        current.timeLeft -= 1
        if (current.timeLeft <= 0) this.lastProcessed = this.pieces.dequeue()
    }

    @action dump() {
        if (this.pieces.isEmpty()) return
        this.lastProcessed = this.pieces.dequeue()
    }

    @action addPiece(piece: Piece) {
        if (this.isFull) return
        this.pieces.enqueue(observable(piece))
    }

    @computed get anyQueued() {
        return !this.pieces.isEmpty()
    }

    @computed get contents() {
        return this.pieces.contents()
    }

    @computed get isFull() {
        return this.pieces.isFull()
    }
}
