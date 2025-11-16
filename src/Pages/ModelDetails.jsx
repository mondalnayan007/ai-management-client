import React, { use, useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { BiSolidDislike } from "react-icons/bi";
import { Link, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const ModelDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [model, setModel] = useState({})
    const [loading, setLoading] = useState(true)
    const { user } = use(AuthContext)
    const modeldata = model.result;
    

    useEffect(() => {

        fetch(`http://localhost:3000/models/${id}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setModel(data)
                setLoading(false)
            }
            )
    }, [])

    const handlePurchase = () => {

        fetch(`http://localhost:3000/purchase`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...modeldata, purchasedBy:user.email})

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigate('/all-models')
                Swal.fire({
                    title: "Purchased!",
                    text: "Your model has been purchased.",
                    icon: "success"
                });
            })
            .catch(err => console.log(err))
    }



    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/models/${model._id}`, {
                    method: 'DELETE',

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        navigate('/all-models')
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(err => console.log(err))


            }
        });
    }

    if (loading) {
        return <p>Loading...</p>
    } else {
        return (
            <div className="w-full flex justify-center p-6 bg-gray-100 min-h-screen">
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 border h-auto">

                    <div className="flex items-center gap-4 border-b pb-4">
                        <img
                            className="h-16 w-16 rounded-full p-1 border object-cover"
                            src={model.result.image}
                            alt={model.result.name}
                        />
                        <div>
                            <h1 className="text-2xl font-semibold">{model.result.name}</h1>
                            <p className="text-gray-500 text-sm">Created on {model.result.createdAt}</p>
                        </div>
                    </div>


                    <div className="mt-6 grid grid-cols-6  gap-3 text-gray-700">
                        {/* <p><span className="font-semibold">Framework:</span> {model.framework}</p>
                    <p><span className="font-semibold">Use Case:</span> {model.useCase}</p>
                    <p><span className="font-semibold">Dataset:</span> {model.dataset}</p>
                    <p><span className="font-semibold">Description:</span> {model.description}</p>
                    <p><span className="font-semibold">Purchased:</span> {model.purchasedCount} times</p> */}
                        <div className='col-span-4'>
                            <h1 className='text-4xl font-bold'>{model.result.name}</h1>
                            <p className='font-semibold my-2'> {model.result.framework}</p>
                            <p className='my-3'>{model.result.description}</p>

                        </div>
                        <div className='flex items-center justify-end '>

                            <img
                                className=" h-40 w-40"
                                src={model.result.image}
                                alt={model.result.name}
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

                        <button onClick={handlePurchase} className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
                            Purchase Model
                        </button>
                        <Link to={`/update-model/${model._id}`} className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-center">
                            Update Model
                        </Link>
                        <button onClick={handleDelete} className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
                            Delete Model
                        </button>
                    </div>
                </div>
            </div>
        );
    }


};

export default ModelDetails;
