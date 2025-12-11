import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';

const AllModels = () => {
    const allModels = useLoaderData();

    const [models, setModels] = useState(allModels);

    // 🔍 Search Function
    const handleSearch = (e) => {
        e.preventDefault();
        const search_text = e.target.search.value;

        fetch(`http://localhost:3000/search?search=${search_text}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setModels(data)
            })
            .catch(err => console.log(err))
    }

    // 🎯 Filter Function
    const handleFilter = (e) => {
        const category = e.target.value;

        fetch(`http://localhost:3000/filter?framework=${category}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setModels(data);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className='flex items-center justify-between gap-4 mx-10 my-5'>
                
                    
                        <span className='px-2 py-1 rounded-full bg-blue-400 text-white font-semibold text-xs md:text-sm '><Link to='/add-model' >+ Add Model</Link></span>
                    
               

                <div className='grid grid-cols-8 items-center justify-between gap-4'>
                    <div className='col-span-4'>
                        <form onSubmit={handleSearch}>
                            <div className="join">
                                <div>
                                    <label className="input validator join-item">
                                        <input name='search' type="search" placeholder="Search model..." />
                                    </label>
                                    <div className="validator-hint hidden">Enter valid email address</div>
                                </div>
                                <button className=" px-2 py-1 bg-blue-400 text-white font-stretch-semi-condensed  join-item text-sm md:text-base">Search</button>
                            </div>
                        </form>
                    </div>

                    {/* 🔽 FILTER SELECT */}
                    <div className='w-full col-span-4'>
                        <select
                            name="category"
                            className="select select-bordered join-item w-full"
                            onChange={handleFilter}
                        >
                            <option value="">All</option>
                            <option value="TensorFlow">TensorFlow</option>
                            <option value="PyTorch">PyTorch</option>
                            <option value="Diffusion">Diffusion Model</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 md:px-14'>
                {
                    models?.map(model => <Card key={model._id} model={model}></Card>)
                }
            </div>
        </div>
    );
};

export default AllModels;
