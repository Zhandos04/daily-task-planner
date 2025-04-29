import React, { useState } from 'react';

const WeekDays = () => {
  // Дни недели
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  // Задаем конкретные даты как на скриншоте
  const fixedDates = [28, 29, 30, 1, 2, 3, 4];
  
  // Состояние для активного дня (по умолчанию вторник с индексом 1)
  const [activeDay, setActiveDay] = useState(1);
  
  // Функция для изменения активного дня при клике
  const handleDayClick = (index) => {
    setActiveDay(index);
  };
  
  return (
    <div className="flex justify-between mb-4">
      {daysOfWeek.map((day, index) => {
        const isActive = index === activeDay;
        
        return (
          <div 
            key={day} 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleDayClick(index)}
          >
            <div className="text-gray-500 text-xs mb-1">{day}</div>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full 
                            ${isActive ? 'bg-pink-500 text-white' : 'border border-pink-300 text-gray-700'}
                            transition-all duration-200 hover:border-pink-500`}>
              {fixedDates[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekDays;