import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import './Restaurant.css';
import TableList from '../TableList/TableList';
import { tableTypes } from '../../constants';

// Константы
const TABLE_TYPES = ['Dining Table', 'Booth Table', 'Outdoor Table', 'Private Dining Table'];
const UPDATE_INTERVAL = 3000;
const TABLE_COUNT = 1000;
const WARNING_PROBABILITY = 0.2;

/**
 * Генерирует данные для одного стола
 * @param {number} id - Идентификатор стола
 * @returns {Object} Объект с данными стола
 */
const generateRandomTable = (id) => {
  try {
    const tableType = TABLE_TYPES[Math.floor(Math.random() * TABLE_TYPES.length)];
    const maxGuests = tableTypes[tableType]?.maxGuests;

    if (!maxGuests) {
      throw new Error(`Invalid table type: ${tableType}`);
    }

    return {
      id,
      type: tableType,
      name: `Table ${id}`,
      warning: Math.random() < WARNING_PROBABILITY,
      guests: Math.floor(Math.random() * maxGuests),
      maxGuests,
    };
  } catch (error) {
    console.error(`Error generating table ${id}:`, error);
    // Возвращаем стол по умолчанию в случае ошибки
    return {
      id,
      type: TABLE_TYPES[0],
      name: `Table ${id}`,
      warning: false,
      guests: 0,
      maxGuests: tableTypes[TABLE_TYPES[0]].maxGuests,
    };
  }
};

const Restaurant = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tables, setTables] = useState([]);

  // Инициализация столов
  useEffect(() => {
    const initializeTables = async () => {
      // Имитация асинхронной загрузки
      await new Promise(resolve => setTimeout(resolve, 500));
      setTables(Array.from({ length: TABLE_COUNT }, (_, id) => generateRandomTable(id)));
      setIsLoading(false);
    };

    initializeTables();
  }, []);

  // Мемоизированная функция обновления столов
  const updateTable = useCallback((table) => {
    if (Math.random() < WARNING_PROBABILITY) {
      return {
        ...table,
        warning: !table.warning,
        guests: Math.floor(Math.random() * table.maxGuests),
      };
    }
    return table;
  }, []);

  // Периодическое обновление состояния столов
  useEffect(() => {
    if (isLoading) return;

    const updateTables = () => {
      setTables(prevTables => prevTables.map(updateTable));
    };

    const interval = setInterval(updateTables, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [isLoading, updateTable]);

  // Мемоизация отфильтрованных столов для оптимизации производительности
  const memoizedTables = useMemo(() => {
    return tables.map(table => ({
      ...table,
      isAtCapacity: table.guests === table.maxGuests,
    }));
  }, [tables]);

  if (isLoading) {
    return (
      <div className="restaurant restaurant--loading">
        <div className="loading-spinner">Loading tables...</div>
      </div>
    );
  }

  return (
    <div className="restaurant">
      <TableList tables={memoizedTables} />
    </div>
  );
};

Restaurant.propTypes = {
  // Добавьте пропсы здесь, если они понадобятся в будущем
};

export default Restaurant;
