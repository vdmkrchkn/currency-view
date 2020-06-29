import React from 'react';

import './table.css';

const Table = ({data, fields, maxRows}) => (
    <div className="table-container">
        <table border="1">
            <thead>
                <tr>
                    {fields.map(field => (<th key={field}>{field}</th>))}
                </tr>
            </thead>
            <tbody>
                {data.slice(0, maxRows).map(elem => (
                    <tr key={elem[fields[0]]}>
                        {fields.map(field => (<td key={elem[fields[0]] + field}>{elem[field]}</td>))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Table;
