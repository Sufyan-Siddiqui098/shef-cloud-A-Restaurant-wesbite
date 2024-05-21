import React from 'react'
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

export const Home = () => {
    return (
        <>
            <Header />
                <HeroBanner/>
                <BrowsByCategories/>
                <PopularCollection/>
                {/* <LocalChef/> */}
                <MostLoveChef/>
                <MeetChef/>
                <CustomerReviews/>
                <CommunityStories/>
                <Subscriber/>
                
            <Footer />
        </>
    )
}
export default Home