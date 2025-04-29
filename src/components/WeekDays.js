import React, { useState, useEffect } from 'react';

const WeekDays = ({ onDateSelect }) => {
  // Days of week
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  // Set specific dates as in the screenshot
  const fixedDates = [28, 29, 30, 1, 2, 3, 4];
  const fixedMonths = [3, 3, 3, 4, 4, 4, 4]; // 3 = April, 4 = May
  const fixedYears = [2025, 2025, 2025, 2025, 2025, 2025, 2025];
  
  // State for active day (default Tuesday with index 1)
  const [activeDay, setActiveDay] = useState(1);
  
  // When component mounts, send default selected date
  useEffect(() => {
    if (onDateSelect) {
      const defaultDate = new Date(fixedYears[activeDay], fixedMonths[activeDay], fixedDates[activeDay]);
      onDateSelect(defaultDate);
    }
  }, []);
  
  // Function to change active day on click
  const handleDayClick = (index) => {
    setActiveDay(index);
    
    // If date selection handler is provided, call it with selected date
    if (onDateSelect) {
      const selectedDate = new Date(fixedYears[index], fixedMonths[index], fixedDates[index]);
      onDateSelect(selectedDate);
    }
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