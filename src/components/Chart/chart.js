import React from 'react';
import { LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const CustomizedAxisTick = ({x, y, textColor, payload}) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill={textColor} transform="rotate(-45)">
      {payload.value}
    </text>
  </g>
);

const chartElemColor = "#666";

export default ({ data, xAxisDataKey }) => (
  <LineChart width={600} height={350} data={data}>
    <XAxis dataKey={xAxisDataKey} height={80} tick={<CustomizedAxisTick textColor={chartElemColor}/>} />
    <YAxis />
    <CartesianGrid stroke={chartElemColor} strokeDasharray="3 3" />
    <Line type="monotone" dataKey="usd" stroke="#8884d8" />
    <Line type="monotone" dataKey="eur" stroke="#82ca9d" />
    <Tooltip />
    <Legend layout="vertical" align="right" verticalAlign="middle" />    
  </LineChart>
);
