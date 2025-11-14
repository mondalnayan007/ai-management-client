import React from 'react';
import { Link } from 'react-router-dom';


const AllModels = () => {
    return (
        <div>
            <Link to='/add-model' className='p-2 rounded-full bg-blue-400 text-white font-semibold'>+ Add Model</Link>
        </div>
    );
};

export default AllModels;