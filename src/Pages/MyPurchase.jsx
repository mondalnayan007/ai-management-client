import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Card from '../Components/Card';

const MyPurchase = () => {

    const {user} = use(AuthContext)
        const [models,setModels] = useState([])
    
        const [loading,setLoading] = useState(true)


         useEffect(()=>{
                fetch(`http://localhost:3000/my-purchase?email=${user.email}`, {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data=>{
                    console.log(data)
                    setModels(data)
                    setLoading(false)
                })
            },[])

     if(loading){
        return <div className='min-h-screen flex items-center justify-center'>
            <span className="loading loading-infinity loading-xl "></span>
        </div>
    }else{
        return (
        <div>
           
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 md:px-14'>
                        {
                            models.map(model => <Card model={model}></Card>)
                        }
                       
                       
                    </div>
            
        </div>
    )
    }

    
};

export default MyPurchase;