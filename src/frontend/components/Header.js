import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import '../assets/css/theme.css'
import '../assets/css/main-style.css'
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../store/slice/user';
import { toast } from 'react-toastify';
import { emptyCart, removeFromCart } from '../../store/slice/cart';
import RegionDropdown from './RegionDropdown';
import isValidURL from '../../ValidateUrl';
import { handleGetAllDishesOfCity } from '../../services/get_without_auth';

const Header = () => {
    const [isBoxVisible, setBoxVisible] = useState(false);
    const [isEmptyModalVisible, setEmptyModalVisible] = useState(false);
    // ---- Search bar Start 
    const [allDishes, setAllDishes] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    //Search bar
    const [search, setSearch] = useState('');
    // matched dishes
    const [ matchedDish, setMatchedDish ] = useState([]);

    // ----- Search Bar End

    // Fetch dishes for search bar
    useEffect(() => {
      const city = JSON.parse(localStorage.getItem("region"));
      const fetchAllDishes = async () => {
        try {
          setIsFetching(true);
          const dishResponse = await handleGetAllDishesOfCity(city.id);
          console.log("Dishes for search bar ", dishResponse);
          setAllDishes(dishResponse);
        } catch (error) {
          console.error("Error while fetching dishes \n", error);
        } finally {
          setIsFetching(false);
        }
      };
      console.log("useEffect for search bar dishes")

      fetchAllDishes();
    }, []);

    // filtering with debouncing
    useEffect(() => {
        const handleSearch = setTimeout(() => {
            const searchedDish = allDishes.filter((dish) =>
                dish.name.toLowerCase().includes(search.trim().toLowerCase())
            );
            setMatchedDish(searchedDish);
        }, 300); // 300ms debounce time, adjust as necessary
    
        return () => clearTimeout(handleSearch);
    }, [search, allDishes]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector(state => state.user);

    const toggleBox = () => {
        setBoxVisible(!isBoxVisible);
    };

    const handleSignOut = ()=>{
        dispatch(signOutUser()); 
        dispatch(emptyCart())
        toast.success("Logout Successfully ")
        navigate('/')
    }
    const Modal = ({ isVisible, onClose, onConfirm }) => {
        if (!isVisible) return null;
      
        return (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Are you sure?</h2>
              <p>Do you really want to empty your bag?</p>
              <button onClick={onClose}  style={{ backgroundColor: '#ccc' }}>Cancel</button>
              <button onClick={onConfirm} style={{ backgroundColor: '#f00', color: '#fff' }}>Confirm</button>
            </div>
          </div>
        );
      };
    const handleEmptyCart = () => {
        dispatch(emptyCart());
        setEmptyModalVisible(false); // Close the modal after emptying the cart
    };
    // Cart from -- Redux store
    const { cartItem } = useSelector((state) => state.cart);
    // const subTotal = cartItem.reduce((acc, item) => acc + (item.unit_price || 0) * item.quantity, 0);
    const subTotal = cartItem.reduce((accChef, chef) => {
        const chefTotal = chef.menu.reduce((accMenu, menu) => {
            return accMenu + (menu.unit_price || 0) * menu.quantity;
        }, 0);
        return accChef + chefTotal;
    }, 0);
    

    return (
        <>
            <div>
                <Helmet>
                    <title>Home | Chef</title>
                    <link href="assets/css/style.css" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet"></link>
                </Helmet>
                <div className="header lg:px-2 sm:px-4 px-2">
                    <header className="full-width">
                        <div className="container mx-auto big-screen">
                            <div className="">
                                <div className="mainNavCol flex justify-between items-center gap-x-6">
                                    <div className='flex justify-start items-center gap-x-4'>
                                        <div className="catring parent-megamenu flex items-center">
                                            <button onClick={toggleBox}>
                                                {isBoxVisible
                                                    ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="rgba(0,0,0,1)">
                                                        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                                    </svg>
                                                    :
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(50,50,50,1)"><path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
                                                    </span>
                                                }
                                            </button>
                                            {/* Open Menu Box */}
                                            {isBoxVisible && (
                                                <div className="megamenu">
                                                    <div className="grid grid-cols-12 gap-x-4">
                                                        <div className="lg:col-span-3 md:col-span-4 col-span-12">
                                                            <div className="ex-collection-box h-full md:mb-0 mb-4">
                                                                <img src="/media/frontend/img/about/blog/255x200/about-section-1.jpg" className="rounded-lg img-fluid object-cover w-full md:h-full h-[170px]" alt="Top Rated Chef" />
                                                                <div className="category-type overlay padding-15">
                                                                    <NavLink className="bg-white text-base font-semibold p-3 rounded-lg absolute top-[12px] left-[12px]">Top Rated Chef</NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="lg:col-span-3 md:col-span-5 col-span-12">
                                                            <div className="">
                                                                <div className="">
                                                                    <div className="menu-style">
                                                                        <ul>
                                                                            {/* <li className='mb-3'>
                                                                                <NavLink className='!block'>
                                                                                    <div className='bg-primary rounded-[5px] px-4 md:px-2 text-base text-white font-medium text-center'>Build your Personal Meal Plan</div>
                                                                                </NavLink>
                                                                            </li> */}
                                                                            {/* <li className='mb-3'>
                                                                                <NavLink className='!block'>
                                                                                    <div className='bg-primary rounded-[5px] px-4 text-base text-white font-medium text-center'>Explore Local Chef</div>
                                                                                </NavLink>
                                                                            </li> */}
                                                                            <li className='mb-3 lg:hidden'>
                                                                                <RegionDropdown/>
                                                                            </li>
                                                                            <li className=''>
                                                                                <NavLink to='/about' className='!inline-flex !items-center gap-x-2'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
                                                                                        <path d="M14.2683 12.1466L13.4147 13.0002L20.4858 20.0712L19.0716 21.4854L12.0005 14.4144L4.92946 21.4854L3.51525 20.0712L12.854 10.7324C12.2664 9.27549 12.8738 7.17715 14.4754 5.57554C16.428 3.62292 19.119 3.14805 20.4858 4.51488C21.8526 5.88172 21.3778 8.57267 19.4251 10.5253C17.8235 12.1269 15.7252 12.7343 14.2683 12.1466ZM4.22235 3.80777L10.9399 10.5253L8.11144 13.3537L4.22235 9.46463C2.66026 7.90253 2.66026 5.36987 4.22235 3.80777ZM18.0109 9.11107C19.2682 7.85386 19.5274 6.38488 19.0716 5.92909C18.6158 5.47331 17.1468 5.73254 15.8896 6.98975C14.6324 8.24697 14.3732 9.71595 14.829 10.1717C15.2847 10.6275 16.7537 10.3683 18.0109 9.11107Z"></path>
                                                                                    </svg>
                                                                                    <div className='text-[16px] text-secondary hover:text-primary font-medium'>About us</div>
                                                                                </NavLink>
                                                                            </li>
                                                                            <li className=''>
                                                                                <NavLink to="/become-a-chef" className='!inline-flex !items-center gap-x-2'>
                                                                                    <img src="./media/frontend/img/chef-icon.svg" className='w-[16px]' alt="Become a Chef" />
                                                                                    <div className='text-[16px] text-secondary hover:text-primary font-medium'>Become a Chef</div>
                                                                                </NavLink>
                                                                            </li>
                                                                            {/* <li className=''>
                                                                                <NavLink className='!inline-flex !items-center gap-x-2'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M14.5049 2.00281C16.4379 2.00281 18.0049 3.56981 18.0049 5.50281C18.0049 6.04001 17.8839 6.54895 17.6676 7.00385L21.0049 7.00281C21.5572 7.00281 22.0049 7.45052 22.0049 8.00281V12.0028C22.0049 12.5551 21.5572 13.0028 21.0049 13.0028H20.0049V21.0028C20.0049 21.5551 19.5572 22.0028 19.0049 22.0028H5.00488C4.4526 22.0028 4.00488 21.5551 4.00488 21.0028V13.0028H3.00488C2.4526 13.0028 2.00488 12.5551 2.00488 12.0028V8.00281C2.00488 7.45052 2.4526 7.00281 3.00488 7.00281L6.34219 7.00385C6.12591 6.54895 6.00488 6.04001 6.00488 5.50281C6.00488 3.56981 7.57189 2.00281 9.50488 2.00281C10.4849 2.00281 11.3708 2.40557 12.0061 3.05459C12.639 2.40557 13.5249 2.00281 14.5049 2.00281ZM18.0049 13.0028H6.00488V20.0028H18.0049V13.0028ZM20.0049 9.00281H4.00488V11.0028H20.0049V9.00281ZM9.50488 4.00281C8.67646 4.00281 8.00488 4.67438 8.00488 5.50281C8.00488 6.2825 8.59977 6.92326 9.36042 6.99594L9.50488 7.00281H11.0049V5.50281C11.0049 4.72311 10.41 4.08236 9.64934 4.00967L9.50488 4.00281ZM14.5049 4.00281L14.3604 4.00967C13.6473 4.07782 13.0799 4.64524 13.0117 5.35835L13.0049 5.50281V7.00281H14.5049L14.6493 6.99594C15.41 6.92326 16.0049 6.2825 16.0049 5.50281C16.0049 4.72311 15.41 4.08236 14.6493 4.00967L14.5049 4.00281Z"></path></svg>
                                                                                    <div className='text-[16px] text-secondary hover:text-primary font-medium'>Gift Cards</div>
                                                                                </NavLink>
                                                                            </li> */}
                                                                            {/* <li className=''>
                                                                                <NavLink className='!inline-flex !items-center gap-x-2'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg>
                                                                                    <div className='text-[16px] text-secondary hover:text-primary font-medium'>Update zip code:123456</div>
                                                                                </NavLink>
                                                                            </li> */}
                                                                            {/* <li className=''>
                                                                                <NavLink className='!inline-flex !items-center gap-x-2'>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"></path></svg>
                                                                                    <div className='text-[16px] text-secondary hover:text-primary font-medium'>Help Center</div>
                                                                                </NavLink>
                                                                            </li> */}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="logo mainNavCol">
                                            <NavLink to='/'>
                                                <img src="/media/frontend/img/logo/line-logo.jpg" width='' className="img-fluid" alt="Logo" />
                                            </NavLink>
                                        </div>
                                        {/* Search Bar */}
                                        <div className="main-search mainNavCol lg:!block !hidden">
                                            <form className="main-search search-form full-width">
                                                <div className="grid grid-cols-9">
                                                    <div className="lg:col-span-4 col-span-7">
                                                        <div className="search-box padding-10">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19" fill="rgba(50,50,50,1)"><path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path></svg>
                                                            <input 
                                                                type="text" 
                                                                value={search} 
                                                                onChange={(e)=> setSearch(e.target.value)} 
                                                                className="form-control border border-red-500 relaive" 
                                                                placeholder="Pizza, Burger, Chinese" 
                                                            />

                                                            <div className={search?.length<1 ? "hidden" : `absolute top-[100%] bor shadow-sm p-1 pl-2 rounded-b bg-white max-h-[200px] overflow-y-auto w-full`}>
                                                                {/* Matched dishes */}
                                                                {matchedDish?.map((matched) => (
                                                                    <NavLink className="block py-2 border-b font-semibold" key={matched.id} to={`/dish-detail-single/${matched.id}`}>
                                                                        {matched.name}
                                                                    </NavLink>
                                                                ))}

                                                                {/* If no Match found */}
                                                                {matchedDish?.length<1 && !isFetching&& <p className='text-headGray text-center mt-2 border-b py-2 text-sm'>No Dish Found</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="lg:col-span-4 col-span-5 my-auto">
                                                        {/* <select className='text-lg text-primary font-semibold'>
                                                            <option>Brooklyn</option>
                                                            <option>London</option>
                                                            <option>Russia</option>
                                                        </select>
                                                        <div className="location-picker">
                                                            <input type="text" className="form-control" placeholder="Enter a new address" />
                                                        </div> */}
                                                        <RegionDropdown/>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className=''>
                                        {/*  Login & Become a chef Link*/}
                                          {!userInfo && 
                                        <div className='flex items-center gap-1 sm:gap-2 py-2'>
                                          
                                            {/* <div className='hover:bg-transparent my-1 bg-primary hover:border transition-colors rounded '> */}
                                                <NavLink 
                                                    className="font-semibold font-sans px-1 !text-white border border-transparent bg-primary rounded hover:!bg-primaryDark sm:text-lg  sm:px-3"    
                                                    to='/become-a-chef'
                                                >
                                                        Become A Chef
                                                </NavLink>
                                            {/* </div> */}
                                            {/* <div className='hover:bg-primary my-1 bg-transparent border transition rounded '> */}
                                                <NavLink 
                                                    className="font-semibold font-sans px-1 rounded !text-primary border border-primary hover:!underline sm:text-lg  sm:px-3" to='/login'
                                                >
                                                    Login
                                                </NavLink>
                                            {/* </div> */}
                                         
                                        </div>
                                            }
                                            

                                        { userInfo && <div className="right-side fw-700 mainNavCol">         
                                            {/* <!-- user account -->*/}
                                            <div className="user-details p-relative">
                                                <NavLink className="text-light-white fw-500">
                                                    {/* <img src={userInfo.profile_pic ? userInfo.profile_pic : "/media/frontend/img/user-1.png"} className="rounded-circle e" alt="userimg" /> <span className=''>{userInfo.first_name}</span> */}
                                                    <img src={(userInfo.profile_pic && isValidURL(userInfo.profile_pic)) ? userInfo.profile_pic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-full w-8 h-8 object-cover" alt="userimg" /> <span className=''>{userInfo.first_name}</span>
                                                </NavLink>
                                                <div className="user-dropdown">
                                                    <ul className='w-full'>
                                                        {/* Dashboard Link */}
                                                        {
                                                            (userInfo.is_chef ===1 || userInfo.is_admin ===1) 
                                                            && 
                                                            (
                                                            <li>
                                                                <NavLink to="/shef/dashboard">
                                                                    <div className="userIner">
                                                                        <div className="icon">
                                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px"><path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="currentColor"></path><path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="currentColor"></path></svg>
                                                                        </div>
                                                                        <span className="details">Dahsboard</span>
                                                                    </div>
                                                                </NavLink>
                                                            </li> 
                                                            )
                                                        }
                                                        <li>
                                                            <NavLink to="/order">
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM19.0049 8H5.00488V20H19.0049V8ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10V12C9.00488 13.6569 10.348 15 12.0049 15C13.6617 15 15.0049 13.6569 15.0049 12V10H17.0049V12C17.0049 14.7614 14.7663 17 12.0049 17C9.24346 17 7.00488 14.7614 7.00488 12V10H9.00488Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Orders</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        {/* Shef Order */}
                                                        {(userInfo.is_chef ===1 || userInfo.is_admin ===1) && <li>
                                                            <NavLink to="/shef/order">
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM19.0049 8H5.00488V20H19.0049V8ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10V12C9.00488 13.6569 10.348 15 12.0049 15C13.6617 15 15.0049 13.6569 15.0049 12V10H17.0049V12C17.0049 14.7614 14.7663 17 12.0049 17C9.24346 17 7.00488 14.7614 7.00488 12V10H9.00488Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Shef Orders</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>}

                                                        <li>
                                                            <NavLink to={(userInfo.is_chef ===1 || userInfo.is_admin ===1)? "/shef/profile" : "/profile"}>
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Account</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>

                                                        {/* <li>
                                                            <NavLink>
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Past Orders</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink>
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM19.0049 8H5.00488V20H19.0049V8ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10V12C9.00488 13.6569 10.348 15 12.0049 15C13.6617 15 15.0049 13.6569 15.0049 12V10H17.0049V12C17.0049 14.7614 14.7663 17 12.0049 17C9.24346 17 7.00488 14.7614 7.00488 12V10H9.00488Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Upcoming Orders</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink>
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M4 5H20V3H4V5ZM20 9H4V7H20V9ZM3 11H10V13H14V11H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V11ZM16 13V15H8V13H5V19H19V13H16Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Saved</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink>
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M1 22C1 17.5817 4.58172 14 9 14C13.4183 14 17 17.5817 17 22H15C15 18.6863 12.3137 16 9 16C5.68629 16 3 18.6863 3 22H1ZM9 13C5.685 13 3 10.315 3 7.00002C3 3.68502 5.685 1.00002 9 1.00002C12.315 1.00002 15 3.68502 15 7.00002C15 10.315 12.315 13 9 13ZM9 11C11.21 11 13 9.21002 13 7.00002C13 4.79002 11.21 3.00002 9 3.00002C6.79 3.00002 5 4.79002 5 7.00002C5 9.21002 6.79 11 9 11ZM21.5476 0.783569C22.4773 2.65651 23 4.76723 23 7.00002C23 9.23281 22.4773 11.3435 21.5476 13.2165L19.9027 12.0201C20.6071 10.4928 21 8.79231 21 7.00002C21 5.20772 20.6071 3.5072 19.9027 1.9799L21.5476 0.783569ZM18.2463 3.18451C18.732 4.36026 19 5.64884 19 7.00002C19 8.35119 18.732 9.63977 18.2463 10.8155L16.5694 9.59595C16.8485 8.78194 17 7.90867 17 7.00002C17 6.09136 16.8485 5.21809 16.5694 4.40408L18.2463 3.18451Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Refer a friend</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink>
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Account</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink>
                                                                <div className="userIner">
                                                                    <div className="icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(255,0,24,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"></path></svg>
                                                                    </div>
                                                                    <span className="details">Help</span>
                                                                </div>
                                                            </NavLink>
                                                        </li> */}
                                                    </ul>
                                                    <div onClick={handleSignOut} className="user-footer"> <NavLink>Sign Out</NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- user notification -->*/}
                                            {/* <div className="cart-btn notification-btn mr-2">
                                                <NavLink className="text-light-green fw-700">
                                                    <div className="notifyBx">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,1)">
                                                            <path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
                                                        </svg>
                                                        <span className="notifyDot"></span>
                                                    </div>
                                                </NavLink>
                                                <div className="notification-dropdown">
                                                    <div className="product-detail">
                                                        <NavLink>
                                                            <div className="img-box">
                                                                <img src="./media/frontend/img/shop-1.png" className="rounded" alt="Lil Johnny’s" />
                                                            </div>
                                                            <div className="product-about">
                                                                <p className="text-light-black">Lil Johnny’s</p>
                                                                <p className="text-light-white">Spicy Maxican Grill</p>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                    <div className="rating-box">
                                                        <p className="text-light-black">How was your last order ?.</p>
                                                        <div className="ratingStar d-flex align-items-lg-center justify-content-between">
                                                            <div>
                                                                <span className="text-dark-white"><i className="fas fa-star"></i></span>
                                                                <span className="text-dark-white"><i className="fas fa-star"></i></span>
                                                                <span className="text-dark-white"><i className="fas fa-star"></i></span>
                                                                <span className="text-dark-white"><i className="fas fa-star"></i></span>
                                                                <span className="text-dark-white"><i className="fas fa-star"></i></span>
                                                            </div>
                                                            <cite className="text-light-white">Ordered 2 days ago</cite>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div> */}
                                            {/*
                                        <!-- user notification -->*/}
                                            {/* <!-- user cart -->*/}
                                            <div className="cart-btn cart-dropdown ms-0">
                                                <NavLink className="text-light-green fw-700" to='/cart'>
                                                    <div className="notifyBx">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,1)">
                                                            <path d="M7.00488 7.99966V5.99966C7.00488 3.23824 9.24346 0.999664 12.0049 0.999664C14.7663 0.999664 17.0049 3.23824 17.0049 5.99966V7.99966H20.0049C20.5572 7.99966 21.0049 8.44738 21.0049 8.99966V20.9997C21.0049 21.5519 20.5572 21.9997 20.0049 21.9997H4.00488C3.4526 21.9997 3.00488 21.5519 3.00488 20.9997V8.99966C3.00488 8.44738 3.4526 7.99966 4.00488 7.99966H7.00488ZM7.00488 9.99966H5.00488V19.9997H19.0049V9.99966H17.0049V11.9997H15.0049V9.99966H9.00488V11.9997H7.00488V9.99966ZM9.00488 7.99966H15.0049V5.99966C15.0049 4.34281 13.6617 2.99966 12.0049 2.99966C10.348 2.99966 9.00488 4.34281 9.00488 5.99966V7.99966Z"></path>
                                                        </svg>
                                                        {/* <span className="userCartCount">3</span> */}
                                                        <span className="userCartCount">
                                                            {cartItem.reduce((total, chef) => total + chef.menu.length, 0)}
                                                        </span>
                                                    </div>

                                                </NavLink>
                                                <div className="cart-detail-box overflow-y-auto max-h-[85vh]">
                                                    <div className="card">
                                                        <div className="card-header padding-15">Your Order</div>
                                                        <div className="card-body no-padding">
                                                            {/* Products from Cart */}
                                                            { cartItem.map((chef, chefIndex) => ( 
                                                                chef.menu.map((product, menuIndex)=>(
                                                                    <div key={menuIndex} className="cat-product-box">
                                                                        <div className="cat-product">
                                                                            <div className="cat-name">
                                                                                <NavLink>
                                                                                    <p className="text-light-green"><span className="text-dark-white">{product.quantity}x </span> {product.name}</p> 
                                                                                    {/* <span className="text-light-white">small, chilli chicken</span> */}
                                                                                </NavLink>
                                                                            </div>
                                                                            <div className="delete-btn">
                                                                                {/* <NavLink className="text-dark-white"> <i className="far fa-trash-alt"></i>
                                                                                </NavLink> */}
                                                                                <button 
                                                                                    onClick={() => dispatch(removeFromCart({chefIndex,menuIndex})) } className="text-dark-white"
                                                                                > 
                                                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                                                </button>
                                                                            </div>
                                                                            <div className="price"> 
                                                                                {/* <NavLink className="text-dark-white fw-500">
                                                                                { (product?.unit_price).toLocaleString('en-PK',{ style: "currency", currency: "PKR" }) 
                                                                                } 
                                                                                </NavLink> */}
                                                                                <p className="text-dark-white fw-500">
                                                                                { (product?.unit_price).toLocaleString('en-PK',{ style: "currency", currency: "PKR" }) 
                                                                                } 
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                )) 
                                                        ))}
                                                            
                                                            <div className="item-total">
                                                                <div className="total-price border-0"> <span className="text-dark-white fw-700">Items subtotal:</span>
                                                                    {/* <span className="text-dark-white fw-700">$9.99</span> */}
                                                                    <span className="text-dark-white fw-700">
                                                                        {
                                                                        subTotal.toLocaleString('en-PK',{ style: "currency", currency: "PKR" })
                                                                        } 
                                                                    </span>
                                                                </div>
                                                                <div className="empty-bag padding-15"> 
                                                                    {/* <NavLink  onClick={() => setEmptyModalVisible(true)}>Empty bag</NavLink> */}
                                                                    <button type='button' disabled={cartItem?.length===0} className='text-primary disabled:text-headGray' onClick={() => setEmptyModalVisible(true)}>Empty bag</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer padding-15"> 
                                                            <NavLink to="/cart" className="btn-first green-btn text-custom-white full-width fw-500 !text-white hover:!text-primary focus:!text-primary">
                                                                Proceed to Cart
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
                <div className='h-[60px]'></div>
                <div className='popup-modal'>
                <Modal 
                    isVisible={isEmptyModalVisible}
                    onClose={() => setEmptyModalVisible(false)}
                    onConfirm={handleEmptyCart}
                />
                </div>
            </div>
        </>
    )
}

export default Header