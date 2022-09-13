import { FC } from "react";
import { Colors } from "../models/Colors";

interface MenuProps {
    currentTurn: Colors;
    restartBoard: () => void
}

const MenuComponent: FC<MenuProps> = ({ currentTurn, restartBoard }) => {
    return (<div className="menu">
        {currentTurn === Colors.BLACK && <div>Black turn</div>}
        <button onClick={() => restartBoard()}>Restart board</button>
        {currentTurn === Colors.WHITE && <div>White turn</div>}
    </div>)
}

export default MenuComponent;