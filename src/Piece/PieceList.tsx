import style from './Piece.module.css'
import Piece from './Piece'
import PieceView from './PieceView'

type Props = {
    pieces: Piece[]
}

const PieceList = ({ pieces }: Props) => (
    <div className={style.pieceList}>
        {pieces.map(p => (
            <PieceView piece={p} key={p.code} />
        ))}
    </div>
)

export default PieceList
