"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastOptions } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { BiLoaderAlt } from "react-icons/bi";

//ToDo Some Error Check not working properly in if else cases handle later

const userSchema = yup.object().shape({
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

export default function LoginPage() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);

  const onLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      const responseData = response.data;
      if (!responseData.error) {
        toast.success("Login successful", successState);
        router.push("/");
      } else {
        if (
          responseData.error ===
          "User not found. Please check your email and try again."
        ) {
          toast.error(
            "User not found. Please check your email and try again.",
            errorState
          );
        } else if (
          responseData.error ===
          "Invalid password. Please enter the correct password."
        ) {
          toast.error(
            "Invalid password. Please enter the correct password.",
            errorState
          );
        } else {
          toast.error(
            "An error occurred during login. Please try again later.",
            errorState
          );
        }
      }
    } catch (error: any) {
      toast.error(
        "An error occurred during login. Please try again later.",
        errorState
      );
    } finally {
      setLoading(false);
    }
  };

  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    setFieldTouched,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isValid) {
        await onLogin(values);
        resetForm();
      }
    },
  });

  const handleTouched = (field: string) => {
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
            Login to your account
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
                  onBlur={() => handleTouched("email")}
                  placeholder="rahul@xyz.com"
                  autoComplete="email"
                  required
                  className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    touched.email && errors.email
                      ? "text-white focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
                      : ""
                  }  `}
                />
                {touched.email && (
                  <p className="text-red-600 mt-2 text-sm">{errors.email}</p>
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
                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={() => handleTouched("password")}
                  placeholder="rahul@1999"
                  required
                  className={`w-full rounded-md border-5 bg-transparent/5 placeholder:text-black/30 border-gray-600 py-1.5 text-white shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
                    touched.password && errors.password
                      ? "text-white focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all"
                      : ""
                  }  `}
                />
                {touched.password && (
                  <p className="text-red-600 mt-2 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={onLogin}
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex items-center gap-2 w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting || Loading ? (
                  <>
                    Logging in...
                    <BiLoaderAlt className="text-lg animate-spin" />
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? &nbsp;
            <Link
              href="/signup"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
