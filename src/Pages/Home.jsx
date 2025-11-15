import React from 'react';
import { useLoaderData } from 'react-router';
import Card from '../Components/Card';

const Home = () => {
    const models = useLoaderData();
    
    return (
        <div>
            <h1 className='text-2xl font-bold my-4'>Latest Models</h1>
            <div className='grid grid-cols-4 gap-4'>
            {
                models.map(model => <Card model={model}></Card>)
            }
           
           
        </div>
        </div>
    );
};

export default Home;