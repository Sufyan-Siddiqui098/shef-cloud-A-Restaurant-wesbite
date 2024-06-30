import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroBanner from '../components/homeWidget/HeroBanner'
// import LocalChef from '../components/homeWidget/LocalChef'
import MostLoveChef from '../components/homeWidget/MostLoveChef'
import CustomerReviews from '../components/homeWidget/CustomerReviews'
import MeetChef from '../components/homeWidget/MeetChef'
import CommunityStories from '../components/homeWidget/CommunityStories'
import Subscriber from '../components/homeWidget/Subscriber'
import BrowsByCategories from '../components/homeWidget/BrowsByCategories'
import PopularCollection from '../components/homeWidget/PopularCollection'
import { useSelector } from 'react-redux'
import RegionDropdown from '../components/RegionDropdown'
import { toast } from 'react-toastify'

export const Home = () => {
    const [ regionAvailable, setRegionAvailable ] = useState(localStorage.getItem("region") ? true : false);
  
    //Modal Region Selection
    const OnSelectRegion = () =>{
      if(localStorage.getItem('region')){
        setRegionAvailable(true);
        window.location.reload();
      } 
      else {
        console.log("Please select region")
        toast.dismiss();
        toast.error("Please select the region")
      }
    }

    const { userInfo } = useSelector(state => state.user);

    return (
      <>
        <div
          className={
            !regionAvailable
              ? "fixed top-0 bottom-0 h-[100vh] w-[100vw] px-4 z-30 bg-[#121212c0] flex justify-center items-center"
              : "hidden"
          }
        >
          {/* Modal */}
          <div className="bg-white min-w-[200px] w-[100%] max-w-[350px] p-2 py-6 rounded shadow-sm flex flex-col gap-2 ">
            <h2 className="text-base font-semibold">Select Region</h2>
            <RegionDropdown isHome={true} OnSelectRegion={OnSelectRegion}  />
          </div>
        </div>
        <Header />
        {!userInfo && <HeroBanner />}
        <BrowsByCategories />
        <PopularCollection />
        {/* <LocalChef/> */}
        <MostLoveChef />
        <MeetChef />
        <CustomerReviews />
        <CommunityStories />
        <Subscriber />

        <Footer />
      </>
    );
}
export default Home