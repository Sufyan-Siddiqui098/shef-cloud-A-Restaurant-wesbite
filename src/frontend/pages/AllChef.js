import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { handleGetAllChefs } from "../../services/get_without_auth";

const AllChef = () => {
  const [chefs, setChefs] = useState([]);
  //Chefs in a city
  useEffect(() => {
    (async () => {
      try {
        const city = JSON.parse(localStorage.getItem("region"));
        const response = await handleGetAllChefs(city.id);
        console.log("response of all-chef ", response);
        setChefs(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <>
      <Header />

      <div className="container mx-auto my-8 px-lg-2 px-4">
        <div className="mt-8">
          <h2 className="text-secondary font-bold text-2xl mb-0 border-b pb-2">
            All Chef
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-6">
          {/* Chefs */}
          {chefs?.map((item) => (
            <div className="lg:col-span-3 sm:col-span-6 col-span-12 bg-white p-2 rounded-lg shadow-lg border">
              <Link className="flex flex-col justify-center py-4">
                <div className="flex items-center gap-x-3 ">
                  <img
                    src={item.profile_pic ? `${item.profile_pic}` : "./media/frontend/img/banner/chef-5.webp"}
                    className="img-fluid object-cover h-[60px] w-[60px] object-top rounded-lg"
                    alt="Chef"
                  />
                  <div>
                    <h3 className="font-bold text-base leading-tight mb-1">
                      {`${item.first_name} ${item.last_name}`}
                    </h3>
                    {/* <h4 className="font-medium text-[12px] leading-tight text-headGray mb-1">
                      New York . USA
                    </h4> */}
                    {/* <div className="inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="9"
                        height="9"
                        fill="#323232"
                      >
                        <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                      </svg>
                      <h4 className="text-[10px] leading-tight mb-0 font-semibold">
                        5.0{" "}
                        <span className="text-[10px] font-normal">(87)</span>
                      </h4>
                    </div> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllChef;
