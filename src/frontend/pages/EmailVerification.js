import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  handleEmailVerification,
  handleResendEmailVerificationLink,
} from "../auth/Auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slice/user";

const EmailVerification = () => {
  const [isPending, setIsPending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");

  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const dispatch =  useDispatch();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setIsPending(true);
        toast.dismiss();
        const queryParams = getQueryParams(location.search);
        const expires = queryParams.get("expires");
        const hash = queryParams.get("hash");
        const signature = queryParams.get("signature");

        if (!expires || !hash || !signature) {
          throw new Error(
            "Invalid or expired link. Please try again or request a new one."
          );
        }

        const response = await handleEmailVerification({
          id,
          expires,
          hash,
          signature,
        });
        toast.success(
          response.message ||
            "Your email has been successfully verified. You can now log in."
        );

        setIsVerified(true);
        if(response.status === 200){
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("auth", response.data.access_token);
          dispatch(loginUser(response)); // To update user in store instantly
          navigate("/");
        }
      } catch (error) {
        toast.error(error.message);
        setIsVerified(false);
      } finally {
        setIsPending(false);
      }
    };

    verifyEmail();

    // eslint-disable-next-line
  }, []);

  // const validateEmail = (email) => {
  //   const regex =
  //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|co|info|io|pk)$/;
  //   return regex.test(email);
  // };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const onResendVerificationLinkSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateEmail(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      const response = await handleResendEmailVerificationLink(email);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message);
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

  if (!isVerified && !isPending) {
    return (
      // <div className="flex flex-col justify-center items-center h-[100vh] w-full font-semibold text-xl">
      //   <h5>Couldn't verify the user or the link might have expired.</h5>
      <div className="bg-white h-[100vh] flex justify-center items-center">
        <div className="flex justify-center max-w-[500px] w-[280px] sm:w-[50%] shadow-2xl min-h-20 px-6 py-8 -mt-10 rounded-md">
          <form onSubmit={onResendVerificationLinkSubmit} className="w-full">
            <div className="w-full mb-8 flex gap-2 gap-y-4 flex-wrap items-center">
              {/* Back Button */}
              <div
                className="cursor-pointer"
                onClick={() => navigate("/login", { replace: true })}
              >
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
                    <h1 className="text-lg font-semibold mb-0">To Login</h1>
                  </div>
                </div>
              </div>
              <img
                src="/media/frontend/img/logo/line-logo.jpg"
                className="object-cover h-10 block mx-auto"
                alt="Logo"
              />
            </div>

            <h5 className="font-semibold text-xl mb-2">
              Resend Verification Email
            </h5>
            <p className="mb-5">
              Please enter your email to resend verification email
            </p>

            <div className="flex flex-col gap-1 my-1">
              <label htmlFor="password">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                type="email"
                className="border rounded px-2 py-1"
                required
                id="email"
                placeholder="john@example.com"
              />
            </div>

            <button
              disabled={isPending}
              type="submit"
              className="mt-6 w-full bg-primary text-white uppercase px-6 py-2 font-semibold rounded-lg disabled:cursor-not-allowed disabled:opacity-60 hover:bg-primaryDark transition"
            >
              {isPending ? "Processing..." : "Resend Link"}
            </button>
          </form>
        </div>
        {/* <Link to={"/login"}>Back to Login</Link> */}
      </div>
    );
  }
};

export default EmailVerification;
