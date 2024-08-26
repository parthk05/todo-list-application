import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const TodoItem = ({
  id,
  title,
  description,
  completed,
  onEdit,
  onDelete,
  onUpdate,
}) => {
  const handleCheckboxChange = async (event) => {
    const newCompletedStatus = event.target.checked;

    try {
      // Update the todo item in the database with the new completed status
      const response = await axios.put(`http://127.0.0.1:8000/todos/${id}`, {
        title,
        description,
        completed: newCompletedStatus,
      });

      // Update the local state if `onUpdate` is provided
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="flex items-start pt-6">
      <input
        type="checkbox"
        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
        checked={completed}
        onChange={handleCheckboxChange}
      />
      <div className="ml-3 flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="ml-4 flex space-x-2">
        <button
          type="button"
          onClick={() => onEdit(id, title, description)}
          className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none"
        >
          <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="inline-flex items-center rounded-md bg-red-100 px-2 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200 focus:outline-none"
        >
          <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
