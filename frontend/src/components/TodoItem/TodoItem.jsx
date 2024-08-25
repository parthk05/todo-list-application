import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

const TodoItem = () => {
  return (
    <div className="flex items-start pt-4 bg-white mt-5">
      {/* Checkbox */}
      <input
        type="checkbox"
        className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
      />

      {/* Content Section */}
      <div className="ml-3 flex-1">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">Card Title</h3>
        {/* Description */}
        <p className="mt-1 text-sm text-gray-500">
          This is the card description. It gives more details about the content
          of the card.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="ml-4 flex space-x-2">
        {/* Edit Button */}
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none"
        >
          <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-red-100 px-2 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-200 focus:outline-none"
        >
          <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
