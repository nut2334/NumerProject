import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface itemProp {
  iteration: Number[];
  Xl: Number[];
  Xm: Number[];
  Xr: Number[];
  Error: Number[];
}

const Chart = (prop:itemProp) => {
  const data=[];
  for(let i = 0; i < prop.iteration.length; i++) {
  data.push({
    name: prop.iteration,
    xl: prop.Xl[i],
    xm: prop.Xm[i],
    xr: prop.Xr[i],
    error: prop.Error[i]
  });
}
  return (
    <div style={{ textAlign: "center", justifyContent: "center", display: 'flex', width: '100vw' }}>
    <LineChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="xl" stroke="#F9ED69" activeDot={{ r: 8 }} strokeWidth={4}/>
      <Line type="monotone" dataKey="xm" stroke="#F08A5D" strokeWidth={4}/>
      <Line type="monotone" dataKey="xr" stroke="#B83B5E" strokeWidth={4}/>
      <Line type="monotone" dataKey="error" stroke="#6A2C70" strokeWidth={4}/>
    </LineChart>
    </div>
  )
}

export default Chart
