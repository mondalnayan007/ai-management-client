import React, { useContext, useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { BiSolidDislike } from "react-icons/bi";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';


const ModelDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [model, setModel] = useState({})
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)
    const modeldata = model.result;

    

    useEffect(() => {
        if (!id || !user?.accessToken) return;

        fetch(`https://ai-management-server.vercel.app/models/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setModel(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [id, user?.accessToken])

    const handlePurchase = () => {

        if (!modeldata) return;

        const finalModel = {
            name: modeldata.name,
            framework: modeldata.framework,
            useCase: modeldata.useCase,
            dataset: modeldata.dataset,
            description: modeldata.description,
            image: modeldata.image,
            createdBy: modeldata.createdBy,
            createdAt: new Date(),
            purchased: modeldata.purchased,
            purchasedBy: user?.email
        }

        fetch(`https://ai-management-server.vercel.app/purchase/${modeldata._id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalModel)

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

    const vote =()=>{
        Swal.fire('Thanks for your feedback!')
    }

    const handleDelete = () => {
        if (!modeldata) return;

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

                fetch(`https://ai-management-server.vercel.app/models/${modeldata._id}`, {
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



    if (loading || !model?.result) {
        return <p>Loading...</p>
    } else {
        return (
            <div className="w-full flex justify-center p-6  ">
                <div className="w-full max-w-6xl  rounded-2xl shadow-md p-6 border h-auto">

                    <div className="flex items-center justify-between ">
                        <div className='flex items-center gap-4 border-b pb-4'>
                            <img
                                className="h-16 w-16 rounded-full p-1 border object-cover"
                                src={model.result.image}
                                alt={model.result.name}
                            />
                            <div>
                                <h1 className="text-2xl font-semibold">{model.result.name}</h1>
                                <p className=" text-sm">Created on {model.result.createdAt}</p>
                            </div>
                        </div>
                        <div>
                            <p>Purchased : {modeldata.purchased}</p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-6  gap-3 ">
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

                    <div className="join join-vertical lg:join-horizontal mt-4">
                        <button className="btn  join-item">Vote : </button>
                        <button className="btn join-item" onClick={vote}><BiSolidLike /></button>
                        <button className="btn join-item" onClick={vote}><BiSolidDislike /></button>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">

                        
                        {model.result.createdBy === user?.email ? (
                            <div className="flex flex-col gap-4">
                                
                                <Link
                                    to={`/update-model/${modeldata._id}`}
                                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-center"
                                >
                                    Update Model
                                </Link>

                                <button
                                    onClick={handleDelete}
                                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                                >
                                    Delete Model
                                </button>
                            </div>
                        ) : (
                          
                            <button
                                onClick={handlePurchase}
                                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                            >
                                Purchase Model
                            </button>
                        )}

                    </div>

                </div>
            </div>
        );
    }
};

export default ModelDetails;
// ...existing code...  
