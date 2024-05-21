import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TopBanner from '../components/becomeChefWidgets/TopBanner'
import WhatIsShef from '../components/becomeChefWidgets/WhatIsShef'
import WhyBecomeShef from '../components/becomeChefWidgets/WhyBecomeShef'
import HowToSell from '../components/becomeChefWidgets/HowToSell'
import ReadyToStart from '../components/becomeChefWidgets/ReadyToStart'

export const BecomeChef = () => {
    return (
        <>
            <Header />
            <TopBanner />
            <WhatIsShef />
            <WhyBecomeShef />
            <HowToSell />
            <ReadyToStart />
            <Footer />
        </>
    )
}
export default BecomeChef