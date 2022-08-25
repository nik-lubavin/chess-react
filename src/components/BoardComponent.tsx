import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {

    const [selectedCell, setCelectedCell] = useState<Cell | null>(null);
    const [availableCells, setAvailableCells] = useState<Cell[]>([]);
    const [turn, SetTurn] = useState<Colors>(Colors.WHITE);

    // calculating available cells
    useEffect(() => {
        if (!selectedCell) {
            setAvailableCells([]);
            return;
        }

        const cells = board.calculateAvailableCells(selectedCell);
        setAvailableCells(cells);
    }, [selectedCell, board])

    return (
        <div>
            {turn === Colors.BLACK && <div>Black turn</div>}
            <div className='board'>
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                cell={cell}
                                key={cell.id}
                                isSelected={(cell === selectedCell)}
                                setSelectedCell={setCelectedCell}
                                isAvailable={availableCells.includes(cell)}
                            />)}
                    </React.Fragment >)}

            </div>
            {turn === Colors.WHITE && <div>White turn</div>}
        </div>

    )
}

export default BoardComponent;