import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@material-tailwind/react";
import { useRouter } from "next/router";

function Signin() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  const handleChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log("SignIn res", userInfo);
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex items-center justify-center flex-col w-[500px] h-[600px] bg-white ">
        <h1 className="flex my-12 text-[26px] text-font">WORK MANAGER</h1>
        <h1 className="flex text-[26px] text-font">Sign in</h1>
        <div className="flex flex-col gap-10 mt-11 w-[70%]">
          <div className="form-control w-full max-w-2xl">
            <input
              className="input input-bordered w-full max-w-lg"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-control w-full max-w-2xl">
            <input
              className="input input-bordered w-full max-w-lg"
              variant="outlined"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-md text-white "
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
