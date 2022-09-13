import { Figure, FiguresEnum, IAvailableCells } from "./Figure";

import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Colors } from "../Colors";
import { Board, ICoords } from "../Board";
import { Cell } from "../Cell";

export class Pawn extends Figure {
    public figureType: FiguresEnum;
    public logo: string;

    constructor(
        board: Board,
        color: Colors,
        cell: Cell,
    ) {
        super(board, color, cell);
        this.figureType = FiguresEnum.PAWN;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    calculateAvailableCoords(): IAvailableCells {
        let result: IAvailableCells = { move: [], attack: [] };
        const moveCoords: ICoords[] = [];
        const attackCoords: ICoords[] = [];

        if (this.color === Colors.WHITE) {
            moveCoords.push({ x: this.cell.x, y: this.cell.y - 1 });
            if (this.cell.y === 6) {
                moveCoords.push({ x: this.cell.x, y: this.cell.y - 2 });
            }

            // attack
            attackCoords.push({ x: this.cell.x - 1, y: this.cell.y - 1 });
            attackCoords.push({ x: this.cell.x + 1, y: this.cell.y - 1 });
        } else {
            // Black
            moveCoords.push({ x: this.cell.x, y: this.cell.y + 1 });
            if (this.cell.y === 1) {
                moveCoords.push({ x: this.cell.x, y: this.cell.y + 2 });
            }

            // attack
            attackCoords.push({ x: this.cell.x - 1, y: this.cell.y + 1 });
            attackCoords.push({ x: this.cell.x + 1, y: this.cell.y + 1 });
        }

        result.move = this.board.getManyCells(moveCoords)
            .filter(cell => !!cell && !cell.figure);
        result.attack = this.board.getManyCells(attackCoords)
            .filter(cell => !!cell && !!cell.figure
                && cell.figure.color !== this.color);

        return result;
    }

}