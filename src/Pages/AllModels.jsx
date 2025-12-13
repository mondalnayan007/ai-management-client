import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';

const AllModels = () => {
    const allModels = useLoaderData();

    const [models, setModels] = useState(allModels);
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("");

  
    const fetchFilteredModels = (newSearch, newCategory) => {
        const url = `https://ai-management-server.vercel.app/search-filter?search=${newSearch}&category=${newCategory}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setModels(data);
            })
            .catch(err => console.log(err));
    };

    //  Search Handler
    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearchText(text);
        fetchFilteredModels(text, category);
    };

    //  Filter Handler
    const handleFilter = (e) => {
        const value = e.target.value;
        setCategory(value);

       
        if (!value && !searchText) {
            setModels(allModels);
            return;
        }

        fetchFilteredModels(searchText, value);
    };

    return (
        <div>
            <div className='flex items-center justify-between gap-4 mx-10 my-5'>
                <span className='px-2 py-1 rounded-full bg-blue-400 text-white font-semibold text-xs md:text-sm '>
                    <Link to='/add-model'>+ Add Model</Link>
                </span>

                <div className='grid grid-cols-8 items-center justify-between gap-4'>
                    
                    {/* Search */}
                    <div className='col-span-4'>
                        <form onSubmit={handleSearch}>
                            <div className="join">
                                <div>
                                    <label className="input validator join-item">
                                        <input
                                            name='search'
                                            type="search"
                                            placeholder="Search model..."
                                        />
                                    </label>
                                </div>
                                <button className="px-2 py-1 bg-blue-400 text-white join-item">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Filter Dropdown */}
                    <div className='w-full col-span-4'>
                        <select
                            name="category"
                            className="select select-bordered join-item w-full"
                            onChange={handleFilter}
                        >
                            <option value="">All</option>
                            <option value="TensorFlow">TensorFlow</option>
                            <option value="PyTorch">PyTorch</option>
                            <option value="Diffusion Model">Diffusion Model</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Models Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 md:px-14'>
                {
                    models?.map(model => <Card key={model._id} model={model} />)
                }
            </div>
        </div>
    );
};

export default AllModels;
