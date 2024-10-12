import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "../cartWidget/CartModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItem } from "../../../store/slice/cart";
import isValidURL from "../../../ValidateUrl";
import { handleGetAvailabilityTimeSlot } from "../../../services/shef";
import convertTo12Hour from "../../../convertTo12Hours";
const FilterAndDate = ({ chefAndDishes }) => {
  const [isBoxVisible, setBoxVisible] = useState(false);
  const toggleBox = () => {
    setBoxVisible(!isBoxVisible);
  };
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalDish, setModalDish] = useState({});
  const openModal = (dish) => {
    setModalDish(dish);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // Cart item from Redux
  const { cartItem } = useSelector((state) => state.cart);

  const [sortingWithDays, setSortingWithDays] = useState("");
  const [sortingWithSlot, setSortingWithSlot] = useState("");
  const [dishesOfChef, setDishesOfChef] = useState([]);

  const [slot, setSlot] = useState([]);
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const timeslotResponse = await handleGetAvailabilityTimeSlot();
        const formatedTimeSlotArray = timeslotResponse.map((time) => {
          return {
            time_start: time.time_start.slice(0, 5),
            time_end: time.time_end.slice(0, 5),
          };
        });
        console.log("tiem ", formatedTimeSlotArray);
        setSlot(formatedTimeSlotArray);
      } catch (error) {
        console.error(
          "Error while fetching availabilit time slot of dishes ",
          error.message
        );
      }
    };
    console.log("slot is running ");
    fetchTimeSlots();
  }, []);

  useEffect(() => {
    let dishes = chefAndDishes?.menus?.filter((menu) => menu.is_live === 1);
    if (sortingWithDays) {
      dishes = dishes.filter((dish) => {
        return dish[`${sortingWithDays.toLowerCase()}`] === 1;
      });
    }

    if (sortingWithSlot) {
      const targetTimeStart = sortingWithSlot.split("-")[0];
      const targetTimeEnd = sortingWithSlot.split("-")[1];
      // console.log("start ", targetTimeStart, " end time ", targetTimeEnd)
      // Now filter by availability slot time range
      dishes = dishes.filter((dish) => {
        return dish.availability_slot?.some((slot) => {
          return (
            slot.time_start <= targetTimeStart && slot.time_end >= targetTimeEnd
          );
        });
      });
    }

    // Check if both day and slot are selected, apply combined filtering
    if (sortingWithDays && sortingWithSlot) {
      const targetTimeStart = sortingWithSlot.split("-")[0];
      const targetTimeEnd = sortingWithSlot.split("-")[1];
      dishes = dishes.filter((dish) => {
        const dayMatches = dish[`${sortingWithDays.toLowerCase()}`] === 1;
        const slotMatches = dish.availability_slot?.some((slot) => {
          return (
            slot.time_start <= targetTimeStart && slot.time_end >= targetTimeEnd
          );
        });

        // Only return dishes that match both day and slot
        return dayMatches && slotMatches;
      });
    }

    setDishesOfChef(dishes);

    // console.log("filtered dishes ", dishes);
  }, [chefAndDishes, sortingWithDays, sortingWithSlot]);

  const days = [
    { name: "Mon", value: "is_monday" },
    { name: "Tue", value: "is_tuesday" },
    { name: "Wed", value: "is_wednesday" },
    { name: "Thu", value: "is_thursday" },
    { name: "Fri", value: "is_friday" },
    { name: "Sat", value: "is_saturday" },
    { name: "Sun", value: "is_sunday" },
  ];

  const dispatch = useDispatch();
  // increment/decrement Quantity - Update directly in redux-store
  const updateQuantityInStore = (chefIndex, menuIndex, quantity, operation) => {
    let updatedQuantity;
    if (operation === "increment") {
      updatedQuantity = quantity + 1;
    } else {
      updatedQuantity = quantity - 1 > 0 ? quantity - 1 : 1;
    }
    // console.log("Update quantity ", updatedQuantity)
    dispatch(
      updateCartItem({
        chefIndex,
        menuIndex,
        key: "quantity",
        value: updatedQuantity,
      })
    );
  };

  return (
    <>
      <div className="realtive">
        <div>
          <CartModal
            modalDish={modalDish}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
          />
        </div>
        <div className="container mx-auto lg:px-2 px-2">
          {/* <div className='flex justify-between items-center mb-4 relative'>
                        <h2 className='md:text-2xl text-xl font-semibold mb-0'>Pick a delivery date</h2>
                        <div onClick={toggleBox} className='flex justify-between items-center bg-primaryLight rounded-md cursor-pointer pr-2 pl-4 py-1'>
                            <h3 className='text-base pr-3 mb-1'>Dietary</h3>
                            {isBoxVisible
                                ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,1)"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(0,0,0,1)"><path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path></svg>
                            }

                        </div>
                        {isBoxVisible && (
                            <div className='absolute right-0 top-[40px] z-10 bg-white border border-borderClr p-6 rounded-xl'>
                                <h3 className='text-xl font-semibold'>Dietary</h3>
                                <form>
                                    <div className="block w-[280px] mt-6">
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option1" />
                                            <span className="ml-6 text-lg font-medium">Vegtarian</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option2" />
                                            <span className="ml-6 text-lg font-medium">Vegan</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option3" />
                                            <span className="ml-6 text-lg font-medium">Gluten Free</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option4" />
                                            <span className="ml-6 text-lg font-medium">Dairy Free</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option5" />
                                            <span className="ml-6 text-lg font-medium">Low FODMAP</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option6" />
                                            <span className="ml-6 text-lg font-medium">Paleo</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option7" />
                                            <span className="ml-6 text-lg font-medium">Whole 30</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-4">
                                            <input type="radio" className="form-radio text-primary w-[20px] h-[20px]" name="radioGroup" value="option8" />
                                            <span className="ml-6 text-lg font-medium">Halal</span>
                                        </label>
                                    </div>
                                    <button className='bg-primary text-white rounded-md cursor-pointer px-4 py-1 mt-3'>Apply</button>
                                </form>
                            </div>
                        )}
                    </div> */}
          <div>
            <div className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-4 gap-3 mb-4">
              <h6 className="lg:col-span-12 md:col-span-8 col-span-4 text-[18px] tracking-wide  -mb-1 text-headGray font-smibold">
                Filter dishes
              </h6>

              {/* <div className={`chefDateBtn ${activeButton === 'btn1' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn1')}
                            >
                                <h6 className='text-[10px] font-bold text-[#777] uppercase mb-1 leading-tight'>Mon</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 1</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn2' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn2')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Tue</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 2</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn3' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn3')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Wed</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 3</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn4' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn4')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Thu</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 4</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn5' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn5')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Fri</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 5</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn6' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn6')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Sat</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 6</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn7' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn7')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Sun</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 7</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn8' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn8')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Mon</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 8</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn9' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn9')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Tue</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 9</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn10' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn10')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Wed</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 10</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn11' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn11')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Thu</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 11</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn12' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn12')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Fri</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 12</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn13' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn13')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Sat</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 13</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn14' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn14')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Sun</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 14</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn15' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn15')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Mon</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 15</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn16' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn16')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Tue</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 16</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn17' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn17')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Wed</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 17</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn18' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn18')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Thu</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 18</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn19' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn19')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Fri</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 19</h4>
                            </div>
                            <div className={`chefDateBtn ${activeButton === 'btn20' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('btn20')}
                            >
                                <h6 className='text-[10px] font-bold uppercase text-[#777] mb-1 leading-tight'>Sat</h6>
                                <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 20</h4>
                            </div> */}
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`chefDateBtn ${
                    sortingWithDays === day.value ? "active" : ""
                  }`}
                  onClick={() => setSortingWithDays(day.value)}
                  // onClick={() => handleButtonClick('btn21')}
                >
                  <h6 className="text font-bold uppercase text-[#777] mb-1 leading-">
                    {day.name}
                  </h6>
                  {/* <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 21</h4> */}
                </div>
              ))}
              {/* Reset days */}
              <div
                className={`border flex justify-center items-center rounded-md cursor-pointer hover:border-primary`}
                onClick={() => setSortingWithDays("")}
              >
                <h6 className="text font-bold uppercase text-primary mb-1">
                  Reset
                </h6>
                {/* <h4 className='text-[14px] font-bold mb-0 leading-tight'>Feb 21</h4> */}
              </div>
              <div className="lg:col-span-12 md:col-span-8 col-span-4 mt-2">
                <div className="relative ">
                  <h4 className="text-sm  bg-white text-headGray absolute -top-2 left-2 px-1 z-20">
                    Filter by time
                  </h4>
                  <select
                    onChange={(e) => setSortingWithSlot(e.target.value)}
                    className="w-max"
                    value={sortingWithSlot}
                    name=""
                    id=""
                  >
                    <option value="">--- Select time slot ---</option>
                    {slot.map((availability_time) => (
                      <option
                        value={
                          availability_time.time_start.toString() +
                          "-" +
                          availability_time.time_end.toString()
                        }
                      >
                        {convertTo12Hour(
                          availability_time.time_start.toString()
                        ) +
                          "-" +
                          convertTo12Hour(
                            availability_time.time_end.toString()
                          )}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 md:gap-x-4 gap-x-0 gap-y-4 my-12">
            <div className="lg:col-span-8 col-span-12">
              {/* <h2 className='md:text-3xl text-2xl uppercase font-bold -tracking-wider mb-6'>MONDAY'S MAIN ITEMS</h2> */}
              <h2 className="md:text-3xl text-2xl uppercase font-bold -tracking-wider mb-6">
                MAIN ITEMS
              </h2>
              <div className="grid grid-cols-12 md:gap-x-4 gap-x-3 md:gap-y-3 gap-y-4">
                {dishesOfChef?.map(
                  (dish) => (
                    // dish.is_live === 1 && (
                    <div
                      key={dish.id}
                      className="lg:col-span-4 sm:col-span-6 col-span-12"
                    >
                      <div className="product-box mb-md-20">
                        <div className="product-img relative">
                          {/* <img src={(dish.logo && isValidURL(dish.logo)) ? dish.logo : "/media/frontend/img/restaurants/255x104/order-1.jpg"} className="img-fluid  full-width h-24 max-h-24 object-cover" alt="product-img" /> */}
                          <img
                            src={
                              dish.logo && isValidURL(dish.logo)
                                ? dish.logo
                                : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                            }
                            className="img-fluid  full-width h-24 max-h-24 object-cover"
                            alt="product-img"
                          />
                          {/* <div className="absolute bottom-[12px] right-0 px-4">
                          <div
                            className="bg-primary p-[5px] rounded-[5px] cursor-pointer"
                            onClick={() => openModal(dish)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="22"
                              height="22"
                              fill="#fff"
                            >
                              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                            </svg>
                          </div>
                        </div> */}
                        </div>
                        <div className="p-3">
                          {/* <div className='flex items-center justify-between'>
                                                <div className='flex items-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                                        <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z"></path>
                                                    </svg>
                                                    <h2 className='text-secondary font-medium text-[12px] ml-2 mb-0'>Monday</h2>
                                                </div>
                                                <h2 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>Mexican</h2>
                                            </div> */}

                          <h6 className="text-lg text-secondary font-bold mb-1">
                            {/* <Link> Chilli Chicken Pizza</Link> */}
                            <Link to={`/dish-detail-single/${dish.id}`}>
                              {" "}
                              {dish.name}{" "}
                            </Link>
                          </h6>
                          {/* Reveiw/Rate & Price */}

                          <div className="flex justify-between items-center gap-x-2">
                            <div className="inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]">
                              {/* Thumbs up SVG */}
                              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                            </svg> */}

                              {/* Star SVG */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="12"
                                height="12"
                                fill="#323232"
                              >
                                <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                              </svg>
                              <h4 className="text-xs mb-0 font-semibold">
                                {/* 100%{" "} */}
                                {dish?.average_rating
                                  ? parseFloat(dish.average_rating).toFixed(1)
                                  : 0}{" "}
                                <span className="text-[12px] font-normal">
                                  ({dish?.total_reviews})
                                </span>
                              </h4>
                            </div>
                            {/* <h4 className='text-xl text-secondary font-semibold mb-0'>$ 12.99 </h4> */}
                            <h4 className="text-lg text-secondary font-semibold mb-0">
                              {(
                                dish.chef_earning_fee +
                                dish.platform_price +
                                dish.delivery_price
                              ).toLocaleString("en-PK", {
                                style: "currency",
                                currency: "PKR",
                              })}
                              {dish?.auto_applied_discounts?.length > 0 && (
                                <span className="block text-[13px] -mt-2 text-green-700">
                                  [
                                  {/* {` ${dish.auto_applied_discounts[0].discount} ${dish.auto_applied_discounts[0].discount_type} `} */}
                                  {dish.auto_applied_discounts[0]
                                    .discount_type === "$"
                                    ? dish.auto_applied_discounts[0].discount.toLocaleString(
                                        "en-PK",
                                        {
                                          style: "currency",
                                          currency: "PKR",
                                        }
                                      )
                                    : (
                                        dish.chef_earning_fee *
                                        (dish.auto_applied_discounts[0]
                                          .discount /
                                          100)
                                      ).toLocaleString("en-PK", {
                                        style: "currency",
                                        currency: "PKR",
                                      })}
                                  <span className="text-[10px]"> Off</span> ]
                                </span>
                              )}
                            </h4>
                          </div>

                          {/* <div className='flex items-center gap-3'>
                                                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)">
                                                        <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                    </svg>
                                                    <h4 className='text-sm mb-0 font-semibold'>
                                                        100% <span className='text-[12px] font-normal'>(230)</span>
                                                    </h4>
                                                </div>
                                                <h4 className='bg-primaryLight px-3 py-1 text-sm rounded-[4px] inline-block mb-0'>1 serving</h4>
                                            </div> */}
                          <div className="border- border-primary mt- mb-4"></div>

                          {/* Dish Availability */}
                          <div className="border-t pt-3 mt-2">
                            <div className="grid grid-cols-12 gap-x-1">
                              <div className="lg:col-span-8 col-span-9">
                                <h4 className="text-[10px] text-headGray mb-0">
                                  Availibility:{" "}
                                </h4>
                                <ul className="flex gap-1 flex-wrap">
                                  {/* Days - starting from sunday */}
                                  <div className="relative group">
                                    <li
                                      className={`text w-4 h-4 text-center ${
                                        dish?.is_sunday === 1
                                          ? "bg-primary text-white"
                                          : "border"
                                      } rounded-full mb-0 flex items-center justify-center`}
                                    >
                                      S
                                    </li>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      Sunday
                                    </div>
                                  </div>

                                  <div className="relative group">
                                    <li
                                      className={`text w-4 h-4 text-center ${
                                        dish?.is_monday === 1
                                          ? "bg-primary text-white"
                                          : "border"
                                      } rounded-full mb-0 flex items-center justify-center`}
                                    >
                                      M
                                    </li>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      Monday
                                    </div>
                                  </div>

                                  <div className="relative group">
                                    <li
                                      className={`text w-4 h-4 text-center ${
                                        dish?.is_tuesday === 1
                                          ? "bg-primary text-white"
                                          : "border"
                                      } rounded-full mb-0 flex items-center justify-center`}
                                    >
                                      T
                                    </li>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      Tuesday
                                    </div>
                                  </div>

                                  <div className="relative group">
                                    <li
                                      className={`text w-4 h-4 text-center ${
                                        dish?.is_wednesday === 1
                                          ? "bg-primary text-white"
                                          : "border"
                                      } rounded-full mb-0 flex items-center justify-center`}
                                    >
                                      W
                                    </li>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      Wednesday
                                    </div>
                                  </div>

                                  <div className="relative group">
                                    <li
                                      className={`text w-4 h-4 text-center ${
                                        dish?.is_thursday === 1
                                          ? "bg-primary text-white"
                                          : "border"
                                      } rounded-full mb-0 flex items-center justify-center`}
                                    >
                                      T
                                    </li>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      Thursday
                                    </div>
                                  </div>

                                  <div className="relative group">
                                    <li
                                      className={`text w-4 h-4 text-center ${
                                        dish?.is_friday === 1
                                          ? "bg-primary text-white"
                                          : "border"
                                      } rounded-full mb-0 flex items-center justify-center`}
                                    >
                                      F
                                    </li>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      Friday
                                    </div>
                                  </div>

                                  <div className="relative group">
                                    <li
                                      className={`text w-4 h-4 text-center ${
                                        dish?.is_saturday === 1
                                          ? "bg-primary text-white"
                                          : "border"
                                      } rounded-full mb-0 flex items-center justify-center`}
                                    >
                                      S
                                    </li>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                                      Saturday
                                    </div>
                                  </div>
                                </ul>
                              </div>
                              <div className="col-span-3 my-auto">
                                <Link
                                  to={`/dish-detail-single/${dish.id}`}
                                  className="bg-primary px-3 py-1 rounded-[4px] font-medium text-xs !text-white tracking-wide"
                                >
                                  {" "}
                                  Detail
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                  // )
                )}
                {dishesOfChef?.length < 1 && (
                  <div className="col-span-12">
                    <p className="text-headGray text-lg mb-6 font-semibold">
                      No dish available{" "}
                    </p>
                  </div>
                )}
                {/* <div className='lg:col-span-4 sm:col-span-6 col-span-12'>
                                    <div className="product-box mb-md-20">
                                        <div className="product-img relative">
                                            <img src="./media/frontend/img/restaurants/255x104/order-2.jpg" className="img-fluid full-width" alt="product-img" />
                                            <div className='absolute bottom-[12px] right-0 px-4'>
                                                <div className='bg-primary p-[5px] rounded-[5px] cursor-pointer' onClick={openModal}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                                                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                                        <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z"></path>
                                                    </svg>
                                                    <h2 className='text-secondary font-medium text-[12px] ml-2 mb-0'>Monday</h2>
                                                </div>
                                                <h2 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>Mexican</h2>
                                            </div>

                                            <h6 className="text-lg text-secondary font-bold mb-1">
                                                <Link> Guajillo Grilled Shrimps </Link>
                                            </h6>
                                            <div className='flex items-center gap-3'>
                                                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)">
                                                        <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                    </svg>
                                                    <h4 className='text-sm mb-0 font-semibold'>
                                                        100% <span className='text-[12px] font-normal'>(20)</span>
                                                    </h4>
                                                </div>
                                                <h4 className='bg-primaryLight px-3 py-1 text-sm rounded-[4px] inline-block mb-0'>2 serving</h4>
                                            </div>
                                            <div className='border-t border-primary mt-4 mb-4'></div>
                                            <div className='flex items-center justify-between'>
                                                <h2 className='bg-primaryGreen py-1 px-3 rounded-[5px] text-white font-medium text-base mb-0 inline-block leading-tight'>25%</h2>
                                                <h2 className='text-secondary font-semibold text-lg mb-0'>$18.99</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='lg:col-span-4 sm:col-span-6 col-span-12'>
                                    <div className="product-box mb-md-20">
                                        <div className="product-img relative">
                                            <img src="./media/frontend/img/restaurants/255x104/order-3.jpg" className="img-fluid full-width" alt="product-img" />
                                            <div className='absolute bottom-[12px] right-0 px-4'>
                                                <div className='bg-primary p-[5px] rounded-[5px] cursor-pointer' onClick={openModal}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                                                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                                        <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z"></path>
                                                    </svg>
                                                    <h2 className='text-secondary font-medium text-[12px] ml-2 mb-0'>Monday</h2>
                                                </div>
                                                <h2 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>Mexican</h2>
                                            </div>

                                            <h6 className="text-lg text-secondary font-bold mb-1">
                                                <Link> Brocolis </Link>
                                            </h6>
                                            <div className='flex items-center gap-3'>
                                                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)">
                                                        <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                    </svg>
                                                    <h4 className='text-sm mb-0 font-semibold'>
                                                        100% <span className='text-[12px] font-normal'>(a20)</span>
                                                    </h4>
                                                </div>
                                                <h4 className='bg-primaryLight px-3 py-1 text-sm rounded-[4px] inline-block mb-0'>2 serving</h4>
                                            </div>
                                            <div className='border-t border-primary mt-4 mb-4'></div>
                                            <div className='flex items-center justify-between'>
                                                <h2 className='bg-primaryGreen py-1 px-3 rounded-[5px] text-white font-medium text-base mb-0 inline-block leading-tight'>25%</h2>
                                                <h2 className='text-secondary font-semibold text-lg mb-0'>$12.99</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
              </div>
              {/* <h2 className='md:text-3xl text-2xl uppercase font-bold -tracking-wider mb-6 mt-8'>MONDAY'S SIDE ITEMS</h2>
                            <div className='grid grid-cols-12 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4'>
                                <div className='lg:col-span-4 sm:col-span-6 col-span-12'>
                                    <div className="product-box mb-md-20">
                                        <div className="product-img relative">
                                            <img src="./media/frontend/img/restaurants/255x104/order-4.jpg" className="img-fluid full-width" alt="product-img" />
                                            <div className='absolute bottom-[12px] right-0 px-4'>
                                                <div className='bg-primary p-[5px] rounded-[5px] cursor-pointer' onClick={openModal}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                                                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                                        <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z"></path>
                                                    </svg>
                                                    <h2 className='text-secondary font-medium text-[12px] ml-2 mb-0'>Monday</h2>
                                                </div>
                                                <h2 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>Mexican</h2>
                                            </div>

                                            <h6 className="text-lg text-secondary font-bold mb-1">
                                                <Link> Chilli Chicken Pizza</Link>
                                            </h6>
                                            <div className='flex items-center gap-3'>
                                                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)">
                                                        <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                    </svg>
                                                    <h4 className='text-sm mb-0 font-semibold'>
                                                        100% <span className='text-[12px] font-normal'>(230)</span>
                                                    </h4>
                                                </div>
                                                <h4 className='bg-primaryLight px-3 py-1 text-sm rounded-[4px] inline-block mb-0'>1 serving</h4>
                                            </div>
                                            <div className='border-t border-primary mt-4 mb-4'></div>
                                            <div className='flex items-center justify-between'>
                                                <h2 className='bg-primaryGreen py-1 px-3 rounded-[5px] text-white font-medium text-base mb-0 inline-block leading-tight'>15%</h2>
                                                <h2 className='text-secondary font-semibold text-lg mb-0'>$15.99</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='lg:col-span-4 sm:col-span-6 col-span-12'>
                                    <div className="product-box mb-md-20">
                                        <div className="product-img relative">
                                            <img src="./media/frontend/img/restaurants/255x104/order-3.jpg" className="img-fluid full-width" alt="product-img" />
                                            <div className='absolute bottom-[12px] right-0 px-4'>
                                                <div className='bg-primary p-[5px] rounded-[5px] cursor-pointer' onClick={openModal}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="#fff">
                                                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                                        <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z"></path>
                                                    </svg>
                                                    <h2 className='text-secondary font-medium text-[12px] ml-2 mb-0'>Monday</h2>
                                                </div>
                                                <h2 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>Mexican</h2>
                                            </div>

                                            <h6 className="text-lg text-secondary font-bold mb-1">
                                                <Link> Guajillo Grilled Shrimps </Link>
                                            </h6>
                                            <div className='flex items-center gap-3'>
                                                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)">
                                                        <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                    </svg>
                                                    <h4 className='text-sm mb-0 font-semibold'>
                                                        100% <span className='text-[12px] font-normal'>(20)</span>
                                                    </h4>
                                                </div>
                                                <h4 className='bg-primaryLight px-3 py-1 text-sm rounded-[4px] inline-block mb-0'>2 serving</h4>
                                            </div>
                                            <div className='border-t border-primary mt-4 mb-4'></div>
                                            <div className='flex items-center justify-between'>
                                                <h2 className='bg-primaryGreen py-1 px-3 rounded-[5px] text-white font-medium text-base mb-0 inline-block leading-tight'>25%</h2>
                                                <h2 className='text-secondary font-semibold text-lg mb-0'>$18.99</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
            </div>
            <div className="lg:col-span-4 col-span-12 bg-[#f7f7f7]">
              {/*********  When Data is Empty Un Comment  *************/}
              {(!cartItem || cartItem.length < 1) && (
                <div className="pt-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-3"
                    viewBox="0 0 24 24"
                    width="96"
                    height="96"
                    fill="#dcdcdc"
                  >
                    <path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM19.0049 8H5.00488V20H19.0049V8ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10V12C9.00488 13.6569 10.348 15 12.0049 15C13.6617 15 15.0049 13.6569 15.0049 12V10H17.0049V12C17.0049 14.7614 14.7663 17 12.0049 17C9.24346 17 7.00488 14.7614 7.00488 12V10H9.00488Z"></path>
                  </svg>
                  <h2 className="text-lg text-center text-secondary">
                    Your cart is empty <br /> Add items to get started
                  </h2>
                </div>
              )}

              {/*********  When Data is Filled  *************/}

              {cartItem && cartItem.length > 0 && (
                <div className="md:p-4 p-3">
                  {/* <h3 className='md:text-xl text-lg font-bold mb-6'>Your order for delivery on Monday, February 12</h3> */}
                  <h3 className="md:text-xl text-lg font-bold mb-6">
                    Your order for delivery{" "}
                  </h3>
                  {cartItem.map((chef, chefIndex, chefArr) =>
                    chef.id === chefAndDishes.id
                      ? chef.menu.map((menu, menuIndex) => (
                          <div key={menu.id}>
                            <div className="flex items-center gap-x-2 bg-primaryLight p-2 rounded-lg">
                              <img
                                src={
                                  chef?.profile_pic &&
                                  isValidURL(chef?.profile_pic)
                                    ? chef.profile_pic
                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                }
                                className="object-top rounded-full w-[30px] object-cover h-[30px]"
                                alt="ef"
                              />
                              {/* <img src={(chef?.profile_pic && isValidURL(chef?.profile_pic))?  chef.profile_pic: './media/frontend/img/banner/female-chef.png'} className='object-top rounded-full w-[30px] object-cover h-[30px]' alt='ef' /> */}
                              {/* <Link className='!underline !text-secondary text-base font-semibold'> Shef Swarnamali</Link> */}
                              <Link className="!underline !text-secondary text-base font-semibold">
                                {`${chef.first_name} ${chef.last_name}`}
                              </Link>
                            </div>

                            {/* Order Box */}
                            <div className="flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4">
                              <div className="flex items-center gap-x-2 w-[65%]">
                                {/* <img
                              src="./media/frontend/img/restaurants/255x104/order-2.jpg"
                              className="object-top rounded-lg w-[60px] object-cover h-[60px]"
                              alt="ef"
                            /> */}
                                <img
                                  src={
                                    menu.logo && isValidURL(menu.logo)
                                      ? menu.logo
                                      : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                                  }
                                  className="object-top rounded-lg w-[60px] object-cover h-[60px]"
                                  alt="ef"
                                />
                                <div>
                                  {/* <h3 className='mb-1 text-base font-semibold leading-tight'>Guajillo Grilled Shrimps </h3> */}
                                  <h3 className="mb-1 text-base font-semibold leading-tight">
                                    {menu.name}
                                  </h3>
                                  {/* <h4 className='text-sm fontsemibold mb-0'>$13.99</h4> */}
                                  <h4 className="text-sm fontsemibold mb-0">
                                    {(
                                      (menu.chef_earning_fee +
                                        menu.platform_price +
                                        menu.delivery_price) *
                                      menu.quantity
                                    ).toLocaleString("en-PK", {
                                      style: "currency",
                                      currency: "PKR",
                                    })}
                                  </h4>
                                </div>
                              </div>
                              <div className="flex items-center justify-between w-[35%] bg-primaryLight rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantityInStore(
                                      chefIndex,
                                      menuIndex,
                                      menu.quantity,
                                      "decrement"
                                    )
                                  }
                                  className="w-[25%] border"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="rgba(0,0,0,1)"
                                  >
                                    <path d="M5 11V13H19V11H5Z"></path>
                                  </svg>
                                </button>
                                <input
                                  value={menu.quantity}
                                  className="w-[50%] text-center border-0 bg-transparent text-xs px-1"
                                  readOnly
                                  placeholder="1"
                                />
                                <button
                                  onClick={() =>
                                    updateQuantityInStore(
                                      chefIndex,
                                      menuIndex,
                                      menu.quantity,
                                      "increment"
                                    )
                                  }
                                  className="w-[25%]"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="rgba(0,0,0,1)"
                                  >
                                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            {/* <h4 className='py-1 text-base text-center mt-6 mb-4 bg-greenLight'>Order amount must be at least <span className='font-bold'>$25.</span></h4> */}
                            <Link
                              to="/cart"
                              className="flex justify-center items-center gap-x-3 my-2 bg-primary rounded-lg py-3 px-3 "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="rgba(255,255,255,1)"
                              >
                                <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                              </svg>
                              <span className="text-white text-lg">
                                View Cart
                              </span>
                              <span className="text-white font-semibold text-lg">
                                {/* (1) */}
                                {cartItem.reduce(
                                  (total, chef) => total + chef.menu.length,
                                  0
                                )}
                              </span>
                            </Link>
                          </div>
                        ))
                      : chefIndex === chefArr.length - 1 && (
                          <div className="pt-12">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mx-auto mb-3"
                              viewBox="0 0 24 24"
                              width="96"
                              height="96"
                              fill="#dcdcdc"
                            >
                              <path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM19.0049 8H5.00488V20H19.0049V8ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10V12C9.00488 13.6569 10.348 15 12.0049 15C13.6617 15 15.0049 13.6569 15.0049 12V10H17.0049V12C17.0049 14.7614 14.7663 17 12.0049 17C9.24346 17 7.00488 14.7614 7.00488 12V10H9.00488Z"></path>
                            </svg>
                            <h2 className="text-lg text-center text-secondary">
                              No Item of this Chef
                              <br />
                            </h2>
                          </div>
                        )
                  )}
                </div>
              )}
            </div>
            {/* <div className='mt-8 text-center lg:col-span-8 col-span-12 mx-auto'>
                            <Link className='px-6 py-3 font-medium uppercase text-base rounded-lg bg-primaryLight border border-borderClr'>Show All Items</Link>
                        </div> */}
          </div>
          {/* ---- Customer Reviews ---- */}
          {/* <div>
                    <h2 className="text-3xl uppercase font-bold -tracking-wider my-6 md:text-start text-center">REVIEWS</h2>
                    <div className=''>
                            <Swiper
                            // slidesPerView={2}
                            breakpoints={{
                                0: {
                                  slidesPerView: 1,
                                },
                                768:{
                                  slidesPerView:3,
                                },
                                1041:{
                                    slidesPerView:4,
                                  },
                            }}
                            spaceBetween={30}
                            pagination={{
                            clickable: true,
                            }}
                            Mousewheel={true}
                            modules={[Pagination]}
                            className="customerReview_slide"
                            >
                                <SwiperSlide className='h-full'>
                                    <div className='reviewBx text-center border rounded-xl p-4 h-full'>
                                        <div className='mb-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="38" height="38" fill="#ec2044">
                                                <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
                                            </svg>
                                        </div>
                                        <p className='text-base mb-6'>
                                            Everything tasted fresh and healthy, just like how my mom would make it.
                                        </p>
                                        <h3 className='text-lg font-semibold mb-0'>Lela Mcgee</h3>
                                        <h2 className='text-base text-headGray mb-0'>Mar 07, 2024 </h2>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='reviewBx text-center border rounded-xl p-4'>
                                        <div className='mb-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="38" height="38" fill="#ec2044">
                                                <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
                                            </svg>
                                        </div>
                                        <p className='text-base mb-6'>
                                            Homemade food without excess of spices, oil or salt. I absolutely loved it! salt. 
                                        </p>
                                        <h3 className='text-lg font-semibold mb-0'>Susan O</h3>
                                        <h2 className='text-base text-headGray mb-0'>Mar 05, 2024 </h2>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='h-full'>
                                    <div className='reviewBx text-center border rounded-xl p-4 h-full'>
                                        <div className='mb-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="38" height="38" fill="#ec2044">
                                                <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
                                            </svg>
                                        </div>
                                        <p className='text-base mb-6'>
                                            Everything tasted fresh and healthy, just like how my mom would make it.
                                        </p>
                                        <h3 className='text-lg font-semibold mb-0'>Lela Mcgee</h3>
                                        <h2 className='text-base text-headGray mb-0'>Apr 02, 2024 </h2>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='reviewBx text-center border rounded-xl p-4'>
                                        <div className='mb-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="38" height="38" fill="#ec2044">
                                                <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
                                            </svg>
                                        </div>
                                        <p className='text-base mb-6'>
                                            Homemade food without excess of spices, oil or salt. I absolutely loved it! salt. 
                                        </p>
                                        <h3 className='text-lg font-semibold mb-0'>Susan O</h3>
                                        <h2 className='text-base text-headGray mb-0'>Mar 05, 2024 </h2>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='h-full'>
                                    <div className='reviewBx text-center border rounded-xl p-4 h-full'>
                                        <div className='mb-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="38" height="38" fill="#ec2044">
                                                <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
                                            </svg>
                                        </div>
                                        <p className='text-base mb-6'>
                                            Everything tasted fresh and healthy, just like how my mom would make it.
                                        </p>
                                        <h3 className='text-lg font-semibold mb-0'>Lela Mcgee</h3>
                                        <h2 className='text-base text-headGray mb-0'>Jun 10, 2024 </h2>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='reviewBx text-center border rounded-xl p-4'>
                                        <div className='mb-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="38" height="38" fill="#ec2044">
                                                <path d="M19.4167 6.67891C20.4469 7.77257 21.0001 9 21.0001 10.9897C21.0001 14.4891 18.5436 17.6263 14.9695 19.1768L14.0768 17.7992C17.4121 15.9946 18.0639 13.6539 18.3245 12.178C17.7875 12.4557 17.0845 12.5533 16.3954 12.4895C14.591 12.3222 13.1689 10.8409 13.1689 9C13.1689 7.067 14.7359 5.5 16.6689 5.5C17.742 5.5 18.7681 5.99045 19.4167 6.67891ZM9.41669 6.67891C10.4469 7.77257 11.0001 9 11.0001 10.9897C11.0001 14.4891 8.54359 17.6263 4.96951 19.1768L4.07682 17.7992C7.41206 15.9946 8.06392 13.6539 8.32447 12.178C7.78747 12.4557 7.08452 12.5533 6.39539 12.4895C4.59102 12.3222 3.16895 10.8409 3.16895 9C3.16895 7.067 4.73595 5.5 6.66895 5.5C7.742 5.5 8.76814 5.99045 9.41669 6.67891Z"></path>
                                            </svg>
                                        </div>
                                        <p className='text-base mb-6'>
                                            Homemade food without excess of spices, oil or salt. I absolutely loved it! salt. 
                                        </p>
                                        <h3 className='text-lg font-semibold mb-0'>Susan O</h3>
                                        <h2 className='text-base text-headGray mb-0'>Mar 05, 2024 </h2>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div> */}
        </div>
      </div>
    </>
  );
};

export default FilterAndDate;
