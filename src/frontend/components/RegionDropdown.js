import React, { useEffect, useRef, useState } from "react";
import { handleGetCitites } from "../../services/region";

const RegionDropdown = ({ OnSelectRegion, isHome = false }) => {
  const [selected, setSelected] = useState({ id: "", name: "" });
  const [city, setCity] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const dropdownMenuRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false); // Flag to prevent multiple requests

  const onCitySelect = (city) => {
    setSelected(city);
    localStorage.setItem("region", JSON.stringify(city));
    setIsActive(false);
    if (isHome) {
      OnSelectRegion();
    }
    window.location.reload();
  };

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

  const fetchCities = async () => {
    try {
      if (isFetching) return; // If already fetching, return immediately
      setIsFetching(true); // Set fetching flag to true before making the request
      const response = await handleGetCitites();
      setCity(response);
      setIsFetching(false); // Reset fetching flag after request completes
    } catch (error) {
      console.log(error.message);
      setIsFetching(false); // Reset fetching flag in case of error
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("region") && city?.length > 0) {
      const parsed = JSON.parse(localStorage.getItem("region"));
      let found = false;
      city.forEach((item) => {
        if (item.name === parsed.name && item.id === parsed.id) {
          setSelected(parsed);
          found = true;
          return;
        }
      });

      if (!found) {
        localStorage.removeItem("region");
        window.location.reload();
      }
    }
  }, [city]);

  return (
    <>
      {/* Select Region */}
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
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
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
            {/* Search input */}
            <input
              onChange={handleOnChange}
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search City"
              autoComplete="off"
            />
            {/* Dropdown content goes here */}
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
    </>
  );
};

export default RegionDropdown;
