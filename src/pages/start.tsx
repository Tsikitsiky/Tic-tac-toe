import React, { useContext } from "react";
import {Context} from '../context'

const StartPage = () => {
const {setFirstPlayer} = useContext(Context)

    return <>
    <h3 data-cy='player-choice'>Choose the first player</h3>
    <div data-cy="button-wrapper">
        <button data-cy='player-1' className='playerBtn' onClick={() => setFirstPlayer('X')}>X</button>
        <button data-cy='player-2' className='playerBtn' onClick={() => setFirstPlayer('O')}>O</button>
    </div>
    </>
}

export default StartPage