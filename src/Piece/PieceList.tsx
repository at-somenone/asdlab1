import style from './Piece.module.css'
import Keyed from '../Keyed'
import Piece from './Piece'
import PieceView from './PieceView'

type Props = {
    pieces: Keyed<Piece>[]
}

const PieceList = ({ pieces }: Props) => (
    <div className={style.pieceList}>
        {pieces.map(p => (
            <PieceView piece={p} key={p.key} />
        ))}
    </div>
)

export default PieceList
