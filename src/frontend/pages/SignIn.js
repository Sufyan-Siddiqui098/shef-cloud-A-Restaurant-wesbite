import React, { useEffect, useState } from "react";
import "../assets/css/main-style.css";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { handleFacebookLogin, handleForgetPassword, handleUserLogin } from "../auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slice/user";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Modal from "react-modal";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const backgroundStyle = {
    backgroundImage: 'url("./media/frontend/img/banner/banner-2.jpg")',
  };

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  // Input field - OnChnage
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.type]: e.target.value });
  };

  // Form submit
  const handleSubmit = async (e) => {
    try {
      setIsPending(true);
      e.preventDefault();
      const res = await handleUserLogin(credentials);
      dispatch(loginUser(res)); // To update user in store instantly
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  // Google OAuth - login with google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log(tokenResponse);
        // Getting user data
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // Forget Password Modal
  const [forgetPassword, setForgetPassword] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const onRequestClose = () => {
    setIsOpen(false);
  };
  const forgetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleForgetPassword(forgetPassword);
      if(response.message){
        toast(response.message)
        onRequestClose();
      }
      // console.log("reponse of forget password ", response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="position-relative h-[97vh] md:px-2 px-4">
        <div className="lg:w-2/3 w-full mx-auto h-full flex items-center my-auto py-5">
          <div className="authForm">
            <div className="grid grid-cols-12">
              <div className="md:col-span-6 col-span-12 md:order-1 order-2">
                <div className="form-container md:p-12 p-6 text-center">
                  <form action="#" onSubmit={handleSubmit}>
                    <h1 className="genHead mb-2">Sign in</h1>
                    <div className="w-[40px] h-[2px] bg-primary mx-auto my-3"></div>
                    <div className="formSocial py-3">
                      {/* Facebook */}
                      <Link onClick={handleFacebookLogin}>
                        <div className="link">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="rgba(236,32,68,1)"
                          >
                            <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"></path>
                          </svg>
                        </div>
                      </Link>
                      {/* Google */}
                      <Link onClick={handleGoogleLogin}>
                        <div className="link">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="rgba(236,32,68,1)"
                          >
                            <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
                          </svg>
                        </div>
                      </Link>
                      {/* Apple ID */}
                      <Link>
                        <div className="link">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                            fill="rgba(236,32,68,1)"
                          >
                            <path d="M11.6734 7.22198C10.7974 7.22198 9.44138 6.22598 8.01338 6.26198C6.12938 6.28598 4.40138 7.35397 3.42938 9.04597C1.47338 12.442 2.92538 17.458 4.83338 20.218C5.76938 21.562 6.87338 23.074 8.33738 23.026C9.74138 22.966 10.2694 22.114 11.9734 22.114C13.6654 22.114 14.1454 23.026 15.6334 22.99C17.1454 22.966 18.1054 21.622 19.0294 20.266C20.0974 18.706 20.5414 17.194 20.5654 17.11C20.5294 17.098 17.6254 15.982 17.5894 12.622C17.5654 9.81397 19.8814 8.46998 19.9894 8.40998C18.6694 6.47798 16.6414 6.26198 15.9334 6.21398C14.0854 6.06998 12.5374 7.22198 11.6734 7.22198ZM14.7934 4.38998C15.5734 3.45398 16.0894 2.14598 15.9454 0.849976C14.8294 0.897976 13.4854 1.59398 12.6814 2.52998C11.9614 3.35798 11.3374 4.68998 11.5054 5.96198C12.7414 6.05798 14.0134 5.32598 14.7934 4.38998Z"></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
                    <div className="orTxt mb-3">or</div>
                    <input
                      value={credentials.email}
                      onChange={handleChange}
                      required
                      className="mb-3"
                      type="email"
                      placeholder="john@example.com"
                    />
                    <input
                      value={credentials.password}
                      onChange={handleChange}
                      required
                      className="mb-3"
                      type="password"
                      placeholder="Password"
                    />
                    <div className="forgotTxt">
                      <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="hover:underline mr-2 "
                      >
                        {" "}
                        Forgot your password?
                      </button>
                      {/* &nbsp; */}
                      <Link className="font-semibold" to="/register">
                        Sign up
                      </Link>
                    </div>
                    <button
                      disabled={isPending}
                      className="mt-3 fillBtn disabled:cursor-not-allowed disabled:opacity-60"
                      type=""
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:col-span-6 col-span-12 md:order-2 order-1">
                <div
                  className="authImgSide lg:py-0 py-24"
                  style={backgroundStyle}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forget Password Modla  */}
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Reviews"
        style={{
          content: {
            height: "max-content",
            top: "20%",
            maxWidth: "max-content",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <div className="">
          {/* Modal content here */}
          <div className="flex items-center justify-between border-b pb-3 gap-3">
            <h2 className="text-lg font-semibold leading-tight mb-0">
              Reset Your Password
            </h2>
            <button onClick={onRequestClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(0,0,0,1)"
              >
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={forgetPasswordSubmit} className=" mt-8 " action="">
            <p className="text-xs sm:text-base">
              {" "}
              Enter your user account's email address and new password.
            </p>
            <input
              value={forgetPassword.email}
              onChange={(e) =>
                setForgetPassword((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              className="my-1"
              type="email"
              required
              name="email"
              placeholder="Enter your email address"
            />
            <input
              value={forgetPassword.password}
              onChange={(e) =>
                setForgetPassword((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              minLength={8}
              className="my-1"
              type="password"
              name="password"
              id="password"
              placeholder="Enter new Password"
            />
            <input
              value={forgetPassword.password_confirmation}
              onChange={(e) =>
                setForgetPassword((prev) => {
                  return { ...prev, password_confirmation: e.target.value };
                })
              }
              minLength={8}
              className={`my-1 mb-4 ${
                forgetPassword.password_confirmation?.length > 0 &&
                forgetPassword.password?.length > 0 &&
                forgetPassword.password_confirmation !== forgetPassword.password &&
                "bg-red-100"
              }`}
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              placeholder="Confirm Password"
            />
            <button
              disabled={
                forgetPassword.email?.length < 1 ||
                forgetPassword.password_confirmation?.length < 8 ||
                forgetPassword.password?.length < 8 ||
                forgetPassword.password_confirmation !== forgetPassword.password
              }
              type="submit"
              className="my-6  bg-primary text-white text-lg w-full uppercase px-6 py-2 font-semibold rounded-lg disabled:cursor-not-allowed disabled:opacity-60 mt-auto"
            >
              Confirm
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SignIn;
