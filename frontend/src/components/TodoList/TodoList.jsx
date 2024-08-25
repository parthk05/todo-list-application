import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import todoListData from "../../data";

const TodoList = () => {
  return (
    <div>
      {todoListData.map((todo) => (
        <TodoItem
          key={todo.id} // Provide a unique key for each item
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TodoList;
