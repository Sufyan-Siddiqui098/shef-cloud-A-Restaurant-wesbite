import React, { useEffect, useState } from "react";
import "../assets/css/main-style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleUserSignUp } from "../auth/Auth";
import { toast } from "react-toastify";
import Header from "../components/Header";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    phone: "",
    first_name: "",
    last_name: "",
  });

  // For user to see formatted phone number 
  const [formattedPhone, setFormattedPhone]= useState('')
  const [isPending, setIsPending] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // phone validation error
  const [error, setError] = useState("");
  
  // Input field - OnChnage
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Validate the phone number length (exactly 13 characters)
      // console.log("value length ", value.length, credentials.phone.length);
      if (value.length > 16 ) {
        setError("Phone number must be exactly 13 characters long.");
        setTimeout(() => {
          setError("");
        }, [1500]);
        return;
      }

      // Validate the phone number format
      const isValidPhone = /^\(?\+\d*\)?\s?\d*$/.test(value);
      if (!isValidPhone) {
        setError(
          "Phone number can only contain numbers and must start with +92."
        );
        return;
      }

      if (
        value.length < 3 &&
        ((value[0] && value[0] !== "+") ||
          (value[1] && value[1] !== "9") ||
          (value[2] && value[2] !== "2"))
      ) {
        setError("Phone number must start with +92 ", value[1]);
        return;
      } else if (
        (credentials.phone[0] && credentials.phone[0] !== "+") ||
        (credentials.phone[1] && credentials.phone[1] !== "9") ||
        (credentials.phone[2] && credentials.phone[2] !== "2")
      ) {
        setError("Phone number must start with +92 ", value[1]);
        return;
      }
      // format
      let formattedNumber = value;
      if (value.length === 3) {
        formattedNumber = `(+92) ${value.slice(3)}`;
      } else if(value.length===5 && value[0]==="(") {
        formattedNumber = `(+92) ${value.slice(5)}`
      }

      // Clear error if the phone number is valid
      setError("");

      // Set the formatted phone number
      setFormattedPhone(formattedNumber);
      const onlyNumbers = formattedNumber.replace(/[^+\d]/g, '');
      // console.log("only number ", onlyNumbers)
      // for payload
      setCredentials({
        ...credentials,
        [name]: onlyNumbers,
      });
    } else {
      setCredentials({
        ...credentials,
        [name]: value,
      });
    }
  };
  
  // Form submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsPending(true);
      const res = await handleUserSignUp(credentials);
      // if(res.email) {
      toast.success(res.message || "Register Successfully");
      navigate("/login");
      // }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const backgroundStyle = {
    backgroundImage: 'url("./media/frontend/img/banner/collection-1.jpg")',
  };
  return (
    <>
    <Header/>
      <div className="position-relative h-[97vh] md:px-2 px-4">
        <div className="lg:w-2/3 w-full mx-auto h-full flex items-center my-auto py-5">
          <div className="authForm">
            <div className="grid grid-cols-12">
              <div className="md:col-span-6 col-span-12 md:order-1 order-2">
                <div className="form-container md:p-12 p-6 text-center">
                  <h1 className="genHead text-center mb-4">Sign up</h1>
                  <div className="w-[40px] h-[2px] bg-primary mx-auto mb-6"></div>
                  <form action="#" onSubmit={handleSubmit}>
                    <input
                      className="mb-3"
                      value={credentials.email}
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                    <input
                      className="mb-3"
                      value={credentials.first_name}
                      onChange={handleChange}
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      required
                    />
                    <input
                      className="mb-3"
                      value={credentials.last_name}
                      onChange={handleChange}
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                    <div className="mb-3">

                        <input
                        className=""
                        value={formattedPhone}
                        onChange={handleChange}
                        name="phone"
                        type="text"
                        placeholder="(+92) xxxxxxxxxx"
                        required
                        />
                        {error && (
                        <div className="bg-[#ff1c1c31] mt-1 text-red-900 py-1 px-1 text-[12px] font-semibold text-start">
                            {error}
                        </div>
                        )}
                    </div>
                    <input
                      className="mb-3"
                      value={credentials.password}
                      onChange={handleChange}
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                    />
                    <div className="term">
                      <input className="mb-3" type="checkbox" required />
                      <p>
                        By selecting "Sign up" you agree to Shef's&nbsp;
                        <Link to="/terms-of-servies">Terms of Service</Link>
                        ,&nbsp;
                        <Link to="/privacy-policy">Privacy Policy</Link>, and to
                        receive text messages
                      </p>
                    </div>
                    <div className="forgotTxt">
                      Already have an account? &nbsp;
                      <Link className="font-semibold" to="/login">
                        Sign in
                      </Link>
                    </div>
                    <button
                      disabled={error || isPending}
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
    </>
  );
};

export default SignUp;
