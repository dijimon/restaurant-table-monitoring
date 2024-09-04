import React, { memo } from 'react';
import './Table.css';

const Table = ({ table }) => {
  const { type, name, warning, guests, maxGuests } = table;
  console.log(name);

  return (
    <div className={`table ${warning && guests > 0 ? 'warning' : ''}`}>
      <div className="table-type">{type}</div>
      <h3>{name}</h3>
      <p>Guests: {guests}/{maxGuests}</p>
    </div>
  );
};

export default memo(Table);
