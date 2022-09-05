import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';

const App = () => {
  const [board, setBoard] = useState(new Board());

  useEffect(() => {
    restartBoard();
  }, [])

  const restartBoard = () => {
    const board = new Board();
    board.firstStart();
    setBoard(board);
  }


  return (
    <div className='app'>
      <button onClick={() => restartBoard()}>restart</button>
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
};

export default App;
