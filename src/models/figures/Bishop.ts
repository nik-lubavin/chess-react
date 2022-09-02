import { Figure, FiguresEnum, IAvailableCells } from "./Figure";

import blackLogo from '../../assets/black-bishop.png';
import whiteLogo from '../../assets/white-bishop.png';
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Bishop extends Figure {
    constructor(
        board: Board, color: Colors, cell: Cell
    ) {
        super(board, color, cell);
        this.figureType = FiguresEnum.BISHOP;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    calculateAvailableCoords(): IAvailableCells {
        const result = this.board.diagonals(this.cell.x, this.cell.y, this.color);
        return result;
    }
}
