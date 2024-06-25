import React, { useState, useRef, useEffect, useMemo } from 'react'
import {useJsApiLoader, Autocomplete} from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux';
import { handleShowProfile, handleUpdateAddress, handleUpdateProfile } from '../../../frontend/auth/Auth';
import { updateUser } from '../../../store/slice/user';
import { toast } from 'react-toastify';

export const ProfileForm = () => {
    const dispatch = useDispatch();
    const libraries = useMemo(() => ['places'], []); // Array of required libraries

    const [ isPending , setIsPending ] = useState(false);
    const [profileData, setProfileData] = useState({
        id: "",
        first_name: "", 
        last_name: "", 
        email: "",
        phone: "", 
        bio: "", 
        profile_pic: "",
    });
    const [profileToUpload, setProfileToUpload] = useState("") // contain the image file to be uploaded on server
   const [coords, setCoords] = useState({
    longitude: "", 
    latitude: ""
   })
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [country, setCountry] = useState('')
   const [zipCode, setZipCode] = useState('')

   const {authToken} = useSelector((state)=>state.user)

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCKU3ow8iRNEBhi1St_gMdG5Tn7_Vf3Wzo",
        libraries: libraries
    })

    // function getCityCountryZipFromCoords(latitude, longitude) {
    //     const geocoder = new window.google.maps.Geocoder();
    //     geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
    //       if (status === 'OK') {
    //         if (results[0]) {
    //           const { address_components } = results[0];
    //           const local = address_components.reduce((acc, component) => {
    //             const { types } = component;
    //             if(types.includes("premise")){
    //                 acc.address = component.long_name;
    //             }
    //             if(types.includes("sublocality")){
    //                 acc.address += ", " + component.long_name;
    //             } else if (types.includes('country')) {
    //               acc.country = component.long_name;
    //             } else if (types.includes('locality')) {
    //               acc.locality = component.long_name;
    //             } else if (types.includes('postal_code')) {
    //               acc.postal_code = component.long_name;
    //             }
    //             return acc;
    //           }, {});
    //           // IF address is empty
    //          if(!address){
    //              setAddress(local.address)
    //          }
    //           setCity(local.locality)
    //           setCountry(local.country)
              
    //           setZipCode(local.postal_code? local.postal_code: "");
    //           // Update your component state or display the data
    //         } else {
    //           console.warn('No results found');
    //         }
    //       } else {
    //         console.error('Geocode was not successful:', status);
    //       }
    //     });
    // }
      
    // geolocation - getting latitude & longitude
    useEffect(()=>{
        if (navigator.geolocation && isLoaded) {
            navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              setCoords({latitude, longitude})
              // Use these coordinates for reverse geocoding
            //   getCityCountryZipFromCoords(latitude, longitude);
            }, (error) => {
              console.error('Error getting location:', error.message);
            });
          } else {
            console.warn('Geolocation is not supported by this browser.');
          }
          
          // eslint-disable-next-line
    },[isLoaded, coords.latitude, coords.longitude])  

    // fetch user - (show-profile)
    useEffect(()=>{
        (async()=>{
            const response =await handleShowProfile(authToken);
            //Object.entries - creates array from object && Object.entries - create an object from array
            const filteredData = Object.fromEntries(Object.entries(response).filter(([_, v]) => v != null));
            // console.log("filetered", filteredData)
            const {address} = filteredData.user_addresses[filteredData.user_addresses.length-1];
            setAddress(address);
            setProfileData(filteredData)
            localStorage.setItem("user", JSON.stringify(filteredData)); //update user in local-storage
            dispatch(updateUser(filteredData))                          // to instantly update user in redux-store.
        })()

    }, [authToken, dispatch])

    // On Change handler
    const handleProfileDataChange = (e)=>{
        setProfileData({...profileData, [e.target.name]: e.target.value})
    }

    
    // Update profile - ON SUBMIT
    const handleOnSubmit = async(e) => {
        try {
            e.preventDefault();
            setIsPending(true)
            // --- Update User detail - Form-data
            const formData = new FormData();
            formData.append('id', profileData.id)
            formData.append('first_name', profileData.first_name)
            formData.append('last_name', profileData.last_name)
            formData.append('email', profileData.email)
            formData.append('phone', profileData.phone)
            formData.append('bio', profileData.bio)
            formData.append('profile_pic', profileToUpload)

            //--- Update address - Form-data
            const addressFormData = new FormData();
            addressFormData.append("name", profileData.first_name);
            addressFormData.append("phone", profileData.phone);
            addressFormData.append("address", address)
            if(!coords.latitude){
                toast.error("Please Allow Location")
                return;
            }
            addressFormData.append("longitude", coords.longitude);
            addressFormData.append("latitude", coords.latitude);

            //--- api calling
            const response = await handleUpdateProfile(authToken, formData);
            const addressResponse = await handleUpdateAddress(authToken, addressFormData)

            //--- Update address resposne handling
            setAddress(addressResponse.address)
            const { latitude, longitude } = addressResponse;        // Destructure the co-ordinates
            setCoords({ latitude, longitude })
            
            //--- Update User Profile response handling
            const filteredData = Object.fromEntries(Object.entries(response).filter(([_, v]) => v != null)); // null values are removed
            setProfileData(filteredData)                                // update current page 
            localStorage.setItem("user", JSON.stringify(filteredData)); //update user in local-storage
            dispatch(updateUser(filteredData))    
            toast.success("Profile Updated")                  
            
        } catch (error) {
            toast.error(error.message)
        }finally {
            setIsPending(false);
        }
    }

    const fileInputRef = useRef(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileToUpload(file);
            const reader = new FileReader();
            reader.onload = () => {
                // Set the selected image in state
                setProfileData({...profileData, "profile_pic": reader.result});
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

    if(!isLoaded) return <div></div>
    return (
        <>
            <div className='p-5 rounded-xl border border-borderClr mb-6'>
                <h2 className='text-xl font-semibold border-b pb-2 mb-4'>Profile Info</h2>
                <form onSubmit={handleOnSubmit}>
                    <div className=''>
                        <div className='w-[170px] h-[190px] border border-borderClr rounded-lg overflow-hidden relative cursor-pointer'
                            onClick={handleBoxClick}
                        >
                        {/* selectedImage */}
                            {profileData.profile_pic ? (
                                <img
                                    src={profileData.profile_pic}
                                    alt="Selected"
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <p className='text-center flex items-center justify-center text-sm text-[#777] h-full' >Click to add image</p>
                            )}
                        </div>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        <h3 className='text-base font-semibold mb-1 uppercase mt-2'>Upload Your Photo</h3>
                    </div>
                    <div className='grid grid-cols-12 md:gap-x-8 gap-x-0 gap-y-4 mt-8'>
                        <div className='md:col-span-6 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>First Name <span className='text-primary'>*</span></h4>
                            <input 
                                type="text"
                                placeholder='Enter First Name' 
                                id='' name='first_name'  
                                onChange={handleProfileDataChange}
                                value={profileData.first_name} 
                                required 
                            />
                        </div>

                        <div className='md:col-span-6 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Last Name </h4>
                            <input 
                                type="text" 
                                placeholder='Enter Last Name' 
                                id='' 
                                name='last_name'
                                onChange={handleProfileDataChange} 
                                value={profileData.last_name}
                            />
                        </div>

                        <div className='md:col-span-6 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Email <span className='text-primary'>*</span></h4>
                            <input 
                                type="email" 
                                placeholder='Enter Email' 
                                id='' 
                                name='email' 
                                onChange={handleProfileDataChange} 
                                value={profileData.email}
                                required 
                            />
                        </div>

                        <div className='md:col-span-6 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Mobile Number <span className='text-primary'>*</span> </h4>
                            <input 
                                type="text" 
                                placeholder='Enter Mobile Number' 
                                id='' 
                                name='phone' 
                                onChange={handleProfileDataChange} 
                                value={profileData.phone}
                                required 
                            />
                        </div>

                        <div className='col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Address <span className='text-primary'>*</span> </h4>
                            <Autocomplete>
                                <input 
                                    type='text'
                                    name="address" id="address"
                                    value={address}
                                    onChange={(e)=>setAddress(e.target.value)}
                                    placeholder='Enter Adress'
                                />
                            </Autocomplete>
                        </div>
                        
                        <div className='md:col-span-4 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>City <span className='text-primary'>*</span></h4>
                            <Autocomplete> 
                                <input 
                                    type="text" name="city" 
                                    id="city" placeholder='Enter City' 
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}
                                />
                            </Autocomplete>
                        </div>      
                        
                        <div className='md:col-span-4 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Zip Code </h4>        
                            <input 
                                type="text" placeholder='Enter Zip Code' 
                                id='' name='zip_code'
                                value={zipCode}
                                onChange={(e)=>setZipCode(e.target.value)} 
                            />
                        </div> 

                        <div className='md:col-span-4 col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Country <span className='text-primary'>*</span></h4>
                            <Autocomplete>
                                <input 
                                    type="text" name="country" 
                                    id="country" placeholder='Enter Country' 
                                    value={country}
                                    onChange={(e)=>setCountry(e.target.value)}
                                />
                            </Autocomplete>
                        </div>

                        <div className='col-span-12'>
                            <h4 className='text-base font-semibold mb-1 uppercase'>Bio {/*<span className='text-primary'>*</span>*/} </h4>
                            <textarea 
                                name="bio" id="bio" 
                                className='h-[70px]' 
                                onChange={handleProfileDataChange} 
                                value={profileData.bio} 
                                placeholder='Enter Bio'
                            />
                        </div> 
                        
                        <div className='md:col-span-6 mt-3 col-span-12  flex items-end'>
                            <button disabled={isPending} className="bg-primary text-white w-ful p-[4px_12px] rounded text-base font-semibold mb-1 uppercase disabled:opacity-60" type="">Submit </button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </>
    )
}
export default ProfileForm