import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/input/Input";
import logo2 from "../../../assets/logo2.png";
import { instance } from "../../../hooks/instance";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await instance().post("/api/v1/api-token-auth/", formData);
            const token = res.data.token;
            console.log(res.data);

            localStorage.setItem("token", token);
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className='grid items-center justify-center py-[70px]'>
            <Modal className={"py-[75px] px-[35px] flex flex-col gap-[25px]"}>
                <div className='mx-auto flex'>
                    <Link to='/'>
                        <img src={logo2} alt='logo' />
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <Input
                        label={"Username"}
                        name='username'
                        type='text'
                        placeholder='Enter username'
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Input
                        label={"Password"}
                        name='password'
                        type='password'
                        placeholder='Enter password'
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <div className='flex '>
                        <Link to='/auth/login' className='text-[14px] text-[#ff0000] font-[500] ml-auto'>
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type='submit'
                        className='w-full cursor-pointer mt-[30px] border-0 text-center font-[700] text-white bg-gradient-to-t from-[#042954] to-[#0b4776] p-[16px_10px] rounded-md'>
                        Login
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Login;
