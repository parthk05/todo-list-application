import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import todoListData from "../../data";
import TodoListItemEditForm from "../TodoEditForm/TodoEditForm";

const TodoList = () => {
  const [todos, setTodos] = useState(todoListData);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div>
      {editingTodo && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-600 bg-opacity-50">
          <TodoListItemEditForm
            initialTitle={editingTodo.title}
            initialDescription={editingTodo.description}
            onSave={(updatedTodo) =>
              handleSaveEdit({ ...editingTodo, ...updatedTodo })
            }
            onCancel={handleCancelEdit}
          />
        </div>
      )}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onEdit={() => handleEdit(todo)}
          onDelete={() => handleDelete(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
