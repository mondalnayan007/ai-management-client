import React from 'react';
import { useLoaderData } from 'react-router';
import Card from '../Components/Card';
import Slider from '../Components/Slider';

const Home = () => {
    const models = useLoaderData();
    
    return (
        <div className='px-4 md:px-14'>
            <Slider></Slider>
            <h1 className='text-2xl font-bold my-4'>Latest Models</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4'>
            {
                models.map(model => <Card model={model}></Card>)
            }
           
           
        </div>
        </div>
    );
};

export default Home;