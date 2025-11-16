import React, { useEffect ,useState} from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { use } from 'react';
import Card from '../Components/Card';

const MyModels = () => {

    const {user} = use(AuthContext)
    const [models,setModels] = useState([])

    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        fetch(`http://localhost:3000/my-models?email=${user.email}`, {
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
    })

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