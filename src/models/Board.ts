import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { FiguresEnum } from "./figures/Figure";

export interface ICoords {
    x: number, y: number
}

export class Board {
    // rendering
    public cells: Cell[][] = [];

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];
            for (let x = 0; x < 8; x++) {
                row.push(new Cell(this, x, y));
            }
            this.cells.push(row)
        }
    }

    public moveFigure(cellFrom: Cell, cellTo: Cell): void {
        const figure = cellFrom.figure;
        cellFrom.figure = null;
        cellTo.figure = figure;
    }

    public attackFigure(cellFrom: Cell, cellTo: Cell): void {
        const figure = cellFrom.figure;
        // const killedFigure = cellTo.figure;
        cellFrom.figure = null;
        cellTo.figure = figure;

        // TODO add to graveyard
    }

    private getCell({ x, y }: ICoords): Cell | undefined {
        if (x < 0 || y < 0 || x > 7 || y > 7) return;

        const row = this.cells.find((row, idx) => idx === y);
        if (row) {
            return row.find(cell => cell.x === x);
        }
    }

    private getManyCells(coords: ICoords[]): Cell[] {
        return coords.map(coord => this.getCell(coord)).filter(cell => !!cell) as Cell[];// doesnt understand that values are not undefined
    }

    // TODO Move away
    public calculateAvailableToMoveCells(selectedCell: Cell): Cell[] {
        const figure = selectedCell.figure;
        if (!figure) return [];

        const { x: currentX, y: currentY } = selectedCell;

        let movingCoords: ICoords[] = [];

        if (figure.figureType === FiguresEnum.PAWN) {
            if (figure.color === Colors.WHITE) {
                movingCoords.push({ x: currentX, y: currentY - 1 });
                if (currentY === 6) {
                    movingCoords.push({ x: currentX, y: currentY - 2 });
                }
            } else {
                // Black
                movingCoords.push({ x: currentX, y: currentY + 1 });
                if (currentY === 1) {
                    movingCoords.push({ x: currentX, y: currentY + 2 });
                }
            }
        }

        if (movingCoords.length) {
            const movingCells = this.getManyCells(movingCoords);
            return movingCells.filter(cell => !cell.figure);
        }

        return [];
    }

    // TODO Move away
    public calculateAvailableToAttackCells(selectedCell: Cell): Cell[] {
        const figure = selectedCell.figure;
        if (!figure) return [];

        const { x: currentX, y: currentY } = selectedCell;

        let attackingCoords: ICoords[] = [];

        if (figure.figureType === FiguresEnum.PAWN) {
            if (figure.color === Colors.WHITE) {
                attackingCoords.push({ x: currentX - 1, y: currentY - 1 });
                attackingCoords.push({ x: currentX + 1, y: currentY - 1 });

            } else {
                // Black
                attackingCoords.push({ x: currentX - 1, y: currentY + 1 });
                attackingCoords.push({ x: currentX + 1, y: currentY + 1 });
            }
        }

        if (attackingCoords.length) {
            const attackCells = this.getManyCells(attackingCoords);
            const filtered = attackCells.filter(atCell => atCell.figure && atCell.figure?.color !== selectedCell.figure?.color);
            return filtered;
        }

        return [];
    }
}