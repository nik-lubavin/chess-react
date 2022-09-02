import { Figure, FiguresEnum, IAvailableCells } from "./Figure";

import blackLogo from '../../assets/black-rook.png';
import whiteLogo from '../../assets/white-rook.png';
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Rook extends Figure {
    constructor(
        board: Board,
        color: Colors,
        cell: Cell,
    ) {
        super(board, color, cell);
        this.figureType = FiguresEnum.ROOK;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    calculateAvailableCoords(): IAvailableCells {

        const result = this.board.verticalsHorizontals(this.cell.x, this.cell.y, this.color);
        return result;
    }
}
