import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleForgetTokenVerification, handlePostResetPassword } from "../auth/Auth"; // You should verify the token with an API call here
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState({
    password: "",
    password_confirmation: "",
    id: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsPending(true);
        toast.dismiss();
        const queryParams = getQueryParams(location.search);
        const token = queryParams.get("token");

        if (!token) {
          throw new Error("Token is missing");
        }

        setToken(token);
        // Verify token using an API call here
        const response = await handleForgetTokenVerification(token);
        if (!response.success) throw new Error("Invalid token");
        // --- user id
        setResetPassword((prev) => ({
          ...prev,
          id: response.id,
        }))

        setIsVerified(true);
      } catch (error) {
        toast.error(error.message || "Couldn't verify user");
      } finally {
        setIsPending(false);
      }
    };

    verifyToken();
  }, [location.search]);

  const onResetPassword = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      toast.dismiss();

      if (resetPassword.password !== resetPassword.password_confirmation) {
        toast.error("Passwords do not match");
        return;
      }

      // Call the reset password API
      const res = await handlePostResetPassword(token, resetPassword);

      if (res.success) {
        toast.success("Password reset successful");
        navigate("/login");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsPending(false);
    }
  };

  // Show loading message while verifying token
  if (!isVerified && isPending) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-full font-semibold text-xl">
        Verifying User...
      </div>
    );
  }

  // Show error if token is invalid or verification failed
  if (!isVerified && !isPending) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh] w-full font-semibold text-xl">
        <h5>Couldn't verify the user or the link might have expired.</h5>
        <Link to={"/login"}>Back to Login</Link>
      </div>
    );
  }

  return (
    <div className="bg-white h-[100vh] flex justify-center items-center">
      <div className="flex justify-center max-w-[500px] w-[280px] sm:w-[50%] shadow-2xl min-h-20 px-6 py-8 -mt-10 rounded-md">
        <form onSubmit={onResetPassword} className="w-full">
          <div className="w-full mb-8 flex gap-2 gap-y-4 flex-wrap items-center">
            {/* Back Button */}
            <div className="cursor-pointer" onClick={() => navigate("/login", {replace: true})}>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="rgba(0,0,0,1)"
                >
                  <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                </svg>
                <div>
                  <h1 className="text-lg font-semibold mb-0">Back</h1>
                </div>
              </div>
            </div>
            <img
              src="/media/frontend/img/logo/line-logo.jpg"
              className="object-cover h-10 block mx-auto"
              alt="Logo"
            />
          </div>

          <h5 className="font-semibold text-xl mb-2">Reset Password</h5>
          <p className="mb-5">Please enter your new password</p>

          <div className="flex flex-col gap-1 my-1">
            <label htmlFor="password">New Password</label>
            <input
              value={resetPassword.password}
              onChange={(e) =>
                setResetPassword((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              minLength={8}
              type="password"
              className="border rounded px-2 py-1"
              required
              id="password"
              placeholder="New Password"
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              value={resetPassword.password_confirmation}
              onChange={(e) =>
                setResetPassword((prev) => ({
                  ...prev,
                  password_confirmation: e.target.value,
                }))
              }
              minLength={8}
              type="password"
              className="border rounded px-2 py-1"
              required
              id="password_confirmation"
              placeholder="Confirm Password"
            />
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="mt-6 w-full bg-primary text-white uppercase px-6 py-2 font-semibold rounded-lg disabled:cursor-not-allowed disabled:opacity-60 hover:bg-primaryDark transition"
          >
            {isPending ? "Processing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
