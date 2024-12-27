import React from 'react';
import PropTypes from 'prop-types';
import './TableStatusIndicator.css';

const TableStatusIndicator = ({ warning, isAtCapacity, guests, tableName, onWarningClick }) => {
  const getStatusClass = () => {
    if (guests === 0) return 'status-indicator--available';
    if (warning) return 'status-indicator--warning';
    if (isAtCapacity) return 'status-indicator--full';
    return 'status-indicator--normal';
  };

  const getStatusText = () => {
    if (guests === 0) return 'Свободен';
    if (warning) return 'Требует внимания';
    if (isAtCapacity) return 'Заполнен';
    return 'В порядке';
  };

  const handleClick = (e) => {
    if (warning) {
      e.stopPropagation();
      onWarningClick(tableName);
    }
  };

  return (
    <div 
      className={`status-indicator ${getStatusClass()} ${warning ? 'status-indicator--clickable' : ''}`}
      onClick={handleClick}
    >
      <span className="status-indicator__dot"></span>
      <span className="status-indicator__text">{getStatusText()}</span>
    </div>
  );
};

TableStatusIndicator.propTypes = {
  warning: PropTypes.bool.isRequired,
  isAtCapacity: PropTypes.bool.isRequired,
  guests: PropTypes.number.isRequired,
  tableName: PropTypes.string.isRequired,
  onWarningClick: PropTypes.func.isRequired
};

export default TableStatusIndicator; 