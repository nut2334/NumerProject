import React, { useState } from 'react'

const CramerRule = () => {
    const [numInputs, setNumInputs] = useState(0);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCount = parseInt(event.target.value);
        setNumInputs(inputCount);
    }
    const inputElements = [];
    for (let i = 1; i <= numInputs * numInputs; i++) {
        inputElements.push(<input key={i} />);
        if (i % numInputs == 0) {
            inputElements.push(<br />)
        }
    }
    for (let k = 1; k <= numInputs; k++) {
        inputElements.push(<input key={k} />);
        inputElements.push(<br />)

    }


    return (
        <div style={{ textAlign: "center" }}>
            <h1>Cramer's Rule</h1>
            N = <input type="number" onChange={handleInputChange} />
            <br />
            {inputElements}
        </div>
    )
}

export default CramerRule