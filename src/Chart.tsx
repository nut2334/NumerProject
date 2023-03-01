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
      <Line type="monotone" dataKey="xl" stroke="#F38181" activeDot={{ r: 8 }}/>
      <Line type="monotone" dataKey="xm" stroke="#FCE38A" />
      <Line type="monotone" dataKey="xr" stroke="#EAFFD0" />
      <Line type="monotone" dataKey="error" stroke="#95E1D3" />
    </LineChart>
  )
}

export default Chart
