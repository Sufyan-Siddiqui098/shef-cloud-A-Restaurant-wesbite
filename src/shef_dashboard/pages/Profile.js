import React from 'react'
import ProfileForm from '../components/profileWidgets/ProfileForm';
import ProfileDetail from '../components/profileWidgets/ProfileDetail';
import Header from '../components/Header';

export const Profile = () => {

    return (
        <>
            <div className=''>
                <Header />
                <div className='container mx-auto p-5'>
                    <ProfileDetail />
                    <ProfileForm />
                </div>
            </div>

        </>
    )
}
export default Profile