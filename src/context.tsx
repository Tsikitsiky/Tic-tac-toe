import React, { createContext, useReducer } from "react";

import {SquareValues, State} from './types';

type Action =
    | {type: "UPDATE_HISTORY", payload: SquareValues[]} 
    | {type: "UPDATE_STEP", payload: number} 
    | {type: "SET_FIRST_PLAYER", payload: string}
    | {type: "SET_NEXT_PLAYER"}
    | {type: "PLAY_AGAIN"}

const initialSquareValues: SquareValues = Array(9).fill(null);

interface  InitialStateType {
    history: SquareValues[],
    step: number,
    firstPlayer: string | null,
    XisNext: boolean,
    updateHistory: (squares: SquareValues) => void,
    updateStep: (step: number) => void,
    setFirstPlayer: (firstPlayer: string) => void,
    setNextPlayer: () => void,
    handlePlayAgain: () => void
}

const initialStates: InitialStateType = {
    history: [initialSquareValues],
    step: 0,
    firstPlayer: null,
    XisNext: true,
    updateHistory: () => {},
    updateStep: () => {},
    setFirstPlayer: () => {},
    setNextPlayer: () => {},
    handlePlayAgain: () => {}
}

const Context = createContext<InitialStateType>(initialStates);

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'UPDATE_HISTORY':
            return {
                ...state,
                history: action.payload
            }
        case 'UPDATE_STEP':
            return {
                ...state,
                step: action.payload
            }
        case 'SET_FIRST_PLAYER':
            return {
                ...state,
                firstPlayer: action.payload,
                XisNext: action.payload === 'X'
            }
        case 'SET_NEXT_PLAYER':
            return {
                ...state,
                XisNext: !state.XisNext
            }
            case 'PLAY_AGAIN':
                return {
                    ...state,
                    history: [initialSquareValues],
                    step: 0
                }
        default:
            return state
    }
}


const ContextProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialStates);

    function updateHistory(newSquares: SquareValues) {
        dispatch({type: "UPDATE_HISTORY", payload: [...state.history, newSquares]})
    }

    function updateStep(newStep: number) {
        dispatch({type: "UPDATE_STEP", payload: newStep})
    }

    function setFirstPlayer(firstPlayer: string) {
        dispatch({type: "SET_FIRST_PLAYER", payload: firstPlayer});       
    }

    function setNextPlayer() {
        dispatch({type: "SET_NEXT_PLAYER"});        
    }

    function handlePlayAgain() {
        dispatch({type: "PLAY_AGAIN"});        
    }

    return (
        <Context.Provider value={{
            history: state.history, 
            step: state.step, 
            firstPlayer: state.firstPlayer, 
            XisNext: state.XisNext,
            updateHistory,
            updateStep,
            setFirstPlayer,
            setNextPlayer,
            handlePlayAgain
            }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}