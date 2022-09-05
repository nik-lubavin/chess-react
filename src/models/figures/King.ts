import { Figure, FiguresEnum, IAvailableCells } from "./Figure";

import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';
import { Colors } from "../Colors";
import { Board, ICoords } from "../Board";
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
        let result: IAvailableCells = { move: [], attack: [] };

        const coordsArr: ICoords[] = [];
        coordsArr.push({ x: this.cell.x - 1, y: this.cell.y - 1 });
        coordsArr.push({ x: this.cell.x, y: this.cell.y - 1 });
        coordsArr.push({ x: this.cell.x + 1, y: this.cell.y - 1 });

        coordsArr.push({ x: this.cell.x - 1, y: this.cell.y });
        coordsArr.push({ x: this.cell.x + 1, y: this.cell.y });

        coordsArr.push({ x: this.cell.x - 1, y: this.cell.y + 1 });
        coordsArr.push({ x: this.cell.x, y: this.cell.y + 1 });
        coordsArr.push({ x: this.cell.x + 1, y: this.cell.y + 1 });

        const cells = this.board.getManyCells(coordsArr);
        cells.forEach(cell => {
            if (!cell.figure) {
                result.move.push(cell);
            } else if (cell.figure.color !== this.color) {
                result.attack.push(cell);
            }
        });

        return result;
    }
}
