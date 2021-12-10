import React from "react";
import { Value } from "../types";

interface Props {
    value: any;
    onclick: () => void;
}

const Square = ({value, onclick} : Props) => {
    return <button data-cy='square' className='square' onClick={onclick}>{value}</button>
}

export default Square