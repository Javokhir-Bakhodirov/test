import React, { useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../hooks/instance";

const AdmissionForm = () => {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        name: "Ism Familiya",
        jinsi: "ERKAK",
        tug_sana: "2024-05-04",
        address: "",
        phone: "",
        image: null,
        person_id: null,
        qarindoshi: "",
        qarindoshi_phone: "",
        sinf: 1,
        firstName: "",
        lastName: "",
    });

    const addStudentMutation = useMutation({
        mutationFn: async newData => {
            const token = localStorage.getItem("token");
            const response = await instance().post("/api/v1/addpupil/", newData, {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["students"]);
            alert("Студент успешно добавлен");
        },
        onError: () => {
            alert("Ошибка при добавлении студента");
        },
    });

    const handleChange = e => {
        const { name, value } = e.target;

        setFormData(prev => {
            const updated = { ...prev, [name]: value };

            if (name === "firstName" || name === "lastName") {
                const firstName = name === "firstName" ? value : updated.firstName || "";
                const lastName = name === "lastName" ? value : updated.lastName || "";
                updated.name = `${lastName} ${firstName}`.trim();
            }

            return updated;
        });
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitData = e => {
        e.preventDefault();

        const { firstName, lastName, ...rest } = formData;
        const payload = {
            ...rest,
            name: `${lastName} ${firstName}`.trim(),
        };

        console.log(payload);

        addStudentMutation.mutate(payload);
    };

    return (
        <div className='p-5 md:p-8'>
            <div className='mb-10 flex justify-start flex-col text-[22px]'>
                <h2 className='text-2xl max-sm:text-xl font-bold mb-4'>Students</h2>
                <p className='flex items-center max-md:text-[16px]'>
                    Home <RiArrowUpSLine className='w-6 h-6 rotate-[90deg] text-[#FFA702] mx-2' />
                    <span className='text-[#FFA702]'> Student Admit Form</span>
                </p>
            </div>

            <div className='bg-[#fff] w-full rounded-md min-h-screen'>
                <div className='p-[30px_32px]'>
                    <h2 className='text-[#000] font-[500] text-[22px]'>Add New Students</h2>
                </div>

                <form onSubmit={handleSubmitData} className='p-[30px_32px] grid gap-6'>
                    <div className='grid gap-[46px] lg:grid-cols-2 xl:grid-cols-4'>
                        <Input
                            onChange={handleChange}
                            label='First Name *'
                            name='firstName'
                            placeholder='Enter first name'
                            className='bg-[#F0F1F4] border-none !p-[7px_17px] text-[18px] leading-[50px] font-medium'
                        />
                        <Input
                            onChange={handleChange}
                            label='Last Name *'
                            name='lastName'
                            placeholder='Enter last name'
                            className='bg-[#F0F1F4] border-none !p-[7px_17px] text-[18px] leading-[50px] font-medium'
                        />
                        <Select
                            onChange={e => handleSelectChange("jinsi", e.target.value)}
                            className='!p-[7px_17px]'
                            label='Gender *'
                            name='jinsi'
                            required={true}
                            options={[
                                { value: "ERKAK", label: "Male" },
                                { value: "AYOL", label: "Female" },
                            ]}
                        />
                        <Select
                            onChange={e => handleSelectChange("sinf", Number(e.target.value))}
                            className='!p-[7px_17px]'
                            label='Class *'
                            name='sinf'
                            required={true}
                            options={[
                                { value: "1", label: "One" },
                                { value: "2", label: "Two" },
                                { value: "3", label: "Three" },
                            ]}
                        />
                        <Input
                            onChange={handleChange}
                            type='date'
                            name='tug_sana'
                            label='Date of Birth *'
                            className='bg-[#F0F1F4] border-none !p-[7px_17px] text-[18px] leading-[50px] font-medium'
                        />
                        <Input
                            onChange={handleChange}
                            name='address'
                            label='Address'
                            className='bg-[#F0F1F4] border-none !p-[7px_17px] text-[18px] leading-[50px] font-medium'
                        />
                        <Input
                            onChange={handleChange}
                            name='phone'
                            label='Phone Number'
                            className='bg-[#F0F1F4] border-none !p-[7px_17px] text-[18px] leading-[50px] font-medium'
                        />
                        <Input
                            onChange={handleChange}
                            name='qarindoshi'
                            label='Parent'
                            className='bg-[#F0F1F4] border-none !p-[7px_17px] text-[18px] leading-[50px] font-medium'
                        />
                        <Input
                            onChange={handleChange}
                            name='qarindoshi_phone'
                            label='Parent Phone Number'
                            className='bg-[#F0F1F4] border-none !p-[7px_17px] text-[18px] leading-[50px] font-medium'
                        />
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='font-[500] mt-[40px] text-[#fff] p-[12px_45px] cursor-pointer rounded-[4px] inline text-2xl bg-[#FFAE02] hover:bg-[#e49d00] transition-all'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdmissionForm;
