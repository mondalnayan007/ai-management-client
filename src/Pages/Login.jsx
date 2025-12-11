import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const { logIn,setUser, updateUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogIn = (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    logIn(email, password)
      .then(() => {
        toast.success('Login Successful 👏', { duration: 2000, position: 'top-center' });
        e.target.reset();
        setTimeout(() => {
          navigate(location.state || '/');
        }, 2000);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`${error.message}`, { duration: 2000, position: 'top-center' })
      });
  };

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
      };

  const handleForgotPassword = () => {
    navigate('/auth/forgotpassword', { state: { email } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5 px-3">
        <Toaster />
        <h2 className="text-2xl font-bold text-center">Login your account</h2>
        <hr className="h-0 text-gray-300 w-[80%] mx-auto mt-8" />
        <div className="card-body">
          <form onSubmit={handleLogIn} className="fieldset">
            <label className="label font-bold text-black py-1 text-base">Email</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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

            {error && <p className="text-red-600">{error}</p>}

            <div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="link link-hover text-blue-600 mt-1"
              >
                Forgot password?
              </button>
            </div>

            <button className="btn bg-black text-white px-8 text-lg">Login</button>
            <p className="font-semibold mt-5 text-center">
              Don't Have An Account?{' '}
              <Link to={'/register'} className="text-secondary">
                Register
              </Link>
            </p>
          </form>
        </div>

        <div className="google px-6 py-3">
                                    <Link onClick={handleGoogle} className="btn bg-white w-full text-[#7e96e6] border-[#607ddb]">
                                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                        Login with Google
                                    </Link>
                                </div>
      </div>
    </div>
  );
};

export default Login;
