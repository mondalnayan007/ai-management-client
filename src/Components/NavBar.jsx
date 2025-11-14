import React, { useContext } from 'react';
import { Link, Navigate, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const NavBar = () => {
    const { user, logOut, setUser } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                setUser(null);
                toast.success('Log out Successful 👏', { duration: 2000, position: 'top-center' });
                Navigate('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10 px-4 md:px-14">
            <Toaster />
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/all-models">All Models</NavLink>
                        <NavLink to="/aboutus">About Us</NavLink>
                        {user && (
                            <div className='flex flex-col gap-1'>
                                <NavLink to="/myprofile">My Profile</NavLink>
                                <NavLink to="/my-cart">My Cart</NavLink>
                            </div>
                        )}
                    </ul>
                </div>
                <Link to="/"><img className="h-14 w-20" alt="Ai" /></Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex items-center gap-3">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/all-models">All Models</NavLink>
                    <NavLink to="/aboutus">About Us</NavLink>
                    {user && (
                        <div className='flex gap-2 items-center'>
                            <NavLink to="/myprofile">My Profile</NavLink>
                            <NavLink to="/my-cart">My Cart</NavLink>
                        </div>
                    )}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end space-x-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img src={user.photoURL || '/default-user.png'} alt="User" title={user.displayName} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <div className='flex flex-col items-center justify-center text-center' ><li><img className='w-14 h-14 rounded-full' src={user.photoURL || '/default-user.png'} alt="" /></li>
                            <li className="mb-2 border-b pb-2">
                                <p className="font-semibold">{user.displayName}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </li></div>
                            <li><Link to="/model-purchase">Model Purchase</Link></li>
                            <li><Link to="/my-models">My Models</Link></li>
                            <li><button onClick={handleLogOut} className="bg-red-500 text-white font-semibold">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="space-x-3 flex">
                        <Link to="/login" className="btn btn-primary px-4 md:px-8 text-lg">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
