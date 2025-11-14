import React from 'react';
import { useLoaderData } from 'react-router';
import Card from '../Components/Card';

const Home = () => {
    const models = useLoaderData();
    console.log(models)
    return (
        <div>
            {
                models.map(model => <Card model={model}></Card>)
            }
             <img src={models.image} alt="" />
           
        </div>
    );
};

export default Home;