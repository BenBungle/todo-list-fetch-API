import React, { useEffect, useState } from "react";

function Applist() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos]);

  const handleAddTodo = () => {
    if (inputValue.trim() === '' ) {
        return;
    }
      setTodos([...todos, inputValue]);
      setInputValue('');
  };
  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

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
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Applist