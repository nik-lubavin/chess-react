import { Figure, FiguresEnum } from "./Figure";

import blackLogo from '../../assets/black-bishop.png';
import whiteLogo from '../../assets/white-bishop.png';
import { Colors } from "../Colors";

export class Bishop extends Figure {
    constructor(public color: Colors) {
        super(color);
        this.figureType = FiguresEnum.BISHOP;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }
}
