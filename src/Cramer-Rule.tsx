import React, { useState } from 'react'
import { Button } from '@mui/material';

const CramerRule = () => {
    const [numInputs, setNumInputs] = useState(0);

    const inputElements: JSX.Element[] = [];
    const inputElements2: JSX.Element[] = [];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCount = parseInt(event.target.value);
        setNumInputs(inputCount);
    }

    for (let i = 1; i <= numInputs * numInputs; i++) {
        inputElements.push(<input key={i} />);
        if (i % numInputs == 0) {
            inputElements.push(<br />)
        }
    }
    for (let i = 1; i <= numInputs; i++) {
        inputElements2.push(<input key={i} />);
        inputElements2.push(<br />);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Cramer's Rule</h1>
            N = <input type="number" onChange={handleInputChange} />
            <br />
            <div style={{ display: "inline-block" }}>{inputElements}</div>&emsp;&emsp;
            <div style={{ display: "inline-block" }}>{inputElements2}</div>
            <br />
            <Button variant="contained" sx={{ m: 2 }}>
                Calculate
            </Button>
        </div>
    )
}

export default CramerRule