import React from 'react';
import {Link } from 'react-router'

const Card = ({model}) => {
    const {name,framework,useCase,description,image,createdBy,createdAt,purchased,_id} = model

      const truncateDescription = (text, wordLimit = 10) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };
    return (
        <div className='p-3 rounded-xl shadow-xl'>

            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>{name}</h1>
                <img className='h-16 w-16 rounded-full p-1 border-3' src={image} alt="" />
            </div>
            <div className='font-semibold py-2 '>
                {framework}
            </div>
            <div className='flex items-center justify-between text-sm my-4'>
                <p className='text-xs'>{createdAt}</p>
                <p>{createdBy}</p>
            </div>
            <div> <p>{truncateDescription(description, 10)}</p></div>

           
                <Link to={`/model-details/${_id}`} className=' mt-4 btn rounded-full bg-gray-300  py-2  w-full'>View Details</Link>
            
           
        </div>
    );
};

export default Card;