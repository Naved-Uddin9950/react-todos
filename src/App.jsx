import './App.css';
import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import add from '/add.svg';
import remove from '/remove.svg';

function App() {

  const storedData = localStorage.getItem("my-react-todo-list");
  const [todoList, setTodoList] = useState(JSON.parse(storedData) || []);

  const todoRef = useRef();

  const addItem = () => {
    const value = todoRef.current.value;

    if (value != "") {
      const data = {
        title: value,
        status: "Ongoing"
      }

      setTodoList([...todoList, data]);
      todoRef.current.value = "";
    }
    todoRef.current.focus();
  }

  const deleteItem = (id) => {
    setTodoList((prevTodoList) => prevTodoList.filter((_, index) => index !== id));
  }

  const updateItem = (id) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((item, index) =>
        index === id ? { ...item, status: item.status === "Ongoing" ? "Completed" : "Ongoing" } : item
      )
    );
  }

  useEffect(() => {
    const todos = JSON.stringify(todoList);
    localStorage.setItem("my-react-todo-list", todos);
  }, [todoList]);

  return (
    <div className='w-full h-screen'>
      <Header />

      <div className='flex flex-row w-full justify-center my-4'>
        <input
          type="text"
          placeholder='Buy me a coffee'
          className='shadow-md text-xl px-4 py-2 border'
          ref={todoRef}
        />

        <button
          type="button"
          className='border shadow-md px-6'
        ><img src={add} alt="Add" onClick={addItem} /></button>
      </div>

      <div className='w-100 flex flex-col items-center'>
        <div className='w-full sm:w-2/4 flex flex-row justify-around items-center shadow-md mb-2'>
          <p>Status</p>
          <p>Todo</p>
          <p>Remove</p>
        </div>
        {
          todoList.map((item, index) => (
            <div className='w-full sm:w-2/4 flex flex-row border justify-around items-center p-2' key={index}>
              <input
                type="checkbox"
                onChange={() => updateItem(index)}
                checked={item.status === "Completed"}
              />

              {
                item.status === "Ongoing" ? <p>{item.title}</p> : <p className='line-through font-bold text-red-500'>{item.title}</p>
              }
    
              <img
                src={remove}
                alt="remove"
                className='hover:cursor-pointer'
                onClick={() => deleteItem(index)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
