import React, { useState, useEffect } from "react"
import { count, evaluate, det } from 'mathjs'
import { Button } from '@mui/material';
import Chart from "./chartToday";
import sum from 'ml-array-sum';
import axios from 'axios';
import { set } from "mongoose";


const Box = () => {
    const [input, setInput] = useState(0);
    const [sai, setSai] = useState<number[]>([])
    //const [Equation, setEquation] = useState("");
    const [state, setState] = useState(0);
    const [final, setFinal] = useState<number[]>([])
    const [ansJing1, setAns1] = useState(0);
    const [ansJing2, setAns2] = useState(0);
    const [data, setData] = useState<nata>();

    const [exampleN, setExampleN] = useState<number>(0);
    const [fx, setFx] = useState<number[]>([]);

    interface nata {
        N: number;
        X: [];
        Y: [];
    }
    interface Math {
        x: number;
        y: number;
    }

    useEffect(() => {
        let temp = []
        let temp2 = []
        for (let i = 0; i < input; i++) {
            temp.push(0)
            temp2.push(0)
        }

        setFinal(temp)
        setSai(temp2)
    }
        , [input])

    useEffect(() => {
        axios.get('http://localhost:1150/linear')
            .then((response: any) => {

                setData(response.data.result as nata)
            })
            .catch((error: any) => console.log(error));

    }, []);
    const countBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        var count = Number(event.target.value);
        setInput(count);
    }

    const calLinear = () => {
        const squaredNumbers = sai.map(number => number ** 2);
        const squared = sum(squaredNumbers);
        const sumO = sum(sai);
        let a = [[input, sumO], [sumO, squared]];
        let y = sum(final);

        let kunY: number[] = [];
        var re
        for (let i = 0; i < sai.length; i++) {
            re = sai[i] * final[i];
            kunY.push(re);
        }
        let allxy = sum(kunY);
        let bon = [[y, a[0][1]],
        [allxy, a[1][1]]];
        let lank = [[a[0][0], y],
        [a[1][0], allxy]]
        console.log("bon:", bon)
        console.log("lank:", lank)
        console.log("A:", a, "final:", final, "y:", y, "kuny", kunY);
        let ansBon = det(bon);
        let ansLank = det(lank);

        let Jing1 = ansBon / det(a);
        let Jing2 = ansLank / det(a);



        setAns1(Jing1);
        setAns2(Jing2);
        setState(1);

    }
    const inputValue = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value = Number(event.target.value);
        let temp = JSON.parse(JSON.stringify(sai));
        temp[index] = value;
        setSai(temp);
    }
    const inputFx = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value = Number(event.target.value);
        let temp = JSON.parse(JSON.stringify(final));
        temp[index] = value;
        setFinal(temp);
    }

    const Gentable = () => {
        return sai.map((item, index) => {
            return <div><input key={index} onChange={(e) => inputValue(e, index)} placeholder={`${sai[index]}`} /></div>
        })
    }
    const GentableY = () => {
        return final.map((item, index) => {
            return <div><input onChange={(e) => inputFx(e, index)} placeholder={`${final[index]}`} /></div>
        })
    }
    const api = () => {
        console.log(data?.N)
        if (data) {

            let temp: number[] = []
            let temp2: number[] = []
            console.log(data.X);

            for (let i = 0; i < data.N; i++) {
                temp.push(data.X[i])
                temp2.push(data.Y[i])
            }
            console.log(temp, temp2);

            setSai(temp)
            setFinal(temp2)
            setExampleN(data.N);
            setInput(data.N)

        }

    }
    return (
        <div>
            <input onChange={countBox} placeholder={`${exampleN}`}></input>
            <br></br>
            <input value="X" style={{ textAlign: "center" }}></input><input value="f(x)" style={{ textAlign: "center" }} placeholder={`${exampleN}`}></input>
            <br />
            <div style={{ display: "inline-block" }}>{Gentable()}</div>
            <div style={{ display: "inline-block" }}>{GentableY()}</div><br></br>

            <Button onClick={calLinear} >Calculate</Button>
            <Button onClick={api}>Api</Button><br></br>
            a0={ansJing1} <br></br>
            a1={ansJing2}
            {state == 1 && <Chart x={sai} y={final} />}
        </div>
    )
}
export default Box