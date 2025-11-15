import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateModel = () => {
    const data = useLoaderData();
        const model = data.result;
    return (
      <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Update Your Model</h1>
                        
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form  className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name='name' defaultValue={model.name} className="border border-slate-200 rounded-md px-2 py-3" placeholder="Name" />

                                <label className="label">Framework</label>
                                <input type="text" name='framework' defaultValue={model.framework} className="border border-slate-200 rounded-md px-2 py-3" placeholder="Framework" />
                                <label className="label">Use Case</label>
                                <input type="text" name='useCase' defaultValue={model.useCase} className="border border-slate-200 rounded-md px-2 py-3" placeholder="Use Case" />

                                <label className="label">Data Set</label>
                                <input type="text" name='dataSet' defaultValue={model.dataSet} className="border border-slate-200 rounded-md px-2 py-3" placeholder="Data set" />

                                <label className="label">Description</label>
                                <textarea defaultValue={model.description} className='border  border-slate-200 rounded-lg px-3 py-3' name="description" id="" cols="30" rows="7" placeholder='Description'></textarea>


                                <label className="label">Image URL</label>
                                <input type="text" defaultValue={model.image} name='image' className="border border-slate-200 rounded-md px-2 py-3" placeholder="Image URL" />
                                
                                
                                <button className="btn btn-neutral mt-4">Update Model</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModel;