import React from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { BiSolidDislike } from "react-icons/bi";
import { Link, useLoaderData } from 'react-router';

const ModelDetails = () => {
    const data = useLoaderData();
    const model = data.result;

    return (
        <div className="w-full flex justify-center p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 border h-auto">
    
                <div className="flex items-center gap-4 border-b pb-4">
                    <img
                        className="h-16 w-16 rounded-full p-1 border object-cover"
                        src={model.image}
                        alt={model.name}
                    />
                    <div>
                        <h1 className="text-2xl font-semibold">{model.name}</h1>
                        <p className="text-gray-500 text-sm">Created on {model.createdAt}</p>
                    </div>
                </div>

               
                <div className="mt-6 grid grid-cols-6  gap-3 text-gray-700">
                    {/* <p><span className="font-semibold">Framework:</span> {model.framework}</p>
                    <p><span className="font-semibold">Use Case:</span> {model.useCase}</p>
                    <p><span className="font-semibold">Dataset:</span> {model.dataset}</p>
                    <p><span className="font-semibold">Description:</span> {model.description}</p>
                    <p><span className="font-semibold">Purchased:</span> {model.purchasedCount} times</p> */}
                    <div className='col-span-4'>
                        <h1 className='text-4xl font-bold'>{model.name}</h1>
                        <p className='font-semibold my-2'> {model.framework}</p>
                        <p className='my-3'>{model.description}</p>
                            
                    </div>
                    <div className='flex items-center justify-end '>

                         <img
                        className=" h-40 w-40"
                        src={model.image}
                        alt={model.name}
                    />

                    </div>

                </div>

                {/* <div className='flex items-center  gap-2 p-2 border rounded-full'>
                    <h1>Vote : </h1>
                     <div className='flex items-center  gap-2 '>
                        <span className='border-l p-2 border-r'></span>
                        <span></span>
                     </div>
                </div> */}

                <div className="join join-vertical lg:join-horizontal">
  <button className="btn bg-white join-item">Vote : </button>
  <button className="btn join-item"><BiSolidLike /></button>
  <button className="btn join-item"><BiSolidDislike /></button>
</div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3">
                    {model.isCreator && (
                        <div className="flex gap-4">
                            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg">
                                Edit
                            </button>
                            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg">
                                Delete
                            </button>
                        </div>
                    )}

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
                        Purchase Model
                    </button>
                    <Link to={`/update-model/${model._id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-center">
                        Update Model
                    </Link>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
                        Purchase Model
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelDetails;
