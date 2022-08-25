import { Figure, FiguresEnum } from "./Figure";

import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';
import { Colors } from "../Colors";

export class King extends Figure {
    constructor(public color: Colors) {
        super(color);
        this.figureType = FiguresEnum.KING;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }
}
