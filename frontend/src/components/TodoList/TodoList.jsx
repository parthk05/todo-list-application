import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import TodoListItemEditForm from "../TodoEditForm/TodoEditForm";
import todoListData from "../../data";

const TodoList = () => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleEditClick = (todo) => {
    setCurrentTodo(todo);
    setIsEditFormVisible(true);
  };

  const handleSave = (updatedTodo) => {
    // Implement saving logic here (e.g., update the todo in state)
    setIsEditFormVisible(false);
  };

  const handleCancel = () => {
    setIsEditFormVisible(false);
  };

  return (
    <div>
      {todoListData.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onEdit={() => handleEditClick(todo)}
        />
      ))}

      {isEditFormVisible && currentTodo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <TodoListItemEditForm
            initialTitle={currentTodo.title}
            initialDescription={currentTodo.description}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;
