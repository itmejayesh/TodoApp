"use client";

import { useTodos } from "@/store/todo";
import React, { useState } from "react";

type Props = {};

const AddTodo = (props: Props) => {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodos();

  const handleFormSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo(" ");
  };

  return (
    <form
      className="flex px-5 flex-col lg:flex-row justify-center my-8 flex-grow items-center gap-5"
      onSubmit={handleFormSubmit}
    >
      <input
        className="text-white rounded-lg p-3 lg:mr-5 placeholder:text-black/30 block py-1.5 w-full
        shadow-sm  focus:outline-none border-transparent border-2 bg-transparent border-gray-600
         placeholder:text-gray-400  focus:border-blue-600 transition-all
         "
        type="text"
        placeholder="Write your task...."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button
        type="submit"
        className=" px-6 py-1 bg-blue-600 rounded-full w-full lg:w-1/4"
      >
        ADD Task
      </button>
    </form>
  );
};

export default AddTodo;
