import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  // useStates
  let [todos, setTodos] = useState([]);
  let [user, setUser] = useState([]);
  let [show, setShow] = useState(false);
  let [counter, setCounter] = useState(todos.length);
  // todos delete
  const handleDelete = (id) => {
    setTodos((prev) => {
      return prev.filter((pre) => {
        return pre.id !== id;
      });
    });
    setCounter(todos.length);
  };

  // todos completed toggle and false => true true => false
  const handleCompleted = (id) => {
    setTodos((prev) => {
      return prev.map((pre) => {
        return pre.id === id ? { ...pre, completed: !pre.completed } : pre;
      });
    });
  };
  // form create users
  const handleForm = (e) => {
    e.preventDefault();
    setUser([
      {
        id: uuidv4(),
        title: "",
        body: "",
      },
    ]);
    forUser(user);
  };
  // users create  => todos
  const forUser = (users) => {
    setTodos((prev) => {
      return [...prev, users];
    });
  };

  return (
    <>
      <div className="container mx-auto px-10 xl:container xl:mx-auto xl:px-10 mt-[10px] border-2 rounded-2xl ">
        <h3 className="text-3xl mt-[5px] mb-[5px] italic text-center underline decoration-gray-400">
          Todo List
        </h3>

        <div className="container mx-auto flex flex-col items-center justify-center   left-[1%] border-solid border-2 w-[300px] px-[10px] py-[10px] border-green-700 rounded-lg bg-white opacity-100 mb-[20px] mt-[20px]">
          <div className="flex  gap-[120px] items-center mb-[10px]">
            <h2 className="text-[20px] text-green-800">Create user</h2>
            {/* bu buttonni shunchaki qoyib qoydim */}
            <button className="px-[12px] py-[2px] rounded-lg border-2 border-solid text-[20px] ">
              X
            </button>
          </div>
          <form
            className="flex flex-col items-center gap-[10px]"
            onSubmit={handleForm}
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, id: uuidv4() };
              });
            }}
          >
            <input
              className="border-green-600 border-2 rounded-[5px] p-[5px] text-[18px] outline-yellow-400 w-[100%]"
              type="text"
              placeholder="title write..."
              name="title"
              onChange={(e) => {
                setUser((prev) => {
                  return { ...prev, title: e.target.value };
                });
              }}
            />
            <textarea
              className="border-green-600 border-2 rounded-[5px] p-[5px] text-[18px] outline-yellow-400"
              name="body"
              id=""
              cols="30"
              placeholder="body about write..."
              onChange={(e) => {
                setUser((prev) => {
                  return { ...prev, body: e.target.value };
                });
              }}
            ></textarea>
            <select
              className="w-[100%] border-2 border-solid rounded-md border-green-600 outline-yellow-500 text-[20px]"
              name="completed"
              id=""
              onChange={(e) => {
                setUser((prev) => {
                  return { ...prev, completed: e.target.value };
                });
              }}
            >
              <option value="true">completed</option>
              <option value="false">uncompleted</option>
            </select>
            <div className="flex flex-row items-center justify-between gap-[120px]">
              {/* <button className="border-solid rounded-md border-green-600 border-2 px-[12px] py-[6px] outline-yellow-500 bg- text-[green]">
                clear
              </button> */}
              <button className="border-solid rounded-md border-green-600 border-2 px-[12px] py-[6px] outline-yellow-500 bg- text-[green]">
                Submit
              </button>
            </div>
          </form>
        </div>

        <hr className="w-[100%] " />
        <ul className="list-none flex flex-col gap-[10px] ">
          <li className="flex flex-row  justify-between w-lg mt-[10px] mb-[10px] font-bold">
            <h2>Todo Title</h2>
            <h2>Todo Body</h2>
            <h2>Todo Completed</h2>
            <h2>Completed button</h2>
            <h2>Delete button</h2>
          </li>
          <hr />
          {todos.length === 0 && (
            <h2 className="text-center mt-[10px] mb-[10px]">
              no content yet :(
            </h2>
          )}
          {todos.map((todo) => {
            return (
              <>
                <li
                  className={
                    todo.completed
                      ? " opacity-50 flex flex-row justify-between items-center h-[100%] w-[100%]"
                      : " opacity-100 flex flex-row justify-between items-center h-[100%] w-[100%]"
                  }
                  key={todo.id}
                >
                  <h2 className="">{todo.title}</h2>
                  <p className="">{todo.body}</p>
                  <h3
                    className={
                      todo.completed
                        ? "border-2 text-[17px] p-[5px] rounded-[12px] border-solid border-green-700 "
                        : "border-2 text-[17px] p-[5px] border-solid rounded-[12px] border-red-700"
                    }
                  >
                    {todo.completed ? "true ✅" : "false ❌"}
                  </h3>
                  <button
                    className={
                      todo.completed
                        ? "rounded-[10px] text-[18px] bg-green-700 text-white border-2 border-solid   px-[6px] py-[2px]"
                        : "rounded-[10px] text-[18px]  bg-red-700 text-white border-2 border-solid   px-[6px] py-[2px]"
                    }
                    onClick={() => handleCompleted(todo.id)}
                  >
                    {todo.completed ? "Uncompleted" : "completed"}
                  </button>
                  <button
                    className="rounded-[10px] text-[18px] bg-black text-white border-2 border-solid   px-[6px] py-[2px]"
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                  >
                    Delete
                  </button>
                </li>
                <hr />
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
