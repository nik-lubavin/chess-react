import { Board } from "./Board";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FiguresEnum } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export interface IFigure {
    figureType: FiguresEnum, color: Colors
}

export class Cell {
    color: Colors;
    figure!: Figure | null;
    id: number; // React key

    constructor(
        private board: Board,
        public readonly x: number,
        public readonly y: number,
        figureLocation?: IFigure
    ) {
        this.color = (this.x + this.y) % 2 !== 0 ? Colors.BLACK : Colors.WHITE;
        this.id = this.x + this.y * 10;

        this.initStartingFigure(figureLocation);
    }

    private initStartingFigure(figureLocation?: { figureType: FiguresEnum, color: Colors }) {
        if (figureLocation) {
            switch (figureLocation.figureType) {
                case (FiguresEnum.BISHOP):
                    this.figure = new Bishop(this.board, figureLocation.color, this);
                    break;
                case (FiguresEnum.KING):
                    this.figure = new King(this.board, figureLocation.color, this);
                    break;
                case (FiguresEnum.KNIGHT):
                    this.figure = new Knight(this.board, figureLocation.color, this);
                    break;
                case (FiguresEnum.PAWN):
                    this.figure = new Pawn(this.board, figureLocation.color, this);
                    break;
                case (FiguresEnum.QUEEN):
                    this.figure = new Queen(this.board, figureLocation.color, this);
                    break;
                case (FiguresEnum.ROOK):
                    this.figure = new Rook(this.board, figureLocation.color, this);
                    break;
            }
        } else {
            if (this.y === 0) {
                switch (this.x) {
                    case 0:
                    case 7:
                        this.figure = new Rook(this.board, Colors.BLACK, this);
                        break;
                    case 1:
                    case 6:
                        this.figure = new Knight(this.board, Colors.BLACK, this);
                        break;
                    case 2:
                    case 5:
                        this.figure = new Bishop(this.board, Colors.BLACK, this);
                        break;
                    case 4:
                        this.figure = new King(this.board, Colors.BLACK, this);
                        break;
                    case 3:
                        this.figure = new Queen(this.board, Colors.BLACK, this);
                        break;
                }
            } else if (this.y === 1) {
                this.figure = new Pawn(this.board, Colors.BLACK, this);
            } else if (this.y === 6) {
                this.figure = new Pawn(this.board, Colors.WHITE, this);
            } else if (this.y === 7) {
                switch (this.x) {
                    case 0:
                    case 7:
                        this.figure = new Rook(this.board, Colors.WHITE, this);
                        break;
                    case 1:
                    case 6:
                        this.figure = new Knight(this.board, Colors.WHITE, this);
                        break;
                    case 2:
                    case 5:
                        this.figure = new Bishop(this.board, Colors.WHITE, this);
                        break;
                    case 4:
                        this.figure = new King(this.board, Colors.WHITE, this);
                        break;
                    case 3:
                        this.figure = new Queen(this.board, Colors.WHITE, this);
                        break;
                }
            } else {
                this.figure = null;
            }

        }
    }
}