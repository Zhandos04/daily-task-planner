import React, { useEffect } from 'react';
import { Bell, AlertTriangle, Plus, Trash2, Check, Edit, Clock } from 'lucide-react';

const NotificationItem = ({ notification, removeNotification, style }) => {
  // Определение типа уведомления
  let bgColor = "bg-gray-800";
  let title = "Уведомление";
  let icon = <Bell className="h-5 w-5" />;
  
  switch(notification.type) {
    case 'due':
      bgColor = "bg-red-500";
      title = "Срок задачи истек";
      icon = <AlertTriangle className="h-5 w-5" />;
      break;
    case 'oneHour':
      bgColor = "bg-orange-500";
      title = "Остался час до дедлайна!";
      icon = <Clock className="h-5 w-5" />;
      break;
    case 'upcoming':
      bgColor = "bg-yellow-500";
      title = "Приближается срок задачи";
      icon = <Clock className="h-5 w-5" />;
      break;
    case 'created':
      bgColor = "bg-green-500";
      title = "Задача создана";
      icon = <Plus className="h-5 w-5" />;
      break;
    case 'deleted':
      bgColor = "bg-red-500";
      title = "Задача удалена";
      icon = <Trash2 className="h-5 w-5" />;
      break;
    case 'completed':
      bgColor = "bg-blue-500";
      title = "Задача выполнена";
      icon = <Check className="h-5 w-5" />;
      break;
    case 'edited':
      bgColor = "bg-yellow-500";
      title = "Задача изменена";
      icon = <Edit className="h-5 w-5" />;
      break;
  }
  
  // Автоматическое удаление уведомления через 5 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);
  
  return (
    <div 
      className={`${bgColor} text-white p-3 rounded-lg shadow-lg mb-2`}
      style={{
        animation: 'slideIn 0.3s ease-out',
        ...style
      }}
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-semibold">{title}</span>
        </div>
        <button 
          onClick={() => removeNotification(notification.id)}
          className="text-white hover:text-gray-200"
        >
          &times;
        </button>
      </div>
      <div className="text-sm">{notification.task}</div>
    </div>
  );
};

export default NotificationItem;