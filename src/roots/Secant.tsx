import React, { useState } from 'react';
import { evaluate, derivative } from 'mathjs'
import Chart2 from '../Chart2';
import { Container, Form, Table } from "react-bootstrap";
import Button from '@mui/material/Button';
import { text } from 'stream/consumers';

interface Type {
    iteration: number;
    X0: number;
    X1: number;
    Error: number;
}

const Secant = () => {
    const [Equation, setEquation] = useState("x^2-7");
    const [X0, setX0] = useState<string>('0')
    const [X1, setX1] = useState<string>('0')
    const inputX0 = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setX0(event.target.value)
    }
    const inputX1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setX1(event.target.value)
    }
    const inputEquation = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueX0, setValueX0] = useState<number[]>([]);
    const [ea, setEa] = useState<number[]>([]);

    const calculateRoot = () => {
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        const show = CalSecant(x0num, x1num);

        setHtml(print(show));

        console.log(valueIter)
        console.log(valueX0)
    }

    const error = (xnew: number, xold: number) => {
        console.log(xold, xnew);
        return Math.abs((xnew - xold) / xnew) * 100
    };
    const [X, setX] = useState(0);
    const maxIters = 1000;
    let df: math.MathNode;
    try {
        df = derivative(Equation, 'x');
    }
    catch (e) {
        console.log(e);
    }
    var iter = 0;
    const CalSecant = (x0: number, x1: number) => {
        let i = 0;
        let x2 = 0;
        let fx0 = (x0: number): number => { return evaluate(Equation, { x: x0 }) };
        let fx1 = (x1: number): number => { return evaluate(Equation, { x: x1 }) };
        let temp = [];
        iter++;
        while (i < maxIters) {
            x2 = x1 - ((fx1(x1) * (x1 - x0)) / (fx1(x1) - fx0(x0)));

            if (Math.abs(x2 - x1) < 0.0001) {
                break;
            }
            const obj = {
                iteration: i,
                X0: x1,
                X1: x2,
                Error: error(x2, x1)
            }
            temp.push(obj);
            x0 = x1;
            x1 = x2;
            i++;
        }
        setX(x2);
        return temp;
    }

    const print = (data: Type[]) => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueX0(data.map((x) => x.X0));
        setEa(data.map((x) => x.Error));
        return (
            <div style={{ textAlign: "center", justifyContent: "center", display: 'flex', width: '100vw' }}>
                {data.length > 0 && <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>X0</th>
                            <th>ERROR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.X0.toFixed(2)}</td>
                                    <td>{element.Error.toFixed(2)}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>}
            </div>

        );
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Secant</h1>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x) = </Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    = 0 <br></br>
                    <Form.Label> Input x0 = </Form.Label>
                    <input type="number" id="X0" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label> Input x1 = </Form.Label>
                    <input type="number" id="X1" onChange={inputX1} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button onClick={calculateRoot} variant="contained" sx={{ m: 2 }}>
                    Calculate
                </Button>
            </Form>
            <br></br>
            <h5>Answer = {X.toPrecision(7)}</h5>
            {valueIter.length > 0 && <Chart2 iteration={valueIter} X0={valueX0} Error={ea} />}
            <Container>
                {html}
            </Container>
        </div>
    )
}

export default Secant
