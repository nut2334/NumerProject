import React, { useState, useEffect } from 'react';
import { Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Chart from '../Chart';
import Button from '@mui/material/Button';
import axios from 'axios';

const Bisection = () => {
    const [Equation, setEquation] = useState("x^4-13")
    const isDisabled = !Equation;
    const inputEquation = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    
    const [XL, setXL] = useState<string>('0')
    const inputXL = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setXL(event.target.value)
    }
    const [XR, setXR] = useState<string>('10')
    const inputXR = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setXR(event.target.value)
    }
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueXl, setValueXl] = useState<number[]>([]);
    const [valueXm, setValueXm] = useState<number[]>([]);
    const [valueXr, setValueXr] = useState<number[]>([]);
    const [ea, setEa] = useState<number[]>([]);

    const calculateRoot = () => {
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        const show = Calbisection(xlnum, xrnum);

        setData2(show);

        setValueIter(show.map((x) => x.iteration));
        setValueXl(show.map((x) => x.Xl));
        setValueXm(show.map((x) => x.Xm));
        setValueXr(show.map((x) => x.Xr));
        setEa(show.map((x) => x.Error));
        
        console.log(valueIter)
        console.log(valueXl)
    }
    interface Math {
        iteration: number;
        Xl: number;
        Xm: number;
        Xr: number;
        Error: number;
    }
    interface Item {
        id: number;
        math: string;
    }

    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;
    const [X, setX] = useState(0);
    var fXm, fXr, scope;

    const [data, setData] = useState<Item[]>([]);
    const [data2, setData2] = useState<Math[]>([]);
    
    useEffect(() => {
        axios.get<Item[]>('http://localhost:4000/bisection')
            .then(response => setData(response.data))
            .catch(error => console.log(error));
            console.log("data: ",data);
    }, []);

    

    const Calbisection = (xl: number, xr: number) => {
        var xm = (xl + xr) / 2.0;
        var ea = error(xr, xm);
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var temp:Math[] = [];
        do {
            xm = (xl + xr) / 2.0;
            scope = {
                x: xr,
            }
            fXr = evaluate(Equation, scope)
            scope = {
                x: xm,
            }
            fXm = evaluate(Equation, scope)


            if (fXm * fXr > 0) {
                ea = error(xr, xm);
                const obj: Math = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr,
                    Error: ea
                }
                temp.push(obj);
                iter++;
                xr = xm;
            }
            else if (fXm * fXr < 0) {
                ea = error(xl, xm);
                const obj: Math = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr,
                    Error: ea
                }
                temp.push(obj);
                iter++;
                console.log("this is obj" + obj);
                xl = xm;
            }
        } while (ea > e && iter < MAX)
        console.log("this is temp" + temp);
        
        setX(xm)
        return temp
    }
    

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Bisection</h1>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x) </Form.Label>
                    <input type="text" id="equation" placeholder={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <select onChange={(e)=>{
                        setEquation(e.target.value)
                    }}>
                        <option>Example</option>
                        {data.map(item => (
                            <option key={item.math} value={item.math} >{item.math}</option>
                        ))}
                    </select>
                    <Form.Label> Input XL </Form.Label>
                    <input type="number" id="XL" placeholder={XL} onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label> Input XR </Form.Label>
                    <input type="number" id="XR" placeholder={XR} onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button onClick={calculateRoot} variant="contained" sx={{ m: 2 }} disabled={isDisabled}>
                    Calculate
                </Button>
            </Form>
            <br></br>
            <h5>Answer = {X.toPrecision(7)}</h5>
            {valueIter.length > 0 && <Chart iteration={valueIter} Xl={valueXl} Xm={valueXm} Xr={valueXr} Error={ea} />}
            <Container>
            <div style={{ textAlign: "center", justifyContent: "center", display: 'flex', width: '100vw' }}>
                {data2.length > 0 && <Table striped bordered hover variant="dark">
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
                        {data2.map((element, index) => {
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
                </Table>}
            </div>
            </Container>
        </div>
    )
}

export default Bisection
