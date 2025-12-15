import React from 'react';
import error from '../assets/error.png'
import { Link } from 'react-router';
const ErrorPage = () => {
    return (
        <div className='min-h-screen'>
            <div className='flex items-center justify-center  w-full'>
                <img src={error} alt="" />
            </div>

            <div className='flex justify-center my-6'>
                <Link to='/'><button className='btn bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white font-semibold  py-2  w-full'> Back to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;