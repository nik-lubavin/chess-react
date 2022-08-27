import { useState } from 'react';
import { FC, MouseEvent } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
    cell: Cell;
    isSelected: boolean;
    isAvailableToMove: boolean;
    isAvailableToAttack: boolean;
    onCellClick: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({
    cell,
    isSelected,
    onCellClick,
    isAvailableToMove,
    isAvailableToAttack
}) => {
    const [isFocused, setIsFocused] = useState(false);

    function onMouseEnterCell(event: MouseEvent<HTMLDivElement>) {
        setIsFocused(true);
    }

    function onMouseLeaveCell(event: MouseEvent<HTMLDivElement>) {
        setIsFocused(false);
    }

    return (
        <div
            className={[
                'cell',
                cell.color,
                isFocused ? 'cell-focused' : '',
                isSelected ? 'cell-selected' : '',
                isAvailableToMove ? 'cell-available' : '',
                isAvailableToAttack ? 'cell-attackable' : '',
            ].join(' ')}
            onMouseEnter={onMouseEnterCell}
            onMouseLeave={onMouseLeaveCell}
            onClick={() => onCellClick(cell)}
        >
            {cell.figure?.logo && <img className='img' src={cell.figure.logo} alt='' />}
        </div>
    )
}

export default CellComponent;