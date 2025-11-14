import React from 'react';

const Card = ({model}) => {
    return (
        <div>
           <h1>{model.name}</h1> 
           <img src={model.image} alt="" />
        </div>
    );
};

export default Card;