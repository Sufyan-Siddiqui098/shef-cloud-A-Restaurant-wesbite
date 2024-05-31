import React, { useState, useRef, useEffect } from 'react';
const IngredientsScreen = ({updateFields, logo}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Image handling
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // --- Update logo in Chef-Menu
            updateFields({ logo: file })
            const reader = new FileReader();
            reader.onload = () => {
                // Set the selected image in state
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Getting image from Chef-Menu
    useEffect(()=> {
        if(logo){
            const reader = new FileReader();
            reader.onload = () => {
                // Set the selected image in state
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(logo);
        }
        console.log("logo is running ")
    }, [logo])

    const handleBoxClick = () => {
        // Trigger click on the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div>
            <div className='container mx-auto'>
                <div className='lg:w-2/3 sm:w-4/5 mx-auto'>
                    <h2 className='text-2xl font-semibold border-b mb-8 pb-2'>Photo</h2>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-3 leading-tight'>Upload Photo</h3>
                        <div className=''>
                            <ul className='mb-0 mt-2 pl-5'>
                                <li className='list-disc leading-tight text-lg mb-1'>
                                    Use a circular, white bowl or plate.
                                </li>
                                <li className='list-disc leading-tight text-lg mb-1'>
                                    Take the photo from directly above. Be careful not to tilt.
                                </li>
                                <li className='list-disc leading-tight text-lg mb-1'>
                                    Use natural sunlight during the day, not lighting from lamps of flash.
                                </li>
                                <li className='list-disc leading-tight text-lg mb-1'>
                                    Include the entire plate/bowl in the photo—don't cut off any edges.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className='mt-4'>
                                <div className='w-full h-[300px] border-2 border-secondary border-dashed rounded-xl overflow-hidden relative cursor-pointer'
                                    onClick={handleBoxClick}
                                >
                                    {selectedImage ? (
                                        <div className='relative'>
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                className='w-full h-full object-cover'
                                            />
                                            <p className='absolute top-2 right-2 z-1 bg-white rounded-md font-semibold text-base px-3 py-1 h-auto' >Change Image</p>
                                        </div>
                                    ) : (
                                        <div className='text-center flex flex-col items-center justify-center h-full'>
                                            <svg className="sc-jSgupP ckDfJz" height="35" width="40" viewBox="0 0 33 28" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <path d="M10.5 5.5C8.8125 5.5 7.5 6.875 7.5 8.5C7.5 10.1875 8.8125 11.5 10.5 11.5C12.125 11.5 13.5 10.1875 13.5 8.5C13.5 6.875 12.125 5.5 10.5 5.5ZM28.9375 0H4.9375C2.75 0 0.9375 1.8125 0.9375 4V24C0.9375 26.25 2.75 28 4.9375 28H28.9375C31.125 28 32.9375 26.25 32.9375 24V4C32.9375 1.8125 31.1875 0 28.9375 0ZM29.9375 23.625L21.375 12C21.1875 11.6875 20.875 11.5 20.5 11.5C20.0625 11.5 19.75 11.6875 19.5 12L12.875 21L10.5625 18.125C10.3125 17.875 10 17.6875 9.625 17.6875C9.25 17.6875 8.9375 17.875 8.6875 18.125L4 24L3.9375 4C3.9375 3.5 4.4375 3 4.9375 3H28.9375C29.5 3 29.9375 3.5 29.9375 4V23.625Z" fill="#383838" className="sc-iBPRYJ bDhIKt"></path>
                                            </svg>
                                            <h3 className='text-2xl font-semibold mb-1 mt-3'>Upload your photo here </h3>
                                        </div>
                                    )}
                                </div>
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default IngredientsScreen;
