/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAuthStore } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Errors } from "../components/Errors";


const RegisterPage: React.FC = () => {
    const register = useAuthStore((state) => state.register);
    const errors = useAuthStore((state) => state.errors);
    const isAuth = useAuthStore((state) => state.isAuth);
    const getProfile = useAuthStore((state) => state.getProfile);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fullName = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const email = (e.currentTarget.elements[1] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[2]as HTMLInputElement).value;
    
        await register({ fullName, email, password });
        await getProfile();
      };
    
      useEffect(() => {
        if (isAuth) navigate("/Home");
      }, [isAuth]);
    
    return (
        <div className="flex h-[calc(100vh-150px)] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="container"
      >
        <h1 className="text-white text-center">Register</h1>
        {errors && <Errors errors={errors} />}

        <div className="container">
          <div className="row container mt-3 mb-5">
          <label htmlFor="fullname">FullName:</label>
        <input
          type="text"
          placeholder="Ryan Ray"
          className="myLoginInput"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="user@email.com"
          className="myLoginInput"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="********"
          className="myLoginInput"
        />
          </div>
        </div>
        <div className="loginButtonContainer mb-5">
          <button className="btn">
          <strong>SIGN UP</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        </div>
        <p className="text-center text-white">
          Already Have an Account?{" "}
          <Link to="/login" className="text-indigo-100 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
    );
};

export default RegisterPage;