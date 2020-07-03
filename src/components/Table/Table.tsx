import React from 'react';

import './table.css';

interface ITableProps {
  data: any[],
  fields: string[],
  maxRows: number,
}

const Table = ({data, fields, maxRows}: ITableProps) => (
  <div className="table-container">
    <table>
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
