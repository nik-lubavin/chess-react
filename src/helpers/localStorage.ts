import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import { Figure, FiguresEnum } from "../models/figures/Figure";

const GAMESTATE_KEY = 'chess_state';

export interface IFigureLocation {
    x: number, y: number, figure: FiguresEnum, color: Colors
}

export interface GameState {
    figuresLocation: IFigureLocation[],
    turn: Colors
}

export function loadGameState(): GameState | null {
    const gameStateStr = localStorage.getItem(GAMESTATE_KEY);
    if (gameStateStr) {
        const gameState = JSON.parse(gameStateStr) as GameState;
        return gameState;
    } else {
        return null;
    }
}

export function saveGameState(cells: Cell[][], turn: Colors): void {
    const gameState: GameState = {
        figuresLocation: cells.flat()
            .filter(cell => !!cell.figure)
            .map((cell) => ({
                x: cell.x,
                y: cell.y,
                figure: (cell.figure as Figure).figureType,
                color: (cell.figure as Figure).color
            })),
        turn,
    };

    localStorage.setItem(GAMESTATE_KEY, JSON.stringify(gameState));
}

export function deleteGameState() {

}