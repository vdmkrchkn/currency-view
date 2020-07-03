import React from 'react';
import {LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

interface IAxisProps {
  x?: number;
  y?: number;
  textColor: string;
  payload?: any
}

interface IChartProps {
  data: any[];
  xAxisDataKey: string;
}

const CustomizedAxisTick = ({x, y, textColor, payload}: IAxisProps) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill={textColor} transform="rotate(-45)">
      {payload.value}
    </text>
  </g>
);

const chartElemColor = '#666';

const Chart = ({data, xAxisDataKey}: IChartProps) => (
  <ResponsiveContainer width="80%" height={350}>
    <LineChart data={data}>
      <XAxis dataKey={xAxisDataKey} height={80} tick={<CustomizedAxisTick textColor={chartElemColor}/>} />
      <YAxis />
      <CartesianGrid stroke={chartElemColor} strokeDasharray="3 3" />
      <Line type="monotone" dataKey="usd" stroke="#8884d8" />
      <Line type="monotone" dataKey="eur" stroke="#82ca9d" />
      <Tooltip />
      <Legend layout="vertical" align="right" verticalAlign="middle" />
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
