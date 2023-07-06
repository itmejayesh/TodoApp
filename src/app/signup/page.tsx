"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLoaderAlt } from "react-icons/bi";
import { toast, ToastOptions } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

//TODO: catch block run 1st before try block fix the bug later

//yup validation schema for signup form
const userSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
});

const errorState: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

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

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  //backend call for sign up
  const onSignup = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/signup`, values);
      const responseData = response.data;
      if (!responseData.error) {
        toast.success("Signup success", successState);
        router.push("/login");
      } else {
        if (responseData.error === "User already exists") {
          toast.error("User already exists", errorState);
        }
      }
    } catch (error: any) {
      toast.error(
        "An error occurred during sign in. Please try again later.",
        errorState
      );
    } finally {
      setLoading(false);
    }
  };

  //form submitting and validation handling
  const {
    values,
    handleChange,
    handleSubmit,
    isValid,
    isSubmitting,
    errors,
    touched,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      //1st check on first render and refresh value is not empty
      if (values.username && values.email && values.password) {
        onSignup(values);
      }
    },
  });

  //manually handling touched state value true or false
  const handleBlur = (field: string) => {
    setFieldTouched(field, true);
  };

  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mx-auto h-10 w-auto flex justify-center items-center font-black text-blue-500 text-2xl">
            TodoApp
          </p>
          <h2 className="mt-5 text-center text-2xl font-medium leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  //check the felid value is touched before make the felid touched value true
                  onBlur={() => handleBlur("email")}
                  placeholder="email address"
                  autoComplete="email"
                  required
                  className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    touched.email && errors.email
                      ? "text-white focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
                      : ""
                  }  `}
                />

                {touched.email && errors.email && (
                  <p className="text-red-600 mt-2 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={() => handleBlur("username")}
                  placeholder="username"
                  required
                  className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    touched.username && errors.username
                      ? "text-white focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
                      : ""
                  }  `}
                />
                {touched.username && errors.username && (
                  <p className="text-red-600 mt-2 text-sm">{errors.username}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="password"
                  onBlur={() => handleBlur("password")}
                  autoComplete="current-password"
                  required
                  className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    touched.password && errors.password
                      ? "text-white focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
                      : ""
                  }  `}
                />
                {touched.password && errors.password && (
                  <p className="text-red-600 mt-2 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={onSignup}
                type="submit"
                disabled={
                  !isValid ||
                  isSubmitting ||
                  Boolean(touched.email && errors.email)
                }
                className={`${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-500 slide-in-elliptic-top-fwd"
                    : "bg-red-600 cursor-not-allowed hover:bg-red-500 shake-horizontal"
                } 
                
                cursor-pointer flex items-center gap-2 w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm`}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
                {isLoading && <BiLoaderAlt className="text-lg animate-spin" />}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            already a member? &nbsp;
            <Link
              href="/login"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-400"
            >
              log in now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
