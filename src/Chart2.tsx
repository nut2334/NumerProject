import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface itemProp {
  iteration: Number[];
  X0: Number[];
  Error: Number[];
}

const Chart2 = (prop:itemProp) => {
  const data=[];
  for(let i = 0; i < prop.iteration.length; i++) {
  data.push({
    name: prop.iteration,
    x0: prop.X0[i],
    error: prop.Error[i]
  });
}
  return (
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
      <Line type="monotone" dataKey="x0" stroke="#F38181" activeDot={{ r: 8 }} strokeWidth={4}/>
      <Line type="monotone" dataKey="error" stroke="#95E1D3" strokeWidth={4}/>
    </LineChart>
  )
}

export default Chart2
