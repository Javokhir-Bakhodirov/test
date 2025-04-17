import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to='/auth/login' />;
    return <Outlet />;
};

export default Private;
