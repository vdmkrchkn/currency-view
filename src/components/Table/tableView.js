import React from 'react';

import './tableView.css';

// max количество строк табл - pagination?
const TableView = ({data, fields}) => (
    <div className="table-container">
        <table border="1">
            <thead>
                <tr>
                    {fields.map(field => (<th key={field}>{field}</th>))}
                </tr>
            </thead>
            <tbody>
                {data.map(elem => (
                    <tr key={elem[fields[0]]}>
                        {fields.map(field => (<td key={elem[fields[0]] + field}>{elem[field]}</td>))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TableView;
