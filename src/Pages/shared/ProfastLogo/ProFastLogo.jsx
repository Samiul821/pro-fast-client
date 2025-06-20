import React from 'react';
import logo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex items-end mb-4'>
            <img className='mb-2' src={logo} alt="ProFast Logo" />
            <p className='text-[32px] font-extrabold urbanist -ml-2'>Profast</p>
        </div>
    );
};

export default ProFastLogo;