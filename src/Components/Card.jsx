import React from 'react';

const Card = ({model}) => {
    const {name,framework,useCase,description,image,createdBy,createdAt,purchased} = model
    return (
        <div>

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
           
        </div>
    );
};

export default Card;