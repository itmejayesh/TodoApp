"use client";
import AddTodo from "@/components/AddTodo";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TodosMessage from "@/components/TodosMessage";
import axios from "axios";
import "./globals.css";
import { toast, ToastOptions } from "react-toastify";

type Props = {};

const successState: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const page = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success(`User logged out`, successState);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <main className="p-5 inset-0 mx-auto md:w-[75vh]">
        <div className="flex justify-end p-2">
          <button onClick={logout} className="bg-red-600 rounded-md p-2">
            Logout
          </button>
        </div>
        <h1 className="font-bold text-2xl flex flex-col justify-center items-center border-b my-5 py-5 border-gray-600 ">
          TODO APP
        </h1>
        <Navbar />
        <AddTodo />
        <TodosMessage />
      </main>
    </>
  );
};

export default page;
