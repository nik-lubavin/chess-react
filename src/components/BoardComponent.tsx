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

    const [selectedCellWithFigure, setSelectedCellWithFigure] = useState<Cell | null>(null);
    const [availableToMoveCells, setAvailableToMoveCells] = useState<Cell[]>([]);
    const [availableToAttackCells, setAvailableToAttackCells] = useState<Cell[]>([]);
    const [turn, setTurn] = useState<Colors>(Colors.WHITE);

    function switchTurn() {
        const newTurn = turn === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
        setTurn(newTurn);
    }

    // calculating available cells
    useEffect(() => {
        if (!selectedCellWithFigure) {
            // resetting
            setAvailableToMoveCells([]);
            setAvailableToAttackCells([]);
            return;
        }

        if (selectedCellWithFigure.figure) {
            const { move, attack } = selectedCellWithFigure.figure.calculateAvailableCoords();
            setAvailableToMoveCells(move);
            setAvailableToAttackCells(attack);
        }

    }, [selectedCellWithFigure, board])

    function onCellClick(cell: Cell): void {
        if (cell.figure && cell.figure.color === turn) {
            // selecting
            setSelectedCellWithFigure(cell);
        } else if (availableToMoveCells.includes(cell) && selectedCellWithFigure) {
            // movement
            board.moveFigure(selectedCellWithFigure, cell);
            // deselect
            setSelectedCellWithFigure(null);

            // turn
            switchTurn();
        } else if (availableToAttackCells.includes(cell) && selectedCellWithFigure) {
            // attack figure
            board.attackFigure(selectedCellWithFigure, cell);

            // deselecting
            setSelectedCellWithFigure(null);

            // turn
            switchTurn();
        } else if (!cell.figure) {
            //deselecting
            setSelectedCellWithFigure(null);
        }
    }

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
                                isSelected={(cell === selectedCellWithFigure)}
                                isAvailableToMove={availableToMoveCells.includes(cell)}
                                isAvailableToAttack={availableToAttackCells.includes(cell)}
                                onCellClick={onCellClick}
                            />)}
                    </React.Fragment >)}

            </div>
            {turn === Colors.WHITE && <div>White turn</div>}
        </div>

    )
}

export default BoardComponent;