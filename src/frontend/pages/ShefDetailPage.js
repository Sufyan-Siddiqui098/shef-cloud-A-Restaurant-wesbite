import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChefContent from '../components/chefDetailWidgets/ChefContent'
import FilterAndDate from '../components/chefDetailWidgets/FilterAndDate'

export const ShefDetailPage = () => {
    return (
        <>
            <Header />
            <div className='shefDetail_page'>
                <ChefContent />
                <FilterAndDate />
            </div>
            <Footer />
        </>
    )
}
export default ShefDetailPage