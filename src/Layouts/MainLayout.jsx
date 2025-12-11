import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import {Toaster} from 'react-hot-toast'


const MainLayout = () => {
    return (
        <div>
             <Header></Header>
             <main className='min-h-screen'>
                <Outlet></Outlet>
             </main>
             <Footer></Footer>

             <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;