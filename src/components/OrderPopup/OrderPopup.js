import React from 'react';
import PropTypes from 'prop-types';
import './OrderPopup.css';

const DISHES = [
  'Борщ', 'Стейк', 'Цезарь', 'Пицца Маргарита', 'Паста Карбонара',
  'Суши', 'Греческий салат', 'Том Ям', 'Пельмени', 'Тирамису',
  'Ризотто', 'Лазанья', 'Рамен', 'Бургер', 'Фуа-гра'
];

const generateRandomOrders = () => {
  const orderCount = Math.floor(Math.random() * 3) + 1; // 1-3 блюда
  const orders = new Set();
  
  while(orders.size < orderCount) {
    const randomDish = DISHES[Math.floor(Math.random() * DISHES.length)];
    orders.add(randomDish);
  }
  
  return Array.from(orders);
};

const OrderPopup = ({ tableName, onClose }) => {
  const orders = React.useMemo(() => generateRandomOrders(), []);

  return (
    <div className="order-popup-overlay" onClick={onClose}>
      <div className="order-popup" onClick={e => e.stopPropagation()}>
        <div className="order-popup__header">
          <h3>Ожидающие блюда - {tableName}</h3>
          <button className="order-popup__close" onClick={onClose}>×</button>
        </div>
        <div className="order-popup__content">
          <ul className="order-popup__list">
            {orders.map((dish, index) => (
              <li key={index} className="order-popup__item">
                {dish}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

OrderPopup.propTypes = {
  tableName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default OrderPopup; 