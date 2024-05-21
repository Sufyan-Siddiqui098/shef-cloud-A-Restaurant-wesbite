import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Sidebar extends Component {

    render() {
        return (
            <div className=''>
                <div className='bg-primaryDark h-screen'>
                    <div className='fixed'>
                        <div className='px-4  h-[70px] flex items-center'>
                            <div className='font-bold text-white text-xl'>
                                Admin Pannel
                            </div>
                        </div>
                        <ul className='text-lg text-white p-4'>
                            <li className=' py-3'>
                                <Link to="/shef/dashboard" className='flex items-center !text-white gap-x-4'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)">
                                            <path d="M13 21V11H21V21H13ZM3 13V3H11V13H3ZM9 11V5H5V11H9ZM3 21V15H11V21H3ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 3H21V9H13V3ZM15 5V7H19V5H15Z"></path>
                                        </svg>
                                    </div>
                                    Dashboard
                                </Link>
                            </li>
                            <li className=' py-3'>
                                <Link to='/shef/profile' className='flex items-center !text-white gap-x-4'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)">
                                            <path d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"></path>
                                        </svg>
                                    </div>
                                    Profile
                                </Link>
                            </li>
                            <li className=' py-3'>
                                <Link to='/shef/my-menu' className='flex items-center !text-white gap-x-4'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(255,255,255,1)">
                                            <path d="M14.2683 12.1466L13.4147 13.0002L20.4858 20.0712L19.0716 21.4854L12.0005 14.4144L4.92946 21.4854L3.51525 20.0712L12.854 10.7324C12.2664 9.27549 12.8738 7.17715 14.4754 5.57554C16.428 3.62292 19.119 3.14805 20.4858 4.51488C21.8526 5.88172 21.3778 8.57267 19.4251 10.5253C17.8235 12.1269 15.7252 12.7343 14.2683 12.1466ZM4.22235 3.80777L10.9399 10.5253L8.11144 13.3537L4.22235 9.46463C2.66026 7.90253 2.66026 5.36987 4.22235 3.80777ZM18.0109 9.11107C19.2682 7.85386 19.5274 6.38488 19.0716 5.92909C18.6158 5.47331 17.1468 5.73254 15.8896 6.98975C14.6324 8.24697 14.3732 9.71595 14.829 10.1717C15.2847 10.6275 16.7537 10.3683 18.0109 9.11107Z"></path>
                                        </svg>
                                    </div>
                                    My Menu
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='w-[350px]'></div>
            </div>
        )
    }
}

export default Sidebar