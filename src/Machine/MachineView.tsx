import { observer } from 'mobx-react'
import styles from './Machine.module.css'
import PieceList from '../Piece/PieceList'
import Machine from './Machine'
import Chance from 'chance'

type Props = {
    machine: Machine
}

// todo remove
const addRandom = (machine: Machine) => {
    const chance = new Chance()
    machine.addPiece({
        code: chance.word({ length: 4, capitalize: false }),
        timeLeft: 5,
    })
}

const MachineView = ({ machine }: Props) => (
    <div className={styles.machine}>
        <div className={styles.buttonList}>
            <button onClick={() => addRandom(machine)}>добавить</button>
            <button onClick={() => machine.progress()}>обработать</button>
            <button onClick={() => machine.dump()}>снять</button>
            <button onClick={() => machine.reset()}>сбросить</button>
        </div>

        <span>
            Последняя обработанная деталь:{' '}
            {machine.lastProcessed && (
                <span>
                    {machine.lastProcessed.code}{' '}
                    {machine.lastProcessed.timeLeft > 0 &&
                        '(снята с обработки)'}{' '}
                </span>
            )}
        </span>
        <br />
        <span>Очередь:</span>
        {machine.contents.length > 0 && <PieceList pieces={machine.contents} />}
    </div>
)

export default observer(MachineView)
