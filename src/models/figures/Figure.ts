import { Board } from "../Board";
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

export interface IAvailableCells {
    move: Cell[];
    attack: Cell[];
}

export abstract class Figure {
    public figureType!: FiguresEnum;
    public logo: any;

    constructor(
        public board: Board,
        public color: Colors,
        public cell: Cell,
    ) { }

    abstract calculateAvailableCoords(): IAvailableCells
}