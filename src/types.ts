import { type } from "os";

export type Value = string | null;

export type SquareValues = Value[];

export interface State {
    history: SquareValues[];
    step: number;
    firstPlayer: string | null,
    XisNext: boolean,
}

