import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const AddModels = () => {
    const {user} = use(AuthContext)

    const handleSubmit = (e)=>{
       e.preventDefault();
       const formData = {
        name: e.target.name.value,
        framework: e.target.framework.value,
        useCase: e.target.useCase.value,
        dataSet: e.target.dataSet.value,
        description: e.target.description.value,
        image : e.target.image.value,
        createdBy : user.email,
        Purchased : 0,
        createdAt : new Date(),
       }
       fetch('http://localhost:3000/models',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
       })
       .then(res =>res.json())
       .then(data =>{
        toast.success('Succesfully Added')
        console.log(data)
       })
       .catch(err =>console.log(err))

       e.target.reset();

    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Add Your Model</h1>
                        
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name='name' className="border border-slate-200 rounded-md px-2 py-3" placeholder="Name" />

                                <label className="label">Framework</label>
                                <input type="text" name='framework' className="border border-slate-200 rounded-md px-2 py-3" placeholder="Framework" />
                                <label className="label">Use Case</label>
                                <input type="text" name='useCase' className="border border-slate-200 rounded-md px-2 py-3" placeholder="Use Case" />

                                <label className="label">Data Set</label>
                                <input type="text" name='dataSet' className="border border-slate-200 rounded-md px-2 py-3" placeholder="Data set" />

                                <label className="label">Description</label>
                                <textarea className='border border-slate-200 rounded-lg px-3 py-3' name="description" id="" cols="30" rows="7" placeholder='Description'></textarea>


                                <label className="label">Image URL</label>
                                <input type="text" name='image' className="border border-slate-200 rounded-md px-2 py-3" placeholder="Image URL" />
                                
                                
                                <button className="btn btn-neutral mt-4">Add Model</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModels;