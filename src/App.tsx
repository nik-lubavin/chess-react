import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import MenuComponent from './components/MenuComponent';
import { deleteGameState, loadGameState } from './helpers/localStorage';
import { Board } from './models/Board';
import { Colors } from './models/Colors';

const App = () => {
  const [currentTurn, setCurrentTurn] = useState<Colors>(Colors.WHITE);

  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    const gameState = loadGameState();

    if (gameState?.turn === Colors.BLACK) {
      setCurrentTurn(gameState?.turn);
    }

    const board = new Board();
    board.initCells(gameState);
    setBoard(board);
  }, [])

  const restartBoard = () => {
    deleteGameState();

    const board = new Board();
    board.initCells(null);
    setBoard(board);

    setCurrentTurn(Colors.WHITE);
  }

  return (
    <div className='app'>
      <MenuComponent
        currentTurn={currentTurn}
        restartBoard={restartBoard}
      />
      <BoardComponent
        board={board}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
      />
    </div>
  );
};

export default App;
