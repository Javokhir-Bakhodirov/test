import React from "react";
import { Outlet } from "react-router-dom";
import bg from "../../assets/login-bg.jpg";

const Auth = () => {
    return (
        <div className='min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${bg})` }}>
            <Outlet />
        </div>
    );
};

export default Auth;
