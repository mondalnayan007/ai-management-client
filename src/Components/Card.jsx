import React from 'react';
import {Link } from 'react-router'

const Card = ({model}) => {
    const {name,framework,useCase,description,image,createdBy,createdAt,purchased,_id} = model
    return (
        <div className='p-2 shadow-xl'>

            <div className='flex items-center justify-between'>
                <h1>{name}</h1>
                <img className='h-16 w-16 rounded-full p-1 border-3' src={image} alt="" />
            </div>
            <div>
                {framework}
            </div>
            <div className='flex items-center justify-between'>
                <p>{createdAt}</p>
                <p>{createdBy}</p>
            </div>
            <div><p>{description}</p></div>

           
                <Link to={`/model-details/${_id}`} className='btn rounded-full bg-gray-300  py-2  w-full'>View Details</Link>
            
           
        </div>
    );
};

export default Card;