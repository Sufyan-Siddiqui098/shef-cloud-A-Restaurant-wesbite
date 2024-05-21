import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export const Faqs = () => {
    const pageBnrImg = {
        position: 'relative',
        backgroundImage: `url('./media/frontend/img/about/blog/1920x700/banner-2.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
    const accordionData = [
        {   title: 'Is this a subscription-based service?', 
            content: 'We like to think of ourselves as a subscription service with unparalleled flexibility. You can cancel, skip or reschedule at any time as long as you do so before the cutoff period.' 
        },
        {   title: 'Will I receive the same meals each week or how do I update my selections?', 
            content: 'Each meal plan is individually curated based on your needs. Each week we will send you meal recommendations based on your preferences and past orders. You can always modify those recommendations before the cut-off time.' 
        },
        {   title: 'What is the shelf life of the meals?', 
            content: 'Each dish you order on Shef will come with a label that includes a "best by" date (typically 2-3 days from the date of arrival). If you like your meals to last longer, we suggest freezing them to enjoy when you are ready! Just heat, eat…and repeat!' 
        },
        {   title: 'Are meals delivered ready to eat?', 
            content: 'Shefs pride themselves in preparing their meals with fresh, local ingredients! All meals will arrive cold in an insulated bag with frozen water bottles and each dish will have a label that includes a best by date (typically 2-3 days from the date of arrival). Feel free to heat them up for dinner or put them in the refrigerator to enjoy later—completely up to you! If you would like your meals to last longer, we suggest freezing them to enjoy when you are ready! Just heat, eat…and repeat!' 
        },
        {   title: 'What areas do you serve?', 
            content: 'Shefs are currently located across the Bay Area, Los Angeles, DC, New York, Seattle, Atlanta, Boston, Chicago, Dallas, Houston, and Austin. To see if we serve your specific area, please enter your zip code at www.shef.com. Please Note: If you have encountered an error at checkout indicating that your address is not within our service range, that usually means that your address falls outside the delivery area that our third-party delivery partner can service. While we may service your zip code, there are range limits as to how far our delivery partners can deliver. Please know that we are continually expanding our delivery areas and that we look forward to serving you in the future!' 
        },
        {   title: 'Are there any delivery fees?', 
            content: 'Delivery fees may vary depending on your area; however, all orders $25 and above get free delivery.' 
        },
        {   title: 'What happens if I am not at home during the delivery?', 
            content: 'The driver will call or text you in case you’re not at home when they arrive. If they can’t reach you, and they determine that the address is in a safe location, they will leave it outside your door. Please leave any special instructions in the “Delivery Instructions” box at checkout.' 
        },
        {   title: 'How can I track my delivery/ what to expect on Delivery Day?', 
            content: 'On the morning of your delivery day, you will receive an email explaining the details of your delivery. Your order will arrive in the delivery window that was selected at checkout. When your order is on the way or about to be delivered to you, you will receive a text (to the number you provided at checkout). Depending on where you are located, the text may include a tracking link and an ETA.' 
        },
        {   title: 'Can I cancel my order?', 
            content: <div>
                        <p>Orders can be canceled as long as you cancel before the cut-off date for your delivery (e.g., for a Sunday delivery, you would need to cancel by 11:59 p.m. on Friday). To cancel your order:</p>
                    </div> ,
        },

        
    ];
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <>
            <Header />
            <section>
                <div className='pageBanr py-20' style={pageBnrImg}>
                    <div className='container mx-auto relative z-[1] text-center'>
                        <h2 className="font-semibold text-3xl text-white uppercase text-secondary tracking-wider tracking-widest">
                            Faqs
                        </h2>
                        <ul className='inline-block text-white mb-0'>
                            <li className='inline-block text-lg'>
                                <Link to='/' className='!text-white hover:!text-primary'>Home</Link>
                            </li>
                            <li className='inline-block px-3'>/</li>
                            <li className='inline-block text-lg font-semibold text-primary'>Faqs</li>
                        </ul>
                    </div>
                </div>
                <div className='container mx-auto py-12'>
                    <div className='lg:w-2/3 mx-auto'>
                        {accordionData.map((section, index) => (
                            <div key={index} onClick={() => handleToggle(index)} style={{ cursor: 'pointer' }}>
                                <h3 className='border-b text-lg font-semibold rounded-lg px-4 py-2 mb-0'>{section.title}</h3>
                                {expandedIndex === index && 
                                    <p className='border-b border-r border-l rounded-lg p-4'>{section.content}</p>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <Footer/>
        </>
    )
}
export default Faqs