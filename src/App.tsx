import React, { useContext } from 'react';
import Game from './pages/game';
import './styles.css';
import StartPage from './pages/start';
import {Context} from './context'

function App() {
  const {firstPlayer} = useContext(Context)
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {firstPlayer ? <Game /> : <StartPage />}
    </div>
  );
}

export default App;
