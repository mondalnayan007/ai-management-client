import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {

    const { createUser, setUser, user, updateUser, googleSignIn } = use(AuthContext)
    const [nameError, setNameError] = useState('')
    const [passError, setPassError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()


    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;


        const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;



        if (name.length < 5) {
            setNameError("Name shuld be at least 5 character.");
            return;
        }
        else {
            setNameError('');
        };

        if (!regex.test(password)) {
            setPassError("Password must be at least 6 characters long and include both uppercase and lowercase letters.");
            return;
        }
        else {
            setPassError('');
        };



        createUser(email, password)
            .then(result => {
                const user = result.user;
                toast.success("Register successful..",{ duration: 2000, position: 'top-center' })

                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        toast.success('User data updated successfull',{ duration: 2000, position: 'top-center' })
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                setUser(user);
                navigate('/')
            })
            .catch(error => {

                alert(error)

            })


    }

    const handleGoogle =() =>{
        googleSignIn()
        .then(result => {
                const user = result.user;
               
                updateUser({displayName: user.displayName, photoURL: user.photoURL })
                    .then(() => {
                        toast.success('user data updated successfull',{ duration: 2000, position: 'top-center' })
                    })
                    .catch((error) => {
                        toast.error(`${error.message}`,{ duration: 2000, position: 'top-center' })
                    })

                setUser(user);
                navigate('/')
            })
            .catch(error => {

                alert(error)

            })
    }


    return (
        <>

            {
                user ? 'register successfull' : <div className='flex justify-center'>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5 px-3">
                        <Toaster />
                        <h2 className='text-2xl font-bold text-center'>Register your account</h2>
                        <hr className='h-0 text-gray-300 w-[80%] mx-auto mt-8' />
                        <form onSubmit={handleRegister} className="card-body">
                            <fieldset className="fieldset">
                                {/* Name  */}
                                <label className="label font-bold text-black py-1 text-base">Your Name</label>
                                <input type="text" required name='name' className="input" placeholder="Your Name" />
                                {
                                    nameError && <p className='text-red-500 text-sm'>{nameError}</p>
                                }

                                {/* Photo url  */}
                                <label className="label font-bold text-black py-1 text-base">Photo URL</label>
                                <input type="text" required name='photo' className="input" placeholder="Your Photo URL" />
                                {/* email  */}
                                <label className="label font-bold text-black py-1 text-base">Email</label>
                                <input name='email' required type="email" className="input" placeholder="Email" />
                                {/* password  */}
                                <label className="label font-bold text-black py-1 text-base">Password</label>
                                <div className="relative">
                                              <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="input w-full pr-10"
                                                name="password"
                                                placeholder="Password"
                                                required
                                              />
                                              <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-gray-500 hover:text-black z-10"
                                              >
                                                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                              </button>
                                            </div>

                                {
                                    passError && <p className='text-red-500 text-sm'>{passError}</p>
                                }

                                <div className='flex gap-2 my-2'><input type="checkbox" name="" id="" /><p>Accept Terms & Conditions</p></div>
                                <button type='submit' className="btn btn-neutral mt-4">Register</button>
                                <p className='font-semibold  mt-5 text-center'>Already Have An Account? <Link to={'/login'} className='text-secondary'>Login</Link> </p>
                            </fieldset>
                        </form>
                        <div className="or my-2 flex items-center justify-center gap-3">
                            <div className='h-0.5 w-[30%] bg-gray-400 '></div>
                            <p className='text-sm text-red-500'>Or</p>
                            <div className='h-0.5 w-[30%] bg-gray-400 '></div>
                        </div>
                        <div className="google px-6 py-3">
                            <Link onClick={handleGoogle} className="btn bg-white w-full text-[#7e96e6] border-[#607ddb]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </Link>
                        </div>
                    </div>
                </div>
            }


        </>
    );
};

export default Register;