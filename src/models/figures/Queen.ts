import { Figure, FiguresEnum, IAvailableCells } from "./Figure";

import blackLogo from '../../assets/black-queen.png';
import whiteLogo from '../../assets/white-queen.png';
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Queen extends Figure {
    constructor(
        board: Board,
        color: Colors,
        cell: Cell
    ) {
        super(board, color, cell);
        this.figureType = FiguresEnum.QUEEN;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    calculateAvailableCoords(): IAvailableCells {
        let result: IAvailableCells = { move: [], attack: [] };
        const verHor = this.board.verticalsHorizontals(this.cell.x, this.cell.y, this.color);
        const diag = this.board.diagonals(this.cell.x, this.cell.y, this.color);

        result.attack = [...verHor.attack, ...diag.attack];
        result.move = [...verHor.move, ...diag.move];

        return result;
    }
}
