"use client";

import { useRegisterMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const router = useRouter();

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Account Registered. You can login now");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    register(userData);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-[sans-serif] text-[#333] h-screen md:px-20 md:py-10">
      <div className="grid lg:grid-cols-2 gap-4 bg-gradient-to-r from-orange-300 to-orange-400 sm:p-8 p-4 h-[320px]">
        <div>
          <a href="javascript:void(0)">
            <img src="/images/logo.png" alt="logo" className="w-24" />
          </a>
          <div className="max-w-lg mt-16 px-6 max-lg:hidden">
            <h3 className="text-3xl font-bold text-white">Sign up</h3>
            <p className="text-sm mt-4 text-white">
              Embark on a seamless journey as you sign in to your account.
              Unlock a realm of opportunities and possibilities that await you.
            </p>
          </div>
        </div>
        <div className="bg-white my-4 rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form onSubmit={submitHandler}>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold">Sign up</h3>
            </div>
            <div className="sm:flex sm:items-start space-x-4 max-sm:space-y-4 mb-10">
              <button
                type="button"
                className="py-2.5 px-4 text-sm font-semibold rounded text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  className="inline mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>

            <div>
              <label htmlFor="name_field" className="text-sm mb-2 block">
                {" "}
                Full Name{" "}
              </label>

              <input
                type="text"
                id="name_field"
                className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 mb-2"
                name="name"
                placeholder="Enter user name"
                value={name}
                onChange={onChange}
              />

              <label className="text-sm mb-2 block" htmlFor="email_field">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="email_field"
                className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 mb-2"
                name="email"
                placeholder="Enter user email"
                value={email}
                onChange={onChange}
              />

              <label className="text-sm mb-2 block" htmlFor="password_field">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password_field"
                className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 mb-5"
                name="password"
                placeholder="Enter user password"
                value={password}
                onChange={onChange}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[var(--btn-color)] hover:bg-orange-700 focus:outline-none"
            >
              {isLoading ? <ButtonLoader /> : "Register"}
            </button>
            <p className="text-sm mt-6 text-center">
              Already have an account{" "}
              <a
                href="/login"
                className="text-[var(--primary-color)] font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
