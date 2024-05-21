import React from 'react'
import Header from '../components/Header'
export const OrderReview = () => {
    return (
        <>
            <div className=''>
                <Header />
                <div className='container mx-auto p-5'>
                    <div className='mt-6 p-5 bg-white rounded-xl border border-borderClr'>
                        <div className=''>
                            <h3 className='text-xl font-semibold leading-tight border-b pt-2 pb-3 mb-0'>Order Review</h3>
                        </div>
                        <div className='overflow-x-auto w-full'>
                            <table className="text-left w-full menuTable border-0">
                                <thead>
                                    <tr className='border-b'>
                                        <th className='w-[15%]' >User Name</th>
                                        <th className='w-[15%]'>Dish</th>
                                        <th className='w-[40%]'>Review</th>
                                        <th className='w-[15%]'>Status</th>
                                        <th className='w-[15%]'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b'>
                                        <td>
                                            <h4 className='text-[14px] mb-1 leading-tight'>David Borja</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>Fish Cutlus</h4>
                                            <p className='text-primaryGreen text-[14px]'>#ID03456</p>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>
                                                Professionalism, dedication, and fun, is how I describe the coaching and team at this excellent soccer academy.
                                                The coaching is professional and comprehensive, targeting exactly the skills and strategies necessary to
                                                bring out the best in each player. Coach Giorgio is an outstanding
                                            </h4>
                                        </td>
                                        <td>
                                            <select id="selectOption">
                                                <option value="">Approve</option>
                                                <option value="option1">Hold</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className='bg-primaryDark py-1 px-4 rounded-md text-white text-base font-semibold'>Submit</button>
                                        </td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td>
                                            <h4 className='text-[14px] mb-1 leading-tight'>Brian Huerter</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>Classic Masri Koshari</h4>
                                            <p className='text-primaryGreen text-[14px]'>#ID54324</p>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>
                                                Professionalism, dedication, and fun, is how I describe the coaching and team at this excellent soccer academy.
                                                The coaching is professional and comprehensive, targeting exactly the skills and strategies necessary to
                                                bring out the best in each player. Coach Giorgio is an outstanding
                                            </h4>
                                        </td>
                                        <td>
                                            <select id="selectOption">
                                                <option value="">Approve</option>
                                                <option value="option1">Hold</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className='bg-primaryDark py-1 px-4 rounded-md text-white text-base font-semibold'>Submit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}
export default OrderReview