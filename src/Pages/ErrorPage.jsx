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
                <Link to='/'><button className='btn bg-blue-400 text-white font-semibold'> Back to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;