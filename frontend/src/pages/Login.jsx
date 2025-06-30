import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate);
  };

  if (loading) {
    return <h1 className="text-center mt-10 text-2xl">Loading....</h1>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[140px]">
        <div className="w-full md:w-3/4">
          <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
            <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
              Login to Facebook
            </h1>
          </div>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
              <input
                type="email"
                className="custom-input"
                placeholder="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="custom-input"
                placeholder="User Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center mt-7">
              <button className="auth-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="h-full w-full md:w-1/3 bg-gradient-to-l from-blue-400 to-yellow-400 flex items-center justify-center">
          <div className="text-white text-base font-semibold text-center my-10 space-y-4 m-2">
            <h1>Don't have an account?</h1>
            <Link
              to="/register"
              className="bg-white rounded-2xl px-4 py-1 text-emerald-500 hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
