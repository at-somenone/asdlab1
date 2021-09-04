import { observer } from 'mobx-react'
import Piece from './Piece'
import styles from './Piece.module.css'

type Props = {
    piece: Piece
}

const PieceView = ({ piece }: Props) => (
    <div className={styles.piece}>
        <div className={styles.code}>
            <span>{piece.code}</span>
        </div>
        <div className={styles.timeLeft}>
            <span>{piece.timeLeft}</span>
        </div>
    </div>
)

export default observer(PieceView)
