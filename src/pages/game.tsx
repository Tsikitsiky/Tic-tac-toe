import React, { useContext } from "react";
import Board from '../components/Board'
import { Context } from "../context";

import {SquareValues, Value} from '../types';

// Set the winner if there is.
const setIsWinner = (squares: SquareValues) => {
    const winIndexesCombinations: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < winIndexesCombinations.length; i++) {
        const [a, b, c] = winIndexesCombinations[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
}

const GamePage = () => {
    const {history, step, XisNext, updateHistory, updateStep, setNextPlayer, handlePlayAgain} = useContext(Context);

    const current: SquareValues = history[step];
    const player: string = XisNext ? 'X' : "O";
    const isWinner: Value = setIsWinner(history[step]);


    const handleSquareClick = (index: number): void => {
        const newSquares = [...current]
        if(!isWinner || !newSquares[index]) {
            newSquares[index] = player;
            updateHistory(newSquares);
            updateStep(history.length);
            setNextPlayer()
        }
    }

    return <>
        {step === 9 && !isWinner ? 
        <h3>It's a tie!</h3> : 
        <h3 data-cy='game-status'>{isWinner ? `${isWinner} won` : `${player}'s turn` }</h3> }
        <Board squares={history[step]} onclick={handleSquareClick} />
        <h4>
            {(isWinner || step === 9) 
            && 
            <button 
                data-cy='playAgainBtn' 
                className='playAgainBtn' 
                onClick={handlePlayAgain}>
                Play again
            </button>}
        </h4>
    </>
}

export default GamePage