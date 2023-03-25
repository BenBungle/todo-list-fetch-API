import React, { useEffect, useState } from "react";

function Applist() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const url = "https://assets.breatheco.de/apis/fake/todos/user/benbungle";

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.log("error", error));
  }, []);

  const updateAPI = (todos) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.json()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  };
  useEffect(() => {
    if (editingIndex !== -1) {
      updateAPI(todos);
    }
  }, [editingIndex]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      return;
    }
    if (editingIndex === -1) {
      const newTodos = [...todos, { label: inputValue, done: false }];
      setTodos(newTodos);
      updateAPI(newTodos);
    } else {
      const newTodos = [...todos];
      newTodos[editingIndex].label = inputValue;
      setTodos(newTodos);
      setEditingIndex(-1);
    }
    setInputValue("");
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setInputValue(todos[index].label);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    updateAPI(newTodos);
  };

  const remainingTasks = todos.filter((todo) => !todo.done).length;

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
        {todos.map((todos, index) => (
          <li key={index}>
            {todos.label}
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
