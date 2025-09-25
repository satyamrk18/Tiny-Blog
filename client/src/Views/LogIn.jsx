import Navbar from "../Components/Navbar";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const logIn = ()=>
{
    const loginUser = async ()=>
    {

    }
    return(
        <div>
      <Navbar />
         <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
      <form className="w-80 p-6 m-auto mt-6 flex flex-col gap-5 border-2 rounded-2xl">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 rounded-xl w-full"
          autoComplete="email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 rounded-xl w-full"
          autoComplete="current-password"
          required
        />

        <button
          type="button"
          className="m-auto border-2 p-2 rounded-2xl w-full cursor-pointer"
          onClick={() => {
            loginUser();
          }}
        >
          Log In
        </button>

        <p className="text-sm text-center">
          Dont have an account ?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            sign up
          </Link>
        </p>
      </form>
    </div>
    )
}
export default logIn;