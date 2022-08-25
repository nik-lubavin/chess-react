import { Figure, FiguresEnum } from "./Figure";

import blackLogo from '../../assets/black-queen.png';
import whiteLogo from '../../assets/white-queen.png';
import { Colors } from "../Colors";

export class Queen extends Figure {
    constructor(public color: Colors) {
        super(color);
        this.figureType = FiguresEnum.QUEEN;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }
}
