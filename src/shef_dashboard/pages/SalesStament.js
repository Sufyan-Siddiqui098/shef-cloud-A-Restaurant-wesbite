import React from 'react'
import Header from '../components/Header'
export const SalesStament = () => {
    return (
        <>
            <div className=''>
                <Header />
                <div className='container mx-auto p-5'>
                    <div className='mt-6 p-5 bg-white rounded-xl border border-borderClr'>
                        <div className=''>
                            <h3 className='text-xl font-semibold leading-tight border-b pt-2 pb-3 mb-0'>My Wallet</h3>
                            <div className='pt-4 text-center'>
                                <h4 className='text-5xl font-bold mb-0'>0</h4>
                                <h5 className='text-lg font-semibold leading-tight mt-2 mb-0' >WALLET BALANCE</h5>
                            </div>
                        </div>
                    </div >
                    <div className='mt-6 p-5 bg-white rounded-xl border border-borderClr'>
                        <div className='flex md:flex-row flex-col justify-between items-center gap-2 border-b pb-3'>
                            <h3 className='text-xl font-semibold leading-tight md:mb-0 mb-2'>Wallet Transaction History</h3>
                            <div className='flex items-center gap-2'>
                                <button className='bg-primaryDark py-1 px-4 rounded-md text-white text-base font-semibold'>Recent Transactions</button>
                                <button className='bg-primaryDark py-1 px-4 rounded-md text-white text-base font-semibold'>All Transactions</button>
                            </div>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className="text-left w-full menuTable border-0">
                                <thead>
                                    <tr className='border-b'>
                                        <th className='w-[15%]' >ID</th>
                                        <th className='w-[15%]'>Date</th>
                                        <th className='w-[40%]'>Detail</th>
                                        <th className='w-[15%]'>Amount</th>
                                        <th className='w-[15%]'>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b'>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight font-semibold'>#ID03456</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-1 leading-tight'>20/2/2024</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>Standard Chartered Transfer</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>$30.50</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>$10,000</h4>
                                        </td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight font-semibold'>#ID04567</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-1 leading-tight'>21/2/2024</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>Standard Chartered Transfer</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>$20.50</h4>
                                        </td>
                                        <td>
                                            <h4 className='text-[14px] mb-0 leading-tight'>$20,000</h4>
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
export default SalesStament