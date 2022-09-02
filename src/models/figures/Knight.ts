import { Figure, FiguresEnum, IAvailableCells } from "./Figure";

import blackLogo from '../../assets/black-knight.png';
import whiteLogo from '../../assets/white-knight.png';
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Knight extends Figure {
    constructor(
        board: Board,
        color: Colors,
        cell: Cell,
    ) {
        super(board, color, cell);
        this.figureType = FiguresEnum.KNIGHT;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    calculateAvailableCoords(): IAvailableCells {
        let result: IAvailableCells = { move: [], attack: [] };
        // const moveCoords: ICoords[] = [];
        // const attackCoords: ICoords[] = [];

        // if (this.color === Colors.WHITE) {
        //     moveCoords.push({ x: this.x, y: this.y - 1 });
        //     if (this.y === 6) {
        //         moveCoords.push({ x: this.x, y: this.y - 2 });
        //     }

        //     // attack
        //     attackCoords.push({ x: this.x - 1, y: this.y - 1 });
        //     attackCoords.push({ x: this.x + 1, y: this.y - 1 });
        // } else {
        //     // Black
        //     moveCoords.push({ x: this.x, y: this.y + 1 });
        //     if (this.y === 1) {
        //         moveCoords.push({ x: this.x, y: this.y + 2 });
        //     }

        //     // attack
        //     attackCoords.push({ x: this.x - 1, y: this.y + 1 });
        //     attackCoords.push({ x: this.x + 1, y: this.y + 1 });
        // }

        // result.move = this.board.getManyCells(moveCoords).filter(cell => !!cell);
        // result.attack = this.board.getManyCells(attackCoords)
        //     .filter(cell => !!cell && !!cell.figure
        //         && cell.figure.color !== this.color);

        return result;
    }


}
