import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChefContent from '../components/chefDetailWidgets/ChefContent'
import FilterAndDate from '../components/chefDetailWidgets/FilterAndDate'
import { handleGetChefWithDishes } from '../../services/get_without_auth'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ShefDetailPage = () => {

    const {chefId} = useParams();
    const [chefAndDishes, setChefAndDishes] = useState([]);
    // Get chef with dishes
    useEffect(()=> { 
        (async()=>{
            try { 
                const city = JSON.parse( localStorage.getItem('region') );
                const response = await handleGetChefWithDishes(chefId, city.id);
                console.log("response of chef with dishes ", response);
                setChefAndDishes(response)

            } catch(error) {
                console.error(error)
                console.error("message", error.message)
                const message = error.message;
                if(message === "Request failed with status code 404") {
                    toast.error("chef isn't found in this city")
                    
                }
                    
            }
        }) ()
    }, [chefId])
    // console.log(chefAndDishes)
    return (
        <>
            <Header />
            <div className='shefDetail_page'>
                <ChefContent chefAndDishes={chefAndDishes} />
                <FilterAndDate chefAndDishes={chefAndDishes} />
            </div>
            <Footer />
        </>
    )
}
export default ShefDetailPage