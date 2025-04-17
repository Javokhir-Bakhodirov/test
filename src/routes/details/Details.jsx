import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { FaDownload } from "react-icons/fa";
import { SlPrinter } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { instance } from "../../hooks/instance";
import { useNavigate, useParams } from "react-router-dom";
import student from "../../assets/student1.jpg";
import Modal from "../../components/modal/Modal";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import { RiArrowUpSLine } from "react-icons/ri";

const Details = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const fetchPupils = async () => {
        const token = localStorage.getItem("token");
        const res = await instance().get("/api/v1/getpupil/3?user_id=22917", {
            headers: { Authorization: `Token ${token}` },
        });
        return res.data;
    };

    const updateStudentMutation = useMutation({
        mutationFn: async updatedData => {
            const token = localStorage.getItem("token");
            const response = await instance().put("/api/v1/editpupil/", updatedData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["students"]);
        },
        onError: () => {},
    });

    const deleteStudentMutation = useMutation({
        mutationFn: async id => {
            const token = localStorage.getItem("token");
            const response = await instance().delete(`/api/v1/deletepupil/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["students"]);
            navigate("/");
        },
    });

    const handleDelete = id => {
        deleteStudentMutation.mutate(id);
    };

    const handleUpdateStudent = e => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            name: `${formData.lastName} ${formData.firstName}`,
        };

        updateStudentMutation.mutate(updatedData);
        setIsOpen(false);
    };

    const { data = [], isLoading } = useQuery({
        queryKey: ["students"],
        queryFn: fetchPupils,
    });

    useEffect(() => {
        const student = data.find(item => item.id == id);
        if (student) {
            const [lastName = "", firstName = ""] = student.name?.split(" ") || [];
            setFormData({ ...student, firstName, lastName });
        }
    }, [data, id]);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading || !formData) return <div>Loading...</div>;

    return (
        <>
            <div className='p-4 md:p-8'>
                <div className='mb-10  flex justify-start flex-col text-[22px]'>
                    <h2 className='text-2xl font-bold mb-4'>Students</h2>
                    <p className='flex items-center max-md:text-[16px]'>
                        Home <RiArrowUpSLine className='w-6 h-6 rotate-[90deg] text-[#FFA702] mx-2' />{" "}
                        <span className='text-[#FFA702]'> Students Details</span>
                    </p>
                </div>
                <div className='w-full bg-white rounded-md p-[15px_30px_30px]'>
                    <h2 className='font-medium text-[22px] text-[#000] mb-[20px]'>{formData.name}</h2>
                    <div className='content_box grid grid-cols-1 xl:grid-cols-[1fr_4fr] xl:gap-[50px]'>
                        <div className='img_box flex items-center justify-center mb-[40px]'>
                            <img
                                src={formData.image || student}
                                alt={formData.name}
                                width={280}
                                height={330}
                            />
                        </div>
                        <div className='info_box'>
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                                <h3 className='font-medium text-[20px] mb-[20px] sm:mb-0'>{formData.name}</h3>
                                <div className='flex gap-3'>
                                    <button
                                        onClick={handleOpenModal}
                                        className='group w-[44px] h-[44px] flex items-center justify-center rounded-sm hover:bg-[#FFA602] transition-colors bg-[#F0F1F3]'>
                                        <FaRegEdit className='text-[#646464] group-hover:text-white duration-300' />
                                    </button>
                                    <button className='group w-[44px] h-[44px] flex items-center justify-center rounded-sm hover:bg-[#FFA602] transition-colors bg-[#F0F1F3]'>
                                        <SlPrinter className='text-[#646464] group-hover:text-white duration-300' />
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDelete(formData.id);
                                        }}
                                        className='group w-[44px] h-[44px] flex items-center justify-center rounded-sm hover:bg-[#FFA602] transition-colors bg-[#F0F1F3]'>
                                        <MdDeleteOutline className='text-[#646464] group-hover:text-white duration-300 text-xl' />
                                    </button>
                                </div>
                            </div>
                            <p className='md:w-[85%] max-w-[820px] mt-[20px] text-[#646464]'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <table className='w-[580px] text-sm mt-[25px]'>
                                <tbody>
                                    <tr>
                                        <th className='text-left p-4 font-semibold'>Name:</th>
                                        <td className='p-4'>{formData.name}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left p-4 font-semibold'>Gender:</th>
                                        <td className='p-4'>{String(formData.jinsi || "—")}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left p-4 font-semibold'>Address:</th>
                                        <td className='p-4'>
                                            {typeof formData.address === "string"
                                                ? formData.address
                                                : "Planet Earth"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='text-left p-4 font-semibold'>Date Of Birth:</th>
                                        <td className='p-4'>
                                            {formData?.tug_sana?.split("-").reverse().join(".")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='text-left p-4 font-semibold'>Phone:</th>
                                        <td className='p-4'>
                                            {String(formData.phone || "+998 93 999 99 99")}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} className={"p-[15px_30px_30px] relative !w-[90%]"}>
                <button className='absolute top-[15px] right-[30px]' onClick={() => setIsOpen(false)}>
                    <AiOutlineClose className=' text-2xl text-[#646464ae]' />
                </button>
                <div className='flex mt-[50px] mb-[25px]'>
                    <h3 className='text-[#111111] font-medium text-[28px]'>Edit Student</h3>
                </div>
                <form onSubmit={handleUpdateStudent}>
                    <div className='grid gap-3'>
                        <Input
                            value={formData.firstName || ""}
                            label={"First Name *"}
                            name={"firstName"}
                            onChange={handleChange}
                            className='bg-[#F0F1F4] border-none h-[50px] !p-[7px_10px] !text-[18px] !leading-[50px] !font-medium'
                        />
                        <Input
                            value={formData.lastName || ""}
                            label={"Last Name *"}
                            name={"lastName"}
                            onChange={handleChange}
                            className='bg-[#F0F1F4] border-none h-[50px] !p-[7px_10px] !text-[18px] !leading-[50px] !font-medium'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-[15px] mt-4'>
                        <Select
                            title={"Gender "}
                            label={"Gender *"}
                            name='jinsi'
                            required={true}
                            value={formData.jinsi || ""}
                            onChange={val => handleSelectChange("jinsi", val)}
                            options={[
                                { value: "ERKAK", label: "Male" },
                                { value: "AYOL", label: "Female" },
                            ]}
                        />
                        <Select
                            title={"Class "}
                            label={"Class *"}
                            name='sinf'
                            required={true}
                            value={formData.sinf || ""}
                            onChange={val => handleSelectChange("sinf", val)}
                            options={[
                                { value: 1, label: "One" },
                                { value: 2, label: "Two" },
                                { value: 3, label: "Three" },
                            ]}
                        />
                    </div>
                    <Input
                        type='date'
                        name='tug_sana'
                        value={formData?.tug_sana || ""}
                        onChange={handleChange}
                        label='Date of Birth *'
                        className='bg-[#F0F1F4] mt-4 border-none h-[50px] !p-[7px_10px] !text-[18px] !leading-[50px] !font-medium'
                    />
                    <button
                        type='submit'
                        className='mt-6 bg-[#FFA602] text-white py-2 px-4 rounded-md hover:bg-[#e89500] transition-all'>
                        Save
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default Details;
