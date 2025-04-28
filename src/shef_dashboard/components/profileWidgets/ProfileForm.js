import React, { useState, useRef, useEffect, useMemo } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import {
  handleShowProfile,
  handleUpdateAddress,
  handleUpdateProfile,
} from "../../../frontend/auth/Auth";
import { updateUser } from "../../../store/slice/user";
import { toast } from "react-toastify";
import isValidURL from "../../../ValidateUrl";

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const libraries = useMemo(() => ["places"], []); // Array of required libraries

  const [isPending, setIsPending] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bio: "",
    profile_pic: "",
    cover_pic: "",
  });

  // contain the image file to be uploaded on server
  const [imageToUpload, setImageToUpload] = useState({
    profile: "",
    cover: "",
  });
  const [coords, setCoords] = useState({
    longitude: "",
    latitude: "",
  });
  const [address, setAddress] = useState("");
  //    const [city, setCity] = useState('')
  //    const [country, setCountry] = useState('')
  //    const [zipCode, setZipCode] = useState('')

  const { authToken } = useSelector((state) => state.user);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: libraries,
  });

  // geolocation - getting latitude & longitude
  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          // Use these coordinates for reverse geocoding
          //   getCityCountryZipFromCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }

    // eslint-disable-next-line
  }, [isLoaded, coords.latitude, coords.longitude]);

  // Triger show-profile after updating profile
  const [ shouldReload, setShouldReload ] = useState(false);
  // fetch user - (show-profile)
  useEffect(() => {
    (async () => {
      const response = await handleShowProfile(authToken);
      // console.log("show profile data ", response);
    
      if (response) {
        localStorage.setItem("user", JSON.stringify(response)); //update user in local-storage
        dispatch(updateUser(response));
        setProfileData(response);
        if(response.user_addresses.length>0){
          const { address } =
            response?.user_addresses[response.user_addresses.length - 1];
            setAddress(address)
        } else {
          setAddress("")
        }
        
      }
      // const {address} = filteredData.user_addresses[filteredData.user_addresses.length-1];
      // setProfileData(filteredData)
      // localStorage.setItem("user", JSON.stringify(filteredData)); //update user in local-storage
      // dispatch(updateUser(filteredData))                          // to instantly update user in redux-store.
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
      formData.append("bio", profileData.bio);
      if (imageToUpload.profile) {
        formData.append("profile_pic", imageToUpload.profile);
      }
      if (imageToUpload.cover) {
        formData.append("cover_pic", imageToUpload.cover);
      }

      //--- Update address - Form-data
      const addressFormData = new FormData();
      addressFormData.append("name", profileData.first_name);
      addressFormData.append("phone", profileData.phone);
      addressFormData.append("address", address);
      // not required for now
      // if(!coords.latitude){
      //     toast.error("Please Allow Location")
      //     return;
      // }
      addressFormData.append("longitude", coords.longitude);
      addressFormData.append("latitude", coords.latitude);

      //--- api calling
      const response = await handleUpdateProfile(authToken, formData);
      const addressResponse = await handleUpdateAddress(
        authToken,
        addressFormData
      );

      //--- Update address resposne handling
      setAddress(addressResponse.address);
      const { latitude, longitude } = addressResponse; // Destructure the co-ordinates
      if (latitude && longitude) {
        setCoords({ latitude, longitude });
      }

      //--- Update User Profile response handling
      // const filteredData = Object.fromEntries(Object.entries(response).filter(([_, v]) => v != null)); // null values are removed
      // setProfileData(filteredData)                                // update current page
      // localStorage.setItem("user", JSON.stringify(filteredData)); //update user in local-storage
      // dispatch(updateUser(filteredData))
      toast.success("Profile Updated");
      setShouldReload(prev => !prev)
      // window.location.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };
  // Image File
  const fileInputRef = useRef(null);
  const coverFileInputRef = useRef(null);

  // cover
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageToUpload((prev) => ({
        ...prev,
        cover: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        // Set the selected image in state
        setProfileData({ ...profileData, cover_pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCoverBoxClick = () => {
    if (coverFileInputRef.current) {
      coverFileInputRef.current.click();
    }
  };

  // profile
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageToUpload((prev) => ({
        ...prev,
        profile: file,
      }));
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

  if (!isLoaded) return <div></div>;
  return (
    <>
      <div className="p-5 rounded-xl border border-borderClr mb-6">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
          Profile Info
        </h2>
        <form onSubmit={handleOnSubmit}>
          {/* Image container  */}
          <div className="flex gap-4 flex-wrap flex-col">
            {/* Cover image */}
            <div className="">
              <div
                className="w-full h-[140px] sm:h-[200px] border border-borderClr rounded-lg overflow-hidden relative cursor-pointer"
                onClick={handleCoverBoxClick}
              >
                {/* selectedImage */}
                {profileData.cover_pic && isValidURL(profileData.cover_pic) ? (
                  <img
                    src={profileData.cover_pic}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-center flex items-center justify-center text-sm text-[#777] h-full">
                    Click to add Cover
                  </p>
                )}
              </div>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                ref={coverFileInputRef}
                style={{ display: "none" }}
              />
              <h3 className="text-base font-semibold mb-1 uppercase mt-1">
                Upload Your Cover
              </h3>
            </div>

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
                placeholder="+92xxxxxxxxxx"
                id=""
                name="phone"
                onChange={handleProfileDataChange}
                value={profileData.phone}
                required
              />
            </div>

            <div className="col-span-12">
              <h4 className="text-base font-semibold mb-1 uppercase">
                Address <span className="text-primary">*</span>{" "}
              </h4>
              <Autocomplete>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Adress"
                />
              </Autocomplete>
            </div>

            {/* <div className='md:col-span-4 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>City <span className='text-primary'>*</span></h4>
                            <Autocomplete> 
                                <input 
                                    type="text" name="city" 
                                    id="city" placeholder='Enter City' 
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}
                                />
                            </Autocomplete>
                        </div>       */}

            {/* <div className='md:col-span-4 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Zip Code </h4>        
                            <input 
                                type="text" placeholder='Enter Zip Code' 
                                id='' name='zip_code'
                                value={zipCode}
                                onChange={(e)=>setZipCode(e.target.value)} 
                            />
                        </div>  */}

            {/* <div className='md:col-span-4 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Country <span className='text-primary'>*</span></h4>
                            <Autocomplete>
                                <input 
                                    type="text" name="country" 
                                    id="country" placeholder='Enter Country' 
                                    value={country}
                                    onChange={(e)=>setCountry(e.target.value)}
                                />
                            </Autocomplete>
                        </div> */}

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

            <div className="col-span-12">
              <h4 className="text-base font-semibold mb-1 uppercase">
                Bio {/*<span className='text-primary'>*</span>*/}{" "}
              </h4>
              <textarea
                name="bio"
                id="bio"
                className="h-[70px]"
                onChange={handleProfileDataChange}
                value={profileData.bio}
                placeholder="Enter Bio"
              />
            </div>

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
    </>
  );
};
export default ProfileForm;
