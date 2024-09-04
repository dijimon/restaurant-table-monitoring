import React, { useState, useEffect } from 'react';
import Table from './Table';
import './Restaurant.css';

const generateRandomTable = (id) => {
  const maxGuests = Math.floor(Math.random() * 10);
  return {
    id,
    type: ['Dining Table', 'Booth Table', 'Outdoor Table', 'Private Dining Table'][Math.floor(Math.random() * 4)],
    name: `Table ${id}`,
    warning: Math.random() < 0.2,
    guests: Math.floor(Math.random() * maxGuests),
    maxGuests: maxGuests,
  }
};

const Restaurant = () => {
  const [tables, setTables] = useState(Array.from({ length: 100 }, (_, id) => generateRandomTable(id)));

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
      {tables.map((table) => (
        <Table key={table.id} table={table} />
      ))}
    </div>
  );
};

export default Restaurant;
