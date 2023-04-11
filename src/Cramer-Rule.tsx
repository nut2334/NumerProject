import React, { useState } from 'react'
import { Button } from '@mui/material';
import {det} from 'mathjs';

const CramerRule = () => {
    const [numInputs, setNumInputs] = useState(0);

    const inputElements: JSX.Element[] = [];
    const inputElements2: JSX.Element[] = [];
    const A: number[][] = [];
    const B: number[] = [];
    const C: number[] = [];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCount = parseInt(event.target.value);
        setNumInputs(inputCount);
    }

    const inputA = (event: React.ChangeEvent<HTMLInputElement>, i: number ,j: number) => {
        const value = Number(event.target.value);
        A[i-1][j-1]=value;
        console.log(A);
    }
    const inputB = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
        B[i-1]=Number(event.target.value);
        console.log(B);
    }

    for (let i = 1; i <= numInputs; i++) {
        for(let j = 1; j <= numInputs; j++){
            inputElements.push(<input onChange={event=> inputA(event, i,j)}/>);
            if (j % numInputs == 0) {
                A[i-1]=[];
                inputElements.push(<br />);
            }
        }
    }   
    for (let i = 1; i <= numInputs; i++) {
        inputElements2.push(<input onChange={event=> inputB(event, i)} />);
        inputElements2.push(<br />);
    }
    const Calculate = () => {
        const determinant = det(A);
        console.log('Determinant:', determinant);
    }
    

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Cramer's Rule</h1>
            N = <input type="number" onChange={handleInputChange} />
            <br />
            <div style={{ display: "inline-block" }}>{inputElements}</div>&emsp;&emsp;
            <div style={{ display: "inline-block" }}>{inputElements2}</div>
            <br />
            <Button variant="contained" sx={{ m: 2 }} onClick={Calculate} >Calculate</Button>
        </div>
    )
}

export default CramerRule