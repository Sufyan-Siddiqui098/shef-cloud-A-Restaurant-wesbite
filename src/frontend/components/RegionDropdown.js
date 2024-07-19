import React, { useEffect, useRef, useState } from "react";
import { handleGetCitites } from "../../services/region";
import { useJsApiLoader } from "@react-google-maps/api";
// Libraries needed for Google Maps API
const libraries = ['places'];

const RegionDropdown = ({ OnSelectRegion, isHome = false }) => {
  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCKU3ow8iRNEBhi1St_gMdG5Tn7_Vf3Wzo",
    libraries
  });

  // State variables
  const [selected, setSelected] = useState({ id: "", name: "" });
  const [city, setCity] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const dropdownMenuRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);

  // Function to handle city selection
  const onCitySelect = (city) => {
    setSelected(city);
    localStorage.setItem("region", JSON.stringify(city));
    setIsActive(false);
    if (isHome) {
      OnSelectRegion();
    }
    window.location.reload();
  };

  // Function to handle search input change
  const handleOnChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const items = dropdownMenuRef.current.querySelectorAll("option");
    items.forEach((item) => {
      const text = item.innerText.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  // Function to fetch cities from the backend
  const fetchCities = async () => {
    try {
      if (isFetching) return;
      setIsFetching(true);
      const response = await handleGetCitites();
      setCity(response);
      setIsFetching(false);
    } catch (error) {
      console.log(error.message);
      setIsFetching(false);
    }
  };

  // Function to get city name from coordinates using Google Maps Geocoding API
  const getCityCountryZipFromCoords = (latitude, longitude) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const { address_components } = results[0];
          const local = address_components.reduce((acc, component) => {
            const { types } = component;
            if (types.includes('locality')) {
              acc.locality = component.long_name;
            }
            return acc;
          }, {});
          if (local.locality) {
            // Case-insensitive comparison for city names
            const selectedCity = city.find(c => c.name.toLowerCase() === local.locality.toLowerCase());
            if (selectedCity) {
              onCitySelect(selectedCity);
            } else {
              selectDefaultCity();
            }
          } else {
            selectDefaultCity();
          }
        } else {
          console.warn('No results found');
          selectDefaultCity();
        }
      } else {
        console.error('Geocode was not successful:', status);
        selectDefaultCity();
      }
    });
  };

  // Function to get the user's location using the Geolocation API
  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityCountryZipFromCoords(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error: ', error);
          selectDefaultCity();
        }
      );
    } else {
      selectDefaultCity();
    }
  };

  // Function to select the default city (Karachi)
  const selectDefaultCity = () => {
    // Case-insensitive comparison for default city name
    const defaultCity = city.find(c => c.name.toLowerCase() === 'karachi');
    if (defaultCity) {
      onCitySelect(defaultCity);
    }
  };

  // Fetch cities when the component mounts
  useEffect(() => {
    fetchCities();
  }, []);

  // Set selected city based on local storage or user location
  useEffect(() => {
    if (city.length > 0) {
      if (localStorage.getItem("region")) {
        const parsed = JSON.parse(localStorage.getItem("region"));
        const selectedCity = city.find(c => c.id === parsed.id && c.name.toLowerCase() === parsed.name.toLowerCase());
        if (selectedCity) {
          setSelected(parsed);
        } else {
          localStorage.removeItem("region");
          window.location.reload();
        }
      } else if (isLoaded && !loadError) {
        getUserLocation();
      }
    }
  }, [city, isLoaded, loadError]);

  // Error handling for Google Maps API load error
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative group border border-[#a0a3a7] rounded-md w-full shadow-sm">
        <button
          onClick={() => setIsActive((prev) => !prev)}
          type="button"
          className="inline-flex justify-center items-center w-full px-4 py-1 text-sm font-medium text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary"
        >
          <span className="mr-2">
            {selected.name ? selected.name : "Select City"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 011.414 1.414l-3 3a1 1 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          ref={dropdownMenuRef}
          id="dropdown-menu"
          className={`${
            isActive ? "" : "hidden"
          } absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-30 max-h-[200px] lg:max-h-[240px] overflow-y-auto`}
        >
          <input
            onChange={handleOnChange}
            id="search-input"
            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search City"
            autoComplete="off"
          />
          {city?.map((item, index) => (
            <option
              onClick={() => onCitySelect(item)}
              key={index}
              className="block px-4 py-1 border-b text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer font-semibold"
            >
              {item.name}
            </option>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionDropdown;
