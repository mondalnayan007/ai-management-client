import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const UpdateModel = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData();
    const navigate = useNavigate();

  
    const modelData = data?.result ?? data;
    const model = {
        ...modelData,
        _id: typeof modelData._id === "object" ? modelData._id?.$oid : modelData._id
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            framework: e.target.framework.value,
            useCase: e.target.useCase.value,
            dataset: e.target.dataset.value,
            description: e.target.description.value,
            image: e.target.image.value,
        };

        try {
            setLoading(true);

           

            const res = await fetch(`https://ai-management-server.vercel.app/models/${model._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Update failed");
                return;
            }

            navigate(`/model-details/${model._id}`);

            toast.success("Successfully updated");
            console.log(data);


        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    if (!model) return <p>Loading...</p>;

    return (
      <div>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col  w-3/5">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Update Your Model</h1>
                </div>
                <div className="card bg-base-100 w-full  shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="fieldset">
                            <label className="label">Name</label>
                            <input type="text" name="name" defaultValue={model.name} className="border border-slate-200 rounded-md px-2 py-3" />

                            <label className="label">Framework</label>
                            <input type="text" name="framework" defaultValue={model.framework} className="border border-slate-200 rounded-md px-2 py-3" />

                            <label className="label">Use Case</label>
                            <input type="text" name="useCase" defaultValue={model.useCase} className="border border-slate-200 rounded-md px-2 py-3" />

                            <label className="label">Data Set</label>
                            <input type="text" name="dataset" defaultValue={model.dataset} className="border border-slate-200 rounded-md px-2 py-3" />

                            <label className="label">Description</label>
                            <textarea defaultValue={model.description} className="border border-slate-200 rounded-lg px-3 py-3" name="description" cols="30" rows="7"></textarea>

                            <label className="label">Image URL</label>
                            <input type="text" defaultValue={model.image} name="image" className="border border-slate-200 rounded-md px-2 py-3" />

                            <button className="btn btn-neutral mt-4" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Model'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
};

export default UpdateModel;
