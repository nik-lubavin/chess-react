import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { saveGameState } from '../helpers/localStorage';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import CellComponent from './CellComponent';

interface BoardProps {
    board: Board;
    currentTurn: Colors;
    setCurrentTurn: (turn: Colors) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, currentTurn, setCurrentTurn }) => {

    const [selectedCellWithFigure, setSelectedCellWithFigure] = useState<Cell | null>(null);
    const [availableToMoveCells, setAvailableToMoveCells] = useState<Cell[]>([]);
    const [availableToAttackCells, setAvailableToAttackCells] = useState<Cell[]>([]);

    function swapTurn(): Colors {
        const newTurn = currentTurn === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
        setCurrentTurn(newTurn);
        return newTurn;
    }

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
        if (cell.figure && cell.figure.color === currentTurn) {
            // selecting
            setSelectedCellWithFigure(cell);
        } else if (availableToMoveCells.includes(cell) && selectedCellWithFigure) {
            // movement
            board.moveFigure(selectedCellWithFigure, cell);
            // deselect
            setSelectedCellWithFigure(null);

            // changing App state
            const newTurn = swapTurn();

            // saving game state
            saveGameState(board.cells, newTurn);

        } else if (availableToAttackCells.includes(cell) && selectedCellWithFigure) {
            // attack figure
            board.attackFigure(selectedCellWithFigure, cell);

            // deselecting
            setSelectedCellWithFigure(null);

            // changing App state
            const newTurn = swapTurn();

            // saving game state
            saveGameState(board.cells, newTurn);

        } else if (!cell.figure) {
            //deselecting
            setSelectedCellWithFigure(null);
        }
    }

    return (
        <div className='main-column'>
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
        </div>

    )
}

export default BoardComponent;