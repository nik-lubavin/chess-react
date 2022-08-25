import { Figure, FiguresEnum } from "./Figure";

import blackLogo from '../../assets/black-rook.png';
import whiteLogo from '../../assets/white-rook.png';
import { Colors } from "../Colors";

export class Rook extends Figure {
    constructor(public color: Colors) {
        super(color);
        this.figureType = FiguresEnum.ROOK;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }
}
