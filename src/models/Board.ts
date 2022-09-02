import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Figure, FiguresEnum, IAvailableCells } from "./figures/Figure";

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
        const figure = cellFrom.figure as Figure;
        cellFrom.figure = null;
        cellTo.figure = figure;
        cellTo.figure.cell = cellTo;
    }

    public attackFigure(cellFrom: Cell, cellTo: Cell): void {
        const figure = cellFrom.figure as Figure;
        cellFrom.figure = null;
        cellTo.figure = figure;
        cellTo.figure.cell = cellTo;

        // TODO add to graveyard
    }

    public getCell({ x, y }: ICoords): Cell | undefined {
        if (x < 0 || y < 0 || x > 7 || y > 7) return;

        const row = this.cells.find((row, idx) => idx === y);
        if (row) {
            return row.find(cell => cell.x === x);
        }
    }

    public getManyCells(coords: ICoords[]): Cell[] {
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

    public verticalsHorizontals(x: number, y: number, color: Colors): IAvailableCells {
        let result: IAvailableCells = { move: [], attack: [] };
        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x: x - i, y: y };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x: x + i, y };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                // found a figure - no further move
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x, y: y - i };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                // found a figure - no further move
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x, y: y + i };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                // found a figure - no further move
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        return result;
    }

    public diagonals(x: number, y: number, color: Colors): IAvailableCells {
        let result: IAvailableCells = { move: [], attack: [] };
        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x: x - i, y: y - i };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x: x - i, y: y + i };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                // found a figure - no further move
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x: x + i, y: y - i };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                // found a figure - no further move
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        for (let i = 1; i <= 7; i++) {
            const coord: ICoords = { x: x + i, y: y + i };
            const cell = this.getCell(coord);
            if (cell && cell.figure) {
                if (cell.figure.color !== color) {
                    result.attack.push(cell);
                }
                // found a figure - no further move
                break;

            } else if (cell) {
                result.move.push(cell);
            } else {
                // cell doesnt exist - out of board
                break;
            }
        }

        return result;
    }
}