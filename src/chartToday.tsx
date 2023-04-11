import React,{useState,useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataProp {
    x: number[],
    y: number[]
}
interface Data {
    x: number,
    y: number
}
const Chart = (prop:DataProp) => {
    const [data, setData]=useState<Data[]>([]);
    useEffect(() => {
        console.log(prop)
        let temp=[];
        for(let i=0;i<prop.x.length;i++){
            temp.push({x:prop.x[i],y:prop.y[i]})
        }
        setData(temp);
    },[prop])
    
  return (
    
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="y" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="x" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      
  )
}

export default Chart