import { Figure, FiguresEnum } from "./Figure";

import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Colors } from "../Colors";

export class Pawn extends Figure {
    constructor(public color: Colors) {
        super(color);
        this.figureType = FiguresEnum.PAWN;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }

}