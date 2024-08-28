import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { handleGetFoodCategory } from "../../../services/get_without_auth";
import isValidURL from "../../../ValidateUrl";

const BrowsByCategories = () => {
  const [foodCategory, setFoodCategory] = useState([]);

  // GET Food category - API
  useEffect(() => {
    (async () => {
      try {
        const response = await handleGetFoodCategory();
        // console.log("response ", response);
        setFoodCategory(response);
      } catch (error) {
        console.error("Error while fetching food category", error);
      }
    })();
  }, []);

  return (
    <>
      <div className="point_3Banner">
        <div className="container mx-auto">
          <div className="md:py-12 py-10 text-center lg:px-0 px-3">
            <div className="text-center mb-6">
              <h1 className="font-semibold text-3xl uppercase tracking-wider tracking-widest">
                Browse by cuisine
              </h1>
              <div className="w-[60px] h-[2px] bg-primary my-4 mx-auto"></div>
              {/* <h3 className="alexBrush text-3xl capitalize text-headGray">
                Delivered to Your Door
              </h3> */}
            </div>
            <Swiper
              // slidesPerView={2}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                540: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1140: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              centeredSlides={false}
              mousewheel={true}
              // loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="loveChef"
            >
              {foodCategory.map((category, index) => (
                <SwiperSlide key={index}>
                  <div className="rounded-lg bg-white shadow">
                    <Link to={`/categorize-dishes/${category.id}`} className="">
                      <div className="pt-4 px-4">
                        {/* <img src="./media/frontend/img/restaurants/160x160/bcuisine-1.jpg" className="img-fluid w-full h-[160px] object-cover rounded-lg" alt="categories"/> */}
                        <img
                          src={
                            category.image && isValidURL(category.image)
                              ? category.image
                              : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                          }
                          className="img-fluid w-full h-[160px] object-cover rounded-lg"
                          alt="categories"
                        />
                      </div>
                      <h4 className="py-2 md:text-lg text-base font-semibold mb-0">
                        {category.name}
                      </h4>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
              {/* <SwiperSlide>
                                <div className='rounded-lg bg-white shadow'>
                                    <Link className="">
                                        <div className="pt-4 px-4">
                                            <img src="./media/frontend/img/restaurants/160x160/bcuisine-2.jpg" className="img-fluid w-full h-[160px] object-cover rounded-lg" alt="categories"/>
                                        </div> 
                                        <h4 className="py-2 md:text-lg text-base font-semibold mb-0">Thai</h4>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='rounded-lg bg-white shadow'>
                                    <Link className="">
                                        <div className="pt-4 px-4">
                                            <img src="./media/frontend/img/restaurants/160x160/bcuisine-3.jpg" className="img-fluid w-full h-[160px] object-cover rounded-lg" alt="categories"/>
                                        </div> 
                                        <h4 className="py-2 md:text-lg text-base font-semibold mb-0">Chinese</h4>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='rounded-lg bg-white shadow'>
                                    <Link className="">
                                        <div className="pt-4 px-4">
                                            <img src="./media/frontend/img/restaurants/160x160/bcuisine-4.jpg" className="img-fluid w-full h-[160px] object-cover rounded-lg" alt="categories"/>
                                        </div> 
                                        <h4 className="py-2 md:text-lg text-base font-semibold mb-0">Mexican</h4>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='rounded-lg bg-white shadow'>
                                    <Link className="">
                                        <div className="pt-4 px-4">
                                            <img src="./media/frontend/img/restaurants/160x160/bcuisine-5.jpg" className="img-fluid w-full h-[160px] object-cover rounded-lg" alt="categories"/>
                                        </div> 
                                        <h4 className="py-2 md:text-lg text-base font-semibold mb-0">Pakistani</h4>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='rounded-lg bg-white shadow'>
                                    <Link className="">
                                        <div className="pt-4 px-4">
                                            <img src="./media/frontend/img/restaurants/160x160/bcuisine-3.jpg" className="img-fluid w-full h-[160px] object-cover rounded-lg" alt="categories"/>
                                        </div> 
                                        <h4 className="py-2 md:text-lg text-base font-semibold mb-0">Labanese</h4>
                                    </Link>
                                </div>
                            </SwiperSlide> */}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowsByCategories;
