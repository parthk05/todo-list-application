import React, { useState } from "react";

const TodoListItemEditForm = ({
  initialTitle,
  initialDescription,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSaveClick = () => {
    // Call the onSave function passed as a prop with the updated title and description
    onSave({ title, description });
  };

  return (
    <div className="bg-white p-6 w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Task</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveClick}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TodoListItemEditForm;
