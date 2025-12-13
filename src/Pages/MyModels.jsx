import React, { useEffect ,useState} from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';
import Card from '../Components/Card';

const MyModels = () => {

    const {user} = use(AuthContext)
    const [models,setModels] = useState([])

    const [loading,setLoading] = useState(true)

    

    useEffect(()=>{
        fetch(`https://ai-management-server.vercel.app/my-models?email=${user.email}`)
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            setModels(data)
            setLoading(false)
        })
    },[user])

    if(loading){
        return <p>Please wait ....</p>
    }

    return (
        <div>
            
             <div className='grid grid-cols-4 gap-4'>
                        {
                            models.map(model => <Card model={model}></Card>)
                        }
                       
                       
                    </div>
            
        </div>
    );
};

export default MyModels;