"use client"
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  let renderTask = <h2 className="text-center text-gray-500">No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className="flex items-center justify-between mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded shadow-md">
        <div className="flex items-center justify-between w-2/3">
          <h5 className="text-2xl font-semibold dark:text-white">{t.title}</h5>
          <h6 className="text-lg font-medium text-gray-600 dark:text-gray-300">{t.desc}</h6>
        </div>
        <button onClick={() => deleteHandler(i)}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition duration-300">Delete Task</button>
      </li>
    ));
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition duration-300`}> 
      <header className="flex justify-between items-center p-5 bg-black dark:bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">My Todo List</h1>
        <button onClick={() => setDarkMode(!darkMode)} 
          className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded transition duration-300">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      
      <form onSubmit={submitHandler} className="p-5 flex flex-col md:flex-row justify-center gap-4">
        <input type="text" 
          className="text-xl border border-gray-800 dark:border-gray-400 px-4 py-2 rounded dark:bg-gray-800 dark:text-white" 
          placeholder="Enter Task Here" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="text" 
          className="text-xl border border-gray-800 dark:border-gray-400 px-4 py-2 rounded dark:bg-gray-800 dark:text-white" 
          placeholder="Enter Description Here" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-black dark:bg-blue-500 text-white px-4 py-3 text-xl font-bold rounded hover:opacity-80 transition duration-300">Add Task</button>
      </form>
      
      <div className={`p-8 flex-grow ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
        <ul>{renderTask}</ul>
      </div>

      <footer className="mt-auto p-4 bg-gray-800 dark:bg-gray-700 text-center text-white mt-8">
        <p>&copy; {new Date().getFullYear()} My Todo List. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Page;