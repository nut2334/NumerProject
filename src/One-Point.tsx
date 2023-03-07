import React, { useState } from 'react';
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Chart2 from './Chart2';

interface Type {
  iteration: number;
  X0: number;
  Error: number;
}

const OnePoint = () => {
  const [Equation, setEquation] = useState("(x^4)-13")
  const inputEquation = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setEquation(event.target.value)
  }
  const [X0, setX0] = useState<string>('0')
  const inputX0 = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setX0(event.target.value)
  }
  const [html, setHtml] = useState<JSX.Element | null>(null);
  const [valueIter, setValueIter] = useState<number[]>([]);
  const [valueX0, setValueX0] = useState<number[]>([]);
  const [ea, setEa] = useState<number[]>([]);

  const calculateRoot = () => {
    const x0num = parseFloat(X0)
    const show = CalOnePoint(x0num);

    setHtml(print(show));

    console.log(valueIter)
    console.log(valueX0)
  }

  const error = (xnew: number, xold: number) => {
    console.log(xold, xnew);
    return Math.abs((xnew - xold) / xnew) * 100
  };
  const [X, setX] = useState(0);
  var fX0, xold = 0;
  const CalOnePoint = (x0: number) => {
    fX0 = evaluate(Equation, { x: x0 });
    var temp: Type[] = [];
    var iter = 0, ea = 100;
    for (var i = 0; i < 1000; i++) {
      iter++;
      x0 = evaluate(Equation, { x: x0 });
      if (ea < 0.0001) {
        break;
      }
      else {
        ea = error(x0, xold);
        console.log(x0, xold);
        const obj: Type = {
          iteration: iter,
          X0: x0,
          Error: ea
        }
        temp.push(obj);
        xold = x0;
      }
    }
    setX(x0);
    return temp;
  }

  const print = (data: Type[]) => {
    console.log(data)
    setValueIter(data.map((x) => x.iteration));
    setValueX0(data.map((x) => x.X0));
    setEa(data.map((x) => x.Error));
    return (
      <Container>
        <Table striped bordered hover variant="dark">
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
                  <td>{element.X0}</td>
                  <td>{element.Error}</td>
                </tr>)
            })}
          </tbody>
        </Table>
      </Container>

    );
  }

  return (
    <Container>
      <Form >
        <Form.Group className="mb-3">
          <Form.Label>Input G(x) =</Form.Label>
          <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
          = x <br></br>
          <Form.Label>Input x0 =</Form.Label>
          <input type="number" id="X0" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
        </Form.Group>
        <Button variant="dark" onClick={calculateRoot}>
          Calculate
        </Button>
      </Form>
      <br></br>
      <h5>Answer = {X.toPrecision(7)}</h5>
      {valueIter.length > 0 && <Chart2 iteration={valueIter} X0={valueX0} Error={ea} />}
      <Container>
        {html}
      </Container>

    </Container>
  )
}

export default OnePoint
