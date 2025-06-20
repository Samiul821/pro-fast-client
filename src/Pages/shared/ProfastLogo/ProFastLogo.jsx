import React from 'react';
import logo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex items-center'>
            <img src={logo} alt="ProFast Logo" />
            <p className='text-[32px] font-extrabold urbanist mt-6'>ProFast</p>
        </div>
    );
};

export default ProFastLogo;