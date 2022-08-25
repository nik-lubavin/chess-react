import { Cell } from "../Cell";
import { Colors } from "../Colors";

export enum FiguresEnum {
    BISHOP = 'bishop',
    KING = 'king',
    KNIGHT = 'knight',
    PAWN = 'pawn',
    QUEEN = 'queen',
    ROOK = 'rook',
}

export class Figure {
    public logo: any;
    public figureType!: FiguresEnum;

    constructor(
        public color: Colors
    ) { }

    canMove(cell: Cell): boolean {
        return false;
    }

}