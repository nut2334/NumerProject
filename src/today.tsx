import React, { useState,useEffect } from "react"
import { count, evaluate } from 'mathjs'

const Box =()=>{
    const [input,setInput]=useState(0);
    const [Equation,setEquation]=useState("x^2+3");
    const [final,setFinal]=useState<number[]>([])
    const [sai,setSai]=useState<number[]>([])
    
    useEffect(()=>{
        let temp = []
        for(let i=0;i<input;i++){
            temp.push(0)
        }
        console.log(temp,input);
        
        setFinal(temp)
        setSai(temp)
    }
    ,[input])


    const countBox=(event:React.ChangeEvent<HTMLInputElement>)=>{
        var count = Number(event.target.value);
        setInput(count);
    }
    const Equationn=(event:React.ChangeEvent<HTMLInputElement>)=>{
        var count = event.target.value;
        setEquation(count);
    }


    const calculateRoot=(event:React.ChangeEvent<HTMLInputElement>,i:number)=>{
        console.log(i);
        var value = Number(event.target.value);
        var ans=evaluate(Equation,{x:value});
        let temp = final
        temp[i] = ans
        setFinal(temp);
        
    }


    const Gentable = ()=> {
        return sai.map((item, index) => {
            
            return <input onChange={(e) => {
                let value = evaluate(Equation, {x:e.target.value})
                let temp = JSON.parse(JSON.stringify(final))
                temp[index] = value
                setFinal(temp)
            }}/>
        })
    }
    const GentableY = ()=> {
        return final.map((item, index) => {
            return <input placeholder={`${final[index]}`}/>
        })
    }
    

    return(
        <div>
            <input onChange={Equationn}></input><br/>
            <input onChange={countBox}></input>
            <br></br>
            <div style={{display:"inline-block"}}>{Gentable()}</div>
            <div style={{display:"inline-block"}}>{GentableY()}</div>

            {/* <div style={{display:"inline-block"}}>{element}</div>
            <div style={{display:"inline-block"}}>{element2}</div> */}
        </div>
    )
}
export default Box