import React, { useState } from "react";
import { CalendarIcon, PlusIcon } from "@heroicons/react/20/solid";
import TodoForm from "../TodoForm/TodoForm";

const Header = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateTaskClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <div>
      <div className="lg:flex lg:items-center">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            ToDo List
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                aria-hidden="true"
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              />
              {formattedDate}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="sm:ml-3 flex-grow">
            <button
              type="button"
              onClick={handleCreateTaskClick}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
            >
              <PlusIcon aria-hidden="true" className="-ml-0.5 mr-2 h-6 w-6" />
              Create Task
            </button>
          </span>
        </div>
      </div>

      {isFormVisible && <TodoForm onClose={handleCloseForm} />}
    </div>
  );
};

export default Header;
