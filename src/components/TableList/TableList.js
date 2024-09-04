import React from 'react';
import { Grid } from 'react-virtualized';
import Table from '../Table/Table';
import './TableList.css';

const TableList = ({ tables }) => {
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const index = rowIndex * numColumns + columnIndex;
    if (index >= tables.length) return null;
    const table = tables[index];
    return (
      <div key={key} style={style}>
        <Table table={table} />
      </div>
    );
  };

  const numColumns = 5;
  const numRows = Math.ceil(tables.length / numColumns);

  return (
    <Grid
      cellRenderer={cellRenderer}
      columnCount={numColumns}
      columnWidth={200}
      height={600}
      rowCount={numRows}
      rowHeight={150}
      width={1000}
    />
  );
};

export default TableList;
