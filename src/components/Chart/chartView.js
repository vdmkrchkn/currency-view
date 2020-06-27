import React from 'react';

import Chart from "./chart";
import './chartView.css';

const ChartView = (props) => (
    <div className="chart-container">
        <Chart {...props}/>
    </div>
);

export default ChartView;
