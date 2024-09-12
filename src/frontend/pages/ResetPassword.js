import React, { useState } from "react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const onResetPassword = (e) => {
    try {
      e.preventDefault();
      if (resetPassword.confirm_password !== resetPassword.new_password) {
        toast.error("Confirm Password doesn't match with New Password");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-whte h-[100vh] flex justify-center items-center">
      <div className=" flex justify-center max-w-[500px] w-[280px] sm:w-[50%] shadow-2xl min-h-20 px-6  py-8 -mt-10 rounded-md">
        <form onSubmit={onResetPassword} className=" w-full " action="">
          <div className="w-full flex justify-center  mb-8">
            <img
              src="/media/frontend/img/logo/line-logo.jpg"
              className="object-cover h-10"
              alt=""
            />
          </div>

          <h5 className="font-semibold tracking-wide text-xl mb-2">
            Reset Password{" "}
          </h5>

          <p className="my1 text-headGray mb-5">
            Please Enter your new password
          </p>

          <div className="flex flex-col gap-1 my-1">
            <label className="" htmlFor="new_password">
              New Password
            </label>
            <input
              value={resetPassword.new_password}
              onChange={(e) =>
                setResetPassword((prev) => {
                  return { ...prev, new_password: e.target.value };
                })
              }
              type="password"
              className=""
              required
              name=""
              id="new_password"
              placeholder="New Password"
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              value={resetPassword.confirm_password}
              onChange={(e) =>
                setResetPassword((prev) => {
                  return { ...prev, confirm_password: e.target.value };
                })
              }
              type="password"
              required
              name=""
              id="confirm_password"
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="submit"
            className="mt-6 my-2 text-base w-max bg-primary text-white uppercase px-6 py-2 font-semibold rounded-lg disabled:cursor-not-allowed disabled:opacity-60 hover:bg-primaryLight hover:text-cyan-900  hover:border transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
