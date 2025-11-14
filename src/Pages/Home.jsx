import React from 'react';
import { useLoaderData } from 'react-router';
import Card from '../Components/Card';

const Home = () => {
    const models = useLoaderData();
    console.log(models)
    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                models.map(model => <Card model={model}></Card>)
            }
           
           
        </div>
    );
};

export default Home;