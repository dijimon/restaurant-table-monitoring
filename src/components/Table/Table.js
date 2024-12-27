import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TableStatusIndicator from '../TableStatusIndicator/TableStatusIndicator';
import OrderPopup from '../OrderPopup/OrderPopup';
import './Table.css';

const Table = ({ table }) => {
  const { name, type, guests, maxGuests, warning } = table;
  const [showPopup, setShowPopup] = useState(false);
  
  const effectiveWarning = guests === 0 ? false : warning;
  
  const handleWarningClick = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div className={`table ${effectiveWarning ? 'table--warning' : ''} ${guests === 0 ? 'table--available' : ''}`}>
        <div className="table__header">
          <h3 className="table__name">{name}</h3>
          <TableStatusIndicator 
            warning={effectiveWarning}
            isAtCapacity={guests === maxGuests}
            guests={guests}
            tableName={name}
            onWarningClick={handleWarningClick}
          />
        </div>
        <div className="table__info">
          <p className="table__type">{type}</p>
          <p className="table__guests">
            Guests: {guests}/{maxGuests}
          </p>
        </div>
      </div>
      {showPopup && (
        <OrderPopup 
          tableName={name}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

Table.propTypes = {
  table: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    maxGuests: PropTypes.number.isRequired,
    warning: PropTypes.bool.isRequired
  }).isRequired
};

export default memo(Table);
