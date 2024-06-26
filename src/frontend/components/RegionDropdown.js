import React, { useEffect, useRef, useState } from "react";

const RegionDropdown = () => {
    // selected city
  const [selected, setSelected] = useState({
    id: "",
    name: ""
  });
  const onCitySelect = (city) => {
    setSelected(city);
    localStorage.setItem('region', JSON.stringify(city));
    setIsActive(false);
  }

  // City fetched from api
  const [city, setCity] = useState([
    {
      id: 1,
      value: "khi",
      name: "Karachi",
    },
    {
      id: 2,
      value: "lhr",
      name: "Lahore",
    },
    {
      id: 3,
      value: "hyd",
      name: "Hyderabad",
    },
    {
      id: 4,
      value: "isl",
      name: "Islamabad",
    },
  ]);

  //Modal (active or deactive)
  const [isActive, setIsActive] = useState(false)
 // Dropdown reference
  const dropdownMenuRef = useRef(null);

  // searching input
  const hanldeOnChange = (e) => {
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

  // Get region if alraedy in localstorage
  useEffect(()=>{
    if(localStorage.getItem('region')){
        const parsed = JSON.parse( localStorage.getItem('region') );
        setSelected(parsed);
    }
  },[])

  return (
    <>
       {/* <!-- component --> */}
      <div className=" flex items-center justify-center w-full ">
        <div className="relative group border rounded-md w-full shadow-sm">
          <button
            onClick={()=> setIsActive(prev => !prev)}
            type="button"
            className="inline-flex justify-center items-center w-full px-4 py-1 text-sm font-medium text-gray-700 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary"
          >
            <span className="mr-2">{selected.name ? selected.name : "Select City"}</span>
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
            className={`${isActive ? "" : "hidden"} absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-30 max-h-[200px] lg:max-h-[240px] overflow-y-auto`}
          >
            {/* <!-- Search input --> */}
            <input
              onChange={hanldeOnChange}
              id="search-input"
              className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search City"
              autoComplete="off"
            />
            {/* <!-- Dropdown content goes here --> */}
            {city.map((item, index) => (
              <option
                onClick={()=>onCitySelect(item)}
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
