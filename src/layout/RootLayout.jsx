import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/shared/Navbar/Navbar';
import Footer from '../Pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <header className='max-w-[1500px] mx-auto px-4 py-8'>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-200px)] max-w-[1500px] mx-auto px-4'>
                <Outlet></Outlet>
            </main>
            <footer className='max-w-[1500px] mx-auto px-4 py-6'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;