import React, { useState } from 'react';
import { evaluate, derivative } from 'mathjs'
import Chart2 from './Chart2';
import { Container, Form, Table } from "react-bootstrap";
import Button from '@mui/material/Button';
import { text } from 'stream/consumers';

interface Type {
  iteration: number;
  X0: number;
  Error: number;
}

const NewtonRaphson = () => {
  const [Equation, setEquation] = useState("x^2-7");
  const [X0, setX0] = useState<string>('0')
  const inputX0 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setX0(event.target.value)
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
    const show = CalNewtonRaphson(x0num);

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

  const CalNewtonRaphson = (x0: number) => {
    let xn = x0;
    let i = 0;
    let iter = 0;
    let temp = [];
    let xold = 0;
    let ea = 100;

    while (i < maxIters) {
      iter++;
      if (ea < 0.0001) {
        break;
      }
      try {
        xn = xn - evaluate(Equation, { x: xn }) / df.evaluate({ x: xn });
        if (xn == Infinity) {
          throw new Error("Infinity");
        }
      } catch (error) {
        alert("Infinity")
        break;
      }
      x0 = evaluate(Equation, { x: xn });
      ea = error(xn, xold);

      const obj: Type = {
        iteration: iter,
        X0: xn,
        Error: ea
      }
      temp.push(obj);
      xold = xn;

      i++;
    }
    setX(xn);
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
      <h1>Newton-Raphson</h1>
      <Form >
        <Form.Group className="mb-3">
          <Form.Label>Input f(x) = </Form.Label>
          <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
          = 0 <br></br>
          <Form.Label> Input x0 = </Form.Label>
          <input type="number" id="X0" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
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

export default NewtonRaphson
