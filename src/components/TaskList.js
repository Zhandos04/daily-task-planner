import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, deleteTask, startEditing, showCompleted }) => {
  // Сортировка задач: просроченные и важные первыми, затем остальные по приоритету и типу
  const sortedTasks = [...tasks].sort((a, b) => {
    // Первым приоритетом - категория задачи для верной последовательности в интерфейсе
    // На основе вашего скриншота мы видим следующий порядок:
    // 1. Self care
    // 2. Journal
    // 3. Water
    // 4. Bodycare
    // 5. Duolingo
    // 6. Read
    
    const categoryOrder = {
      'Self care': 1,
      'Journal': 2,
      'Water': 3,
      'Bodycare': 4,
      'Duolingo': 5,
      'Read': 6
    };
    
    const getCategoryFromText = (text) => {
      const lowerText = text.toLowerCase();
      if (lowerText.includes('care') || lowerText.includes('teeth')) return 'Self care';
      if (lowerText.includes('journal')) return 'Journal';
      if (lowerText.includes('water')) return 'Water';
      if (lowerText.includes('bodycare') || lowerText.includes('shower')) return 'Bodycare';
      if (lowerText.includes('duolingo')) return 'Duolingo';
      if (lowerText.includes('read')) return 'Read';
      return 'Other';
    };
    
    const aCategory = getCategoryFromText(a.text);
    const bCategory = getCategoryFromText(b.text);
    
    if (categoryOrder[aCategory] && categoryOrder[bCategory]) {
      return categoryOrder[aCategory] - categoryOrder[bCategory];
    }
    
    // Если категорий нет в порядке или они одинаковые, сортируем по приоритету
    const priorityOrder = { high: 0, normal: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Затем по дате выполнения
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (a.dueDate) {
      return -1;
    } else if (b.dueDate) {
      return 1;
    }
    
    // В последнюю очередь - по ID (времени создания)
    return a.id - b.id;
  });

  // Фильтр для отображения задач
  const filteredTasks = showCompleted 
    ? sortedTasks 
    : sortedTasks.filter(task => !task.completed);
  
  return (
    <div className="space-y-3">
      {filteredTasks.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          {showCompleted 
            ? "У вас пока нет ни одной задачи."
            : "У вас нет активных задач. Все задачи выполнены!"}
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            startEditing={startEditing}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;