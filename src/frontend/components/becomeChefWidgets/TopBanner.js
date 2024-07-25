import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleChefSignUp } from "../../auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../../store/slice/user";
const TopBanner = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // zip_code: "",
    phone: "",
    profile_pic: "",
    cover_pic: "",
    is_chef: 1,
  });
  // For user to see formatted phone number 
  const [formattedPhone, setFormattedPhone] = useState("")

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Validate the phone number length (exactly 13 characters)
      // console.log("value length ", value.length, formData.phone.length);
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
        (formData.phone[0] && formData.phone[0] !== "+") ||
        (formData.phone[1] && formData.phone[1] !== "9") ||
        (formData.phone[2] && formData.phone[2] !== "2")
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
      // console.log("only number in top banner ", onlyNumbers)
      // for payload
      setFormData({
        ...formData,
        [name]: onlyNumbers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const handleChange = (e) => {
  //   // setFormData({ ...formData, [e.target.name]: e.target.value });
  //   const { name, value } = e.target;

  //   if (name === "phone") {
  //     // Validate the phone number length (exactly 13 characters)
  //     if (value.length > 13) {
  //       setError("Phone number must be exactly 13 characters long.");
  //       setTimeout(()=>{
  //         setError('')
  //       }, [1500])
  //       return;
  //     }
      
  //     // Validate the phone number format
  //     const isValidPhone = /^[+]?[\d]*$/.test(value);
  //     if (!isValidPhone) {
  //       setError(
  //         "Phone number can only contain numbers and must start with +."
  //       );
  //       return;
  //     }

  //     if (
  //       (value[0] && value[0] !== "+") ||
  //       (value[1] && value[1] !== "9") ||
  //       (value[2] && value[2] !== "2")
  //     ) {
  //       setError("Phone number must start with +92 ", value[1]);
  //       return;
  //     }

  //     // Clear error if the phone number is valid
  //     setError("");

  //     // Set the formatted phone number
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  // image handling
  const fileInputRef = useRef(null);
  const profileDiv = useRef(null);
  const coverImageRef = useRef(null);
  const [isProfile, setIsProfile] = useState(""); // hold image as a url to review
  //profile preview box
  const handleBoxClick = () => {
    // Trigger click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // Handling image upload
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_pic: file }));
      const reader = new FileReader();
      reader.onload = () => {
        // Set the selected image in state
        setIsProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cover_pic: file }));
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.user);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      toast.dismiss();
      if (!formData.profile_pic) {
        profileDiv.current.focus();
        toast.error("Profile is required");
        return;
      }
      if (!formData.cover_pic) {
        coverImageRef.current.focus();
        toast.error("Cover is required");
        return;
      }
      
      await handleChefSignUp(formData);
      // console.log("reponse ", response)
      if (authToken) {
        dispatch(signOutUser());
      }
      toast.success("Register Successfully ");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <div className="become_aChef">
        <div className="py-16 lg:px-2 px-4">
          <div className="container mx-auto">
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-12 md:gap-x-10 gap-x-0">
                <div className="lg:col-span-7 col-span-12 lg:order-1 order-2">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2 ">
                    {/* Profile */}
                    <div className="form-group md:col-span-2">
                      <div className="">
                        <div
                          tabIndex="-1"
                          ref={profileDiv}
                          className={`w-[140px] h-[140px] border border-borderClr rounded-lg overflow-hidden relative cursor-pointer ${
                            !formData.profile_pic && "focus:border-primary"
                          } focus:border-2`}
                          onClick={handleBoxClick}
                        >
                          {/* selectedImage */}
                          {isProfile ? (
                            <img
                              src={isProfile}
                              alt="Selected"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <p className="text-center flex items-center justify-center text-sm text-white h-full">
                              Click to add Profile
                            </p>
                          )}
                        </div>
                        {/* Hidden file input */}
                        <input
                          type="file"
                          name="profile_pic"
                          // required
                          accept="image/*"
                          onChange={handleProfileChange}
                          ref={fileInputRef}
                          style={{ display: "none" }}
                        />
                        <h3 className="text-base font-semibold mb-1 text-white uppercase mt-2">
                          Upload Your Profile
                        </h3>
                      </div>
                    </div>
                    {/* Cover */}
                    <div className="form-group">
                      <label
                        className="block mb-1 font-semibold text-sm font-medium text-white"
                        htmlFor="file_input"
                      >
                        Upload Cover
                      </label>
                      <input
                        ref={coverImageRef}
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none py-2 focus:bg-gray-100 focus:border-2"
                        id="file_input"
                        type="file"
                      />
                    </div>

                    <div className="form-group self-end">
                      <input
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        type="text"
                        name="first_name"
                        className=""
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        type="text"
                        name="last_name"
                        className=""
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        name="email"
                        className=""
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="form-group">
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        required
                        type="password"
                        name="password"
                        className=""
                        placeholder="Password"
                      />
                    </div>
                    {/* <div className="form-group">
                      <input
                        value={formData.zip_code}
                        onChange={handleChange}
                        required
                        type="text"
                        name="zip_code"
                        className=""
                        placeholder="Zip Code"
                      />
                    </div> */}
                    <div className="form-group">
                      <input
                        value={formattedPhone}
                        onChange={handleChange}
                        required
                        type="text"
                        name="phone"
                        className=""
                        placeholder="(+92) xxxxxxxxxx"
                      />
                      {error && (
                        <div className="bg-[#ff1c1c31] mt-1 text-red-200 py-1 px-1 text-[12px] font-semibold ">
                          {error} {/* Close button */}
                          {/* <button
                            type="button"
                            class="ms-auto -mx-1.5 -my-1.5  rounded-lg p-1.5 hover:text-primaryDark inline-flex items-center justify-center h-6 w-6 "
                            onClick={() => setError("")}
                          >
                            <span class="sr-only">Close</span>
                            <svg
                              class="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                          </button>{" "} */}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex mt-3 gap-1">
                    <div className="">
                      <input className="mt-1 mr-2" type="checkbox" required />
                    </div>
                    <div className="w-[93%]">
                      <p className="text-white ">
                        I agree to Shef's&nbsp;
                        <Link to="/terms-of-servies" className="!underline">
                          Terms of Service
                        </Link>
                        ,&nbsp; and to receive marketing text messages.
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-3 gap-1">
                    <div className="">
                      <input className="mt-1 mr-2" type="checkbox" required />
                    </div>
                    <div className="w-[93%]">
                      <p className="text-white">
                        I acknowledge and agree that I am an independent
                        business and authorized to earn income in the United
                        States.
                      </p>
                    </div>
                  </div>
                  <div className="my-2">
                    <button disabled={error} className="grid-row-s rounded-md py-2 px-8 text-base font-semibold whitespace-nowrap bg-primary text-white hover:text-green-400 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed">
                      Submit
                    </button>
                  </div>
                </div>
                {/* Form End */}

                <div className="lg:col-span-5 col-span-12 my-auto lg:order-2 order-1">
                  <div className="lg:text-start text-center">
                    <h1 className="font-semibold sm:text-5xl text-4xl md:leading-tight leading-snug uppercase text-white tracking-wider tracking-widest">
                      Make money doing what you love
                    </h1>
                    <div className="w-[80px] h-[2px] bg-primary my-6 lg:mx-0 mx-auto"></div>
                    <h3 className="alexBrush text-3xl text-headGray hidden">
                      Start your experience
                    </h3>
                    <div className="w-full">
                      <p className="text-xl text-white lg:mb-4 mb-8 mt-5">
                        We give you the tools to run your own food business, on
                        your terms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBanner;
