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

export abstract class Figure {
    abstract figureType: FiguresEnum;
    abstract logo: any;

    constructor(
        public color: Colors,
        protected x: number,
        protected y: number,
    ) { }

    canMove(cell: Cell): boolean {
        return false;
    }

    abstract calculateAvailableToMoveCells(selectedCell: Cell): Cell[]
}