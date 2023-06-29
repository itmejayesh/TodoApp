import AddTodo from "@/components/AddTodo";
import Navbar from "@/components/Navbar";
import TodosMessage from "@/components/TodosMessage";
import React from "react";
import "./globals.css";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <main className="p-5 inset-0 mx-auto md:w-[75vh]">
        <h1 className="font-bold text-2xl flex flex-col justify-center items-center border-b my-5 py-5 border-gray-600 ">
          ToDO APP
        </h1>
        <Navbar />
        <AddTodo />
        <TodosMessage />
      </main>
    </>
  );
};

export default page;
