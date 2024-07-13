import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import isValidURL from "../../ValidateUrl";
import { updateUser } from "../../store/slice/user";
import { handleShowProfile, handleUpdateProfile } from "../auth/Auth";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    // bio: "",
    profile_pic: "",
  });

  // contain the image file to be uploaded on server
  const [imageToUpload, setImageToUpload] = useState("");

  const { authToken } = useSelector((state) => state.user);

  // Triger show-profile after updating profile
  const [shouldReload, setShouldReload] = useState(false);
  const navigate = useNavigate();
  // fetch user - (show-profile)
  useEffect(() => {
    (async () => {
      const response = await handleShowProfile(authToken);
      if (response) {
        if (response.is_chef === 1 || response.is_admin === 1) {
          navigate("/shef/profile", { replace: true });
          return;
        }
        localStorage.setItem("user", JSON.stringify(response)); //update user in local-storage
        dispatch(updateUser(response));
        setProfileData(response);
      }
    })();
  }, [authToken, dispatch, shouldReload]);

  // On Change handler - profile data
  const handleProfileDataChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Update profile - ON SUBMIT
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsPending(true);
      // --- Update User detail - Form-data
      const formData = new FormData();
      formData.append("id", profileData.id);
      formData.append("first_name", profileData.first_name);
      formData.append("last_name", profileData.last_name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      if (imageToUpload) {
        formData.append("profile_pic", imageToUpload);
      }

      //--- api calling
      const response = await handleUpdateProfile(authToken, formData);

      toast.success("User Profile Updated");
      setShouldReload((prev) => !prev);
      // window.location.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  // Image File
  const fileInputRef = useRef(null);

  // profile
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageToUpload(file);
      const reader = new FileReader();
      reader.onload = () => {
        // Set the selected image in state
        setProfileData({ ...profileData, profile_pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBoxClick = () => {
    // Trigger click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-5">
        <div className="p-5 rounded-xl border border-borderClr mb-6">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4">
            Profile Info
          </h2>
          <form onSubmit={handleOnSubmit}>
            {/* Image container  */}
            <div className="flex gap-4 flex-wrap flex-col">
              {/* Profile */}
              <div className="">
                <div
                  className="w-[170px] h-[190px] border border-borderClr rounded-lg overflow-hidden relative cursor-pointer"
                  onClick={handleBoxClick}
                >
                  {/* selectedImage */}
                  {profileData.profile_pic &&
                  isValidURL(profileData.profile_pic) ? (
                    <img
                      src={profileData.profile_pic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-center flex items-center justify-center text-sm text-[#777] h-full">
                      Click to add Profile
                    </p>
                  )}
                </div>
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <h3 className="text-base font-semibold mb-1 uppercase mt-2">
                  Upload Your Profile
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-12 md:gap-x-8 gap-x-0 gap-y-4 mt-8">
              <div className="md:col-span-6 col-span-12">
                <h4 className="text-base font-semibold mb-1 uppercase">
                  First Name <span className="text-primary">*</span>
                </h4>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  id=""
                  name="first_name"
                  onChange={handleProfileDataChange}
                  value={profileData.first_name}
                  required
                />
              </div>

              <div className="md:col-span-6 col-span-12">
                <h4 className="text-base font-semibold mb-1 uppercase">
                  Last Name{" "}
                </h4>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  id=""
                  name="last_name"
                  onChange={handleProfileDataChange}
                  value={profileData.last_name}
                />
              </div>

              <div className="md:col-span-6 col-span-12">
                <h4 className="text-base font-semibold mb-1 uppercase">
                  Email <span className="text-primary">*</span>
                </h4>
                <input
                  type="email"
                  placeholder="Enter Email"
                  id=""
                  name="email"
                  readOnly
                  className="read-only:bg-gray-50 !border-headGray"
                  // onChange={handleProfileDataChange}
                  value={profileData.email}
                  required
                />
              </div>

              <div className="md:col-span-6 col-span-12">
                <h4 className="text-base font-semibold mb-1 uppercase">
                  Mobile Number <span className="text-primary">*</span>{" "}
                </h4>
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  id=""
                  name="phone"
                  onChange={handleProfileDataChange}
                  value={profileData.phone}
                  required
                />
              </div>

              {/* Temporary added */}
              {/* <div className='md:col-span-6 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Longitude </h4>
                            <input 
                                type="number" 
                                placeholder='Enter Longitude' 
                                id='' 
                                name='longitude'
                                onChange={(e) => setCoords({ longitude: parseFloat(e.target.value) })} 
                                value={coords.longitude}
                            />
                        </div>
                        <div className='md:col-span-6 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Latitude </h4>
                            <input 
                                type="number" 
                                placeholder='Enter Longitude' 
                                id='' 
                                min={0} 
                                step={0.01}
                                name='latitude'
                                onChange={(e) => setCoords({ latitude: parseFloat(e.target.value) })} 
                                value={coords.latitude}
                            />
                        </div> */}
              {/* Temporary - end */}

              {/* <div className="col-span-12">
              <h4 className="text-base font-semibold mb-1 uppercase">
                Bio {" "}
              </h4>
              <textarea
                name="bio"
                id="bio"
                className="h-[70px]"
                onChange={handleProfileDataChange}
                value={profileData.bio}
                placeholder="Enter Bio"
              />
            </div> */}

              <div className="md:col-span-6 mt-3 col-span-12  flex items-end">
                <button
                  disabled={isPending}
                  className="bg-primary text-white w-ful p-[4px_12px] rounded text-base font-semibold mb-1 uppercase disabled:opacity-60"
                  type=""
                >
                  Submit{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
