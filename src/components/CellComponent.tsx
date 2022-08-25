import { useState } from 'react';
import { FC, MouseEvent } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
    cell: Cell;
    isSelected: boolean;
    setSelectedCell: (cell: Cell) => void;
    isAvailable: boolean
}

const CellComponent: FC<CellProps> = ({ cell, isSelected, setSelectedCell, isAvailable }) => {
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
                isAvailable ? 'cell-available' : ''
            ].join(' ')}
            onMouseEnter={onMouseEnterCell}
            onMouseLeave={onMouseLeaveCell}
            onClick={() => setSelectedCell(cell)}
        >
            {cell.figure?.logo && <img className='img' src={cell.figure.logo} alt='' />}
        </div>
    )
}

export default CellComponent;