import React, { useState } from 'react';
import { Trash2, Edit, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, toggleComplete, deleteTask, startEditing }) => {
  const [selected, setSelected] = useState(false);
  
  // Функция для проверки скорого дедлайна
  const getTimeStatus = (dueDate) => {
    if (!dueDate) return { isDeadlineSoon: false, isOverdue: false, remainingHours: null };
    
    const now = new Date();
    const taskDate = new Date(dueDate);
    const diffTime = taskDate - now;
    const diffHours = diffTime / (1000 * 60 * 60);
    
    return {
      isDeadlineSoon: diffHours > 0 && diffHours < 1, // Меньше часа до дедлайна
      isNearDeadline: diffHours > 0 && diffHours < 24, // Меньше 24 часов
      isOverdue: diffHours < 0,
      remainingHours: Math.abs(diffHours)
    };
  };
  
  // Получаем статус времени
  const timeStatus = task.dueDate ? getTimeStatus(task.dueDate) : { isDeadlineSoon: false, isOverdue: false };
  
  // Функция для получения класса карточки по статусу задачи
  const getCardClass = () => {
    if (task.completed) {
      return 'bg-sky-100'; // Голубой для выполненных
    } else if (timeStatus.isOverdue) {
      return 'bg-red-100'; // Красный для просроченных
    } else if (task.priority === 'high') {
      return 'bg-red-100'; // Красный для высоких приоритетов
    } else if (task.priority === 'low') {
      return 'bg-sky-100'; // Голубой для низких приоритетов
    } else {
      return task.id % 2 === 0 ? 'bg-pink-100' : 'bg-sky-100'; // Чередование для средних
    }
  };
  
  // Получаем иконку для задачи
  const getTaskIcon = () => {
    // Определяем иконку на основе текста задачи
    if (task.text.toLowerCase().includes('care') || task.text.toLowerCase().includes('teeth')) {
      return '🥤';
    } else if (task.text.toLowerCase().includes('journal')) {
      return '✏️';
    } else if (task.text.toLowerCase().includes('water')) {
      return '💧';
    } else if (task.text.toLowerCase().includes('bodycare') || task.text.toLowerCase().includes('shower')) {
      return '👺';
    } else if (task.text.toLowerCase().includes('duolingo')) {
      return '🎓';
    } else if (task.text.toLowerCase().includes('read')) {
      return '📚';
    } else if (task.text.toLowerCase().includes('презентац')) {
      return '📊';
    } else {
      return '📝';
    }
  };
  
  // Получаем подзаголовок для задачи
  const getTaskSubtitle = () => {
    // Определяем подзаголовок на основе текста задачи
    if (task.text.toLowerCase().includes('care') || task.text.toLowerCase().includes('teeth')) {
      return 'Teeth, skincare, haircare';
    } else if (task.text.toLowerCase().includes('journal')) {
      return 'Clearing your mind a lil bit';
    } else if (task.text.toLowerCase().includes('water')) {
      return 'Drinking 4-6 glasses daily💧💦';
    } else if (task.text.toLowerCase().includes('bodycare') || task.text.toLowerCase().includes('shower')) {
      return 'Shower, lotion';
    } else if (task.text.toLowerCase().includes('duolingo')) {
      return 'Lesson';
    } else if (task.text.toLowerCase().includes('read')) {
      return 'At least 2 pages daily';
    } else if (task.text.toLowerCase().includes('презентац')) {
      return 'Подготовить слайды для встречи';
    } else {
      return '';
    }
  };
  
  const handleToggleSelect = () => {
    setSelected(!selected);
  };
  
  const handleToggleComplete = (e) => {
    e.stopPropagation();
    toggleComplete(task.id);
    setSelected(false);
  };
  
  const handleEdit = (e) => {
    e.stopPropagation();
    startEditing(task);
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };
  
  return (
    <div className="relative">
      <div 
        className={`mb-3 p-4 rounded-lg shadow-sm ${getCardClass()} ${selected ? 'border-2 border-pink-500' : ''}`}
        onClick={handleToggleSelect}
      >
        <div className="flex items-start space-x-3 flex-1">
          <div className="text-xl mt-1">{getTaskIcon()}</div>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className={`text-gray-800 text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>
                  {task.text} {task.completed ? '✓' : ''}
                </h3>
                <p className="text-gray-500 text-sm">{getTaskSubtitle()}</p>
              </div>
            </div>
          </div>
          
          {/* Иконка состояния задачи */}
          <div className="ml-2">
            {task.completed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400" />
            )}
          </div>
        </div>
        
        {/* Кнопки действий */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Панель выполнения задачи - появляется при выборе */}
      {selected && !task.completed && (
        <div className="flex justify-center mb-4 -mt-2 animate-fadeIn">
          <button
            onClick={handleToggleComplete}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors flex items-center"
          >
            <CheckCircle className="h-5 w-5 mr-2" /> 
            Отметить как выполненное
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;