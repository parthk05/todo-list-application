// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";

import TodoList from "./components/TodoList/TodoList.jsx";

// import TodoEditForm from "./components/TodoEditForm";
// import TodoForm from "./components/TodoForm";
// import TodoItem from "./components/TodoItem/TodoItem.jsx";
// import TodoList from "../src/components/TodoList";

// import TodoList from "./components/TodoList/TodoList.jsx";

function App() {
  return (
    <div className="w-screen h-screen bg-[#EDE8F5] overflow-auto flex items-center justify-center py-20">
      <div className="bg-white p-6 rounded-lg shadow-md w-[900px] self-start">
        <Header />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
