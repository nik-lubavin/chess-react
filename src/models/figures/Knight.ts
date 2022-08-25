import { Figure, FiguresEnum } from "./Figure";

import blackLogo from '../../assets/black-knight.png';
import whiteLogo from '../../assets/white-knight.png';
import { Colors } from "../Colors";

export class Knight extends Figure {
    constructor(public color: Colors) {
        super(color);
        this.figureType = FiguresEnum.KNIGHT;
        this.logo = this.color === Colors.WHITE ? whiteLogo : blackLogo;
    }
}
