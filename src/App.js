import React, { useRef, useState } from "react";
import "./App.css";

function App(props) {
  const { todo } = props;
  const inputNote = useRef(null);
  const [todoList, setTodoList] = useState(todo);
  const [toAddList, setToAddList] = useState("");
  const [error, setError] = useState({ state: false, message: "" });

  const handelAddToDo = () => {
    if (toAddList === "") {
      setError({ state: true, message: "You can't add empty note!" });
      return;
    } else {
      let maxId = 0;
      todoList.forEach((todo) => {
        if (todo.id > maxId) maxId = todo.id;
      });
      maxId++;
      // Add a new todo list
      setTodoList([...todoList, { id: maxId, title: toAddList, done: false }]);
      // Clear input field
      setToAddList("");
      // Clear Pre error message
      setError({ state: false, message: "" });
      // Set focus to input after submit
      inputNote.current.focus();
    }
  };

  // Toggle todo state
  const toggleTodoState = (todoId) => {
    const newState = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setTodoList(newState);
  };

  //Delete todo
  const deleteTodo = (todoId) => {
    const newState = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newState);
  };

  const handelCreateNote = (event) => {
    setToAddList(event.target.value);
  };

  const createNoteOnEnter = (event) => {
    if (event.key === "Enter") {
      handelAddToDo();
    }
  };

  const Error = ({ isShow }) => {
    return <>{isShow && <p className="error">{error.message}</p>}</>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="add-todo-container">
          <label htmlFor="addTodoItem">Add New note</label>
          <input
            placeholder="add a new note"
            ref={inputNote}
            id="addTodoItem"
            autoFocus
            type="text"
            value={toAddList}
            onChange={handelCreateNote}
            onKeyPress={createNoteOnEnter}
          />
          <button className="todo-submit" onClick={handelAddToDo}>
            Add to list
          </button>
        </div>
        <Error isShow={error.state} />
        {todoList.length ? (
          <ul className="todo-list">
            {todoList.map((todo, index) => (
              <li
                className={todo.done ? "note-item note-done" : "note-item"}
                key={todo.id}
              >
                <div>
                  <input
                    id={`note-state-${index}`}
                    type="checkbox"
                    value={todo.done}
                    onChange={() => toggleTodoState(todo.id)}
                  />
                  <label htmlFor={`note-state-${index}`}>{todo.title}</label>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="todo-delete"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>There is nothing todo!</p>
        )}
      </header>
    </div>
  );
}

export default App;
