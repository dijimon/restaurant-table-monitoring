import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';
import './TableList.css';

const TableList = ({ tables }) => (
  <div className="table-list">
    {tables.map(table => (
      <Table key={table.id} table={table} />
    ))}
  </div>
);

TableList.propTypes = {
  tables: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // ... остальные пропсы определены в Table.propTypes
    })
  ).isRequired
};

export default TableList;
