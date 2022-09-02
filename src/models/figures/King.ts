import { Figure, FiguresEnum, IAvailableCells } from "./Figure";

import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class King extends Figure {
    constructor(
        board: Board, color: Colors, cell: Cell
    ) {
        super(board, color, cell);
        this.figureType = FiguresEnum.KING;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    calculateAvailableCoords(): IAvailableCells {
        return { move: [], attack: [] }
    }
}
