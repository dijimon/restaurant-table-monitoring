import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="loading-spinner">
    <div className="loading-spinner__circle"></div>
    <p className="loading-spinner__message">{message}</p>
  </div>
);

LoadingSpinner.propTypes = {
  message: PropTypes.string
};

export default LoadingSpinner; 