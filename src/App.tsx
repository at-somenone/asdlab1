import { action } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react'
import Keyed from './Keyed'
import Machine from './Machine/Machine'
import MachineView from './Machine/MachineView'
import Piece from './Piece/Piece'
import ObservableArrayQueue from './Queue/ObservableArrayQueue'
import ObservableLinkedListQueue from './Queue/ObservableLinkedListQueue'

function App() {
    const state = useLocalObservable(() => ({ useArrayQueue: true }))
    const queue = state.useArrayQueue
        ? new ObservableArrayQueue<Keyed<Piece>>(5)
        : new ObservableLinkedListQueue<Keyed<Piece>>()
    const machine = new Machine(queue)

    return (
        <>
            <input
                type="radio"
                name="yeah"
                id="r1"
                checked={state.useArrayQueue}
                onChange={action(e => {
                    state.useArrayQueue = e.target.checked
                })}
            />
            <label htmlFor="r1">Последовательная</label>
            <br />
            <input
                type="radio"
                name="yeah"
                id="r2"
                checked={!state.useArrayQueue}
                onChange={action(e => {
                    state.useArrayQueue = !e.target.checked
                })}
            />
            <label htmlFor="r2">Связная</label>
            <MachineView machine={machine} />
        </>
    )
}

export default observer(App)
