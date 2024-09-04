import React, { useState, useEffect } from 'react';
import './Restaurant.css';
import TableList from '../TableList/TableList';
import { tableTypes } from '../../constants';

const generateRandomTable = (id) => {
  const tableType = ['Dining Table', 'Booth Table', 'Outdoor Table', 'Private Dining Table'][Math.floor(Math.random() * 4)];
  const maxGuests = tableTypes[tableType].maxGuests;
  return {
    id,
    type: tableType,
    name: `Table ${id}`,
    warning: Math.random() < 0.2,
    guests: Math.floor(Math.random() * maxGuests),
    maxGuests: maxGuests,
  }
};

const Restaurant = () => {
  const [tables, setTables] = useState(Array.from({ length: 1000 }, (_, id) => generateRandomTable(id)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTables((prevTables) =>
        prevTables.map((table) =>
          Math.random() < 0.2
            ? { ...table, warning: !table.warning, guests: Math.floor(Math.random() * table.maxGuests) }
            : table
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="restaurant">
      <TableList tables={tables} />
    </div>
  );
};

export default Restaurant;
