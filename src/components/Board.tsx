import React from "react";
import { SquareValues } from "../types";
import Square from './Square'

interface Props {
    squares: SquareValues;
    onclick: (i: number) => void;
}

const Board = ({ squares, onclick}: Props) => {
    return <div data-cy="board" className='board'>
        {squares.map((sqr, idx) => <Square key={idx} value={sqr} onclick={() => onclick(idx)} />)}
    </div>
}

export default Board