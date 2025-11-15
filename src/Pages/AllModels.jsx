import React from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';


const AllModels = () => {
     const models = useLoaderData();
    return (
        <div>
            <div>
            <Link to='/add-model' className='p-2 rounded-full bg-blue-400 text-white font-semibold'>+ Add Model</Link>
        </div>
        <div className='grid grid-cols-4 gap-4'>
            {
                models.map(model => <Card model={model}></Card>)
            }
           
           
        </div>
        </div>
    );
};

export default AllModels;