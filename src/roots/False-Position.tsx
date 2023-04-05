import React, { useState } from 'react';
import { Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Chart from '../Chart';
import Button from '@mui/material/Button';

interface Type {
  iteration: number;
  Xl: number;
  Xm: number;
  Xr: number;
  Error: number;
}

const FalsePosition = () => {
  const [Equation, setEquation] = useState("(x^4)-13")
  const inputEquation = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setEquation(event.target.value)
  }
  const [XL, setXL] = useState<string>('0')
  const inputXL = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setXL(event.target.value)
  }
  const [XR, setXR] = useState<string>('0')
  const inputXR = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setXR(event.target.value)
  }
  const [html, setHtml] = useState<JSX.Element | null>(null);
  const [valueIter, setValueIter] = useState<number[]>([]);
  const [valueXl, setValueXl] = useState<number[]>([]);
  const [valueXm, setValueXm] = useState<number[]>([]);
  const [valueXr, setValueXr] = useState<number[]>([]);
  const [ea, setEa] = useState<number[]>([]);

  const calculateRoot = () => {
    const xlnum = parseFloat(XL)
    const xrnum = parseFloat(XR)
    const show = CalFalsePosition(xlnum, xrnum);

    setHtml(print(show));

    console.log(valueIter)
    console.log(valueXl)
  }

  const error = (xnew: number, xold: number) => {
    console.log(xold, xnew);
    return Math.abs((xnew - xold) / xnew) * 100
  };
  const [X, setX] = useState(0);
  var fXl, fXr, fXm, xold = 0;
  const CalFalsePosition = (xl: number, xr: number) => {
    var iter = 0, ea = 100;
    fXl = evaluate(Equation, { x: xl })
    fXr = evaluate(Equation, { x: xr })
    let xm = (xl * fXr - xr * fXl) / (fXr - fXl)
    fXm = evaluate(Equation, { x: xm })
    var temp: Type[] = [];

    for (var i = 0; i < 1000; i++) {
      xm = (xl * fXr - xr * fXl) / (fXr - fXl)
      if (ea < 0.0001) {
        break;
      }
      else if (fXm * fXr > 0) {
        ea = error(xm, xold);
        const obj: Type = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          Error: ea
        }
        temp.push(obj);
        iter++;
        xr = xm
      }
      else {
        ea = error(xm, xold);
        const obj: Type = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          Error: ea
        }
        temp.push(obj);
        iter++;
        xl = xm
      }
      xold = xm;
      fXl = evaluate(Equation, { x: xl })
      fXr = evaluate(Equation, { x: xr })
      fXm = evaluate(Equation, { x: xm })
    }
    setX(xm);
    return temp;
  }

  const print = (data: Type[]) => {
    console.log(data)
    setValueIter(data.map((x) => x.iteration));
    setValueXl(data.map((x) => x.Xl));
    setValueXm(data.map((x) => x.Xm));
    setValueXr(data.map((x) => x.Xr));
    setEa(data.map((x) => x.Error));
    return (
      <div style={{ textAlign: "center", justifyContent: "center", display: 'flex', width: '100vw' }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Iteration</th>
              <th>XL</th>
              <th>XM</th>
              <th>XR</th>
              <th>ERROR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.Xl.toFixed(2)}</td>
                  <td>{element.Xm.toFixed(2)}</td>
                  <td>{element.Xr.toFixed(2)}</td>
                  <td>{element.Error.toFixed(2)}</td>
                </tr>)
            })}
          </tbody>
        </Table>
      </div>

    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>False-Position</h1>
      <Form >
        <Form.Group className="mb-3">
          <Form.Label>Input f(x)</Form.Label>
          <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
          <Form.Label> Input XL </Form.Label>
          <input type="number" id="XL" onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
          <Form.Label> Input XR </Form.Label>
          <input type="number" id="XR" onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
        </Form.Group>
        <Button onClick={calculateRoot} variant="contained" sx={{ m: 2 }}>
          Calculate
        </Button>
      </Form>
      <br></br>
      <h5>Answer = {X.toPrecision(7)}</h5>
      {valueIter.length > 0 && <Chart iteration={valueIter} Xl={valueXl} Xm={valueXm} Xr={valueXr} Error={ea} />}
      <Container>
        {html}
      </Container>

    </div>
  )
}

export default FalsePosition
