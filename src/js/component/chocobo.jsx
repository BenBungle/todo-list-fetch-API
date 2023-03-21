import React, { useEffect, useState } from "react";

function Applist() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      return;
    }
    if (editingIndex === -1) {
      setTodos([...todos, inputValue]);
    } else {
      const newTodos = [...todos];
      newTodos[editingIndex] = inputValue;
      setTodos(newTodos);
      setEditingIndex(-1);
    }
    setInputValue("");
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setInputValue(todos[index]);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const remainingTasks = todos.filter(todo => !todo.completed).length;


  return (
    <div className="Applist">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Tasks to do"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={handleAddTodo}>
          {editingIndex === -1 ? "Add" : "Update"}
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <div>
              <button
                className="justify-content-end"
                onClick={() => handleEditTodo(index)}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <p>{remainingTasks} tasks left</p>
    </div>
  );
}

export default Applist;
