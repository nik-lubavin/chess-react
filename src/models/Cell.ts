import { Board } from "./Board";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Cell {
    color: Colors;
    figure!: Figure | null;
    available: boolean;
    id: number; // React key

    constructor(
        private board: Board,
        public readonly x: number,
        public readonly y: number
    ) {
        this.color = (this.x + this.y) % 2 !== 0 ? Colors.BLACK : Colors.WHITE;
        this.available = false;
        this.id = this.x + this.y * 10;

        this.initStartingFigure();
    }

    private initStartingFigure() {
        // TODO Figure
        if (this.y === 0) {
            switch (this.x) {
                case 0:
                case 7:
                    this.figure = new Rook(Colors.BLACK);
                    break;
                case 1:
                case 6:
                    this.figure = new Knight(Colors.BLACK);
                    break;
                case 2:
                case 5:
                    this.figure = new Bishop(Colors.BLACK);
                    break;
                case 4:
                    this.figure = new King(Colors.BLACK);
                    break;
                case 3:
                    this.figure = new Queen(Colors.BLACK);
                    break;

            }

        } else if (this.y === 1) {
            this.figure = new Pawn(Colors.BLACK);
        } else if (this.y === 6) {
            this.figure = new Pawn(Colors.WHITE);
        } else if (this.y === 7) {
            switch (this.x) {
                case 0:
                case 7:
                    this.figure = new Rook(Colors.WHITE);
                    break;
                case 1:
                case 6:
                    this.figure = new Knight(Colors.WHITE);
                    break;
                case 2:
                case 5:
                    this.figure = new Bishop(Colors.WHITE);
                    break;
                case 4:
                    this.figure = new King(Colors.WHITE);
                    break;
                case 3:
                    this.figure = new Queen(Colors.WHITE);
                    break;
            }

        } else {
            this.figure = null;
        }
    }
}