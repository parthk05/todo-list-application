import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "../TodoItem/TodoItem";
import TodoListItemEditForm from "../TodoEditForm/TodoEditForm";
import TodoForm from "../TodoForm/TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showTodoForm, setShowTodoForm] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todos/");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEdit = async (updatedTodo) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/todos/${updatedTodo.id}`,
        updatedTodo
      );
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? response.data : todo))
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Function to handle adding a new task
  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
    setShowTodoForm(false);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  return (
    <div>
      {showTodoForm && (
        <TodoForm
          onClose={() => setShowTodoForm(false)}
          onAdd={handleAddTodo}
        />
      )}

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
          id={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onEdit={() => handleEdit(todo)}
          onDelete={() => handleDelete(todo.id)}
          onUpdate={handleUpdateTodo} // Pass the update handler
        />
      ))}
    </div>
  );
};

export default TodoList;
