import { GameState } from "../helpers/localStorage";
import { Cell, IFigure } from "./Cell";
import { Colors } from "./Colors";
import { Figure, FiguresEnum, IAvailableCells } from "./figures/Figure";

export interface ICoords {
    x: number, y: number
}

interface IFigureLocation {
    x: number, y: number, figure: FiguresEnum, color: Colors
}

export class Board {
    // rendering
    public cells: Cell[][] = [];

    public initCells(gameState: GameState | null): void {
        const figuresLocation = gameState ? gameState.figuresLocation : null;
        this.cells = [];
        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];
            for (let x = 0; x < 8; x++) {
                let figure: IFigure | undefined;
                // const isCached = Boolean(figuresLocations);
                let cell: Cell;
                if (figuresLocation) {
                    figure = this.getFigure(x, y, figuresLocation);
                    cell = Cell.WithCachedFigure(this, x, y, figure);
                } else {
                    cell = Cell.WithDefaultFigure(this, x, y);
                }
                row.push(cell);
            }
            this.cells.push(row)
        }
    }

    // helper function for parsing figuresLocation
    private getFigure(x: number, y: number, figuresLocations: IFigureLocation[]): IFigure | undefined {
        const search = figuresLocations.find(item => item.x === x && item.y === y)
        if (search) {
            return { figureType: search.figure, color: search.color };
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
        return coords.map(coord => this.getCell(coord))
            .filter(cell => !!cell) as Cell[]; // have to define type explicitly
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