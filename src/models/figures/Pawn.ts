import { Figure, FiguresEnum } from "./Figure";

import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import { ICoords } from "../Board";

export class Pawn extends Figure {
    public figureType: FiguresEnum;
    public logo: string;

    constructor(
        color: Colors,
        x: number,
        y: number,
    ) {
        super(color, x, y);
        this.figureType = FiguresEnum.PAWN;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

    calculateAvailableToMoveCells(): Cell[] {
        let movingCoords: ICoords[] = [];

        if (this.color === Colors.WHITE) {
            movingCoords.push({ x: this.x, y: this.y - 1 });
            if (this.y === 6) {
                movingCoords.push({ x: this.x, y: this.y - 2 });
            }
        } else {
            // Black
            movingCoords.push({ x: this.x, y: this.y + 1 });
            if (this.y === 1) {
                movingCoords.push({ x: this.x, y: this. + 2 });
            }
        }

        return movingCoords;
    }

}