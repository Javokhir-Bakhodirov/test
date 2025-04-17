import React, { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../hooks/instance";
import { RiArrowUpSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const StudentsPage = () => {
    const [globalFilter, setGlobalFilter] = useState("");

    const fetchStudents = async () => {
        const token = localStorage.getItem("token");
        const res = await instance().get("/api/v1/getpupil/3", {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: ["students"],
        queryFn: fetchStudents,
    });

    const columns = useMemo(
        () => [
            {
                id: "select",
                header: () => <input type='checkbox' />,
                cell: () => <input type='checkbox' />,
            },
            {
                header: "Roll",
                accessorKey: "id",
                cell: info => `#${String(info.getValue()).padStart(4, "0")}`,
            },
            {
                header: "Photo",
                accessorKey: "image",
                cell: info => (
                    <img
                        src={info.getValue() || "https://i.pravatar.cc/40?u=random"}
                        alt='avatar'
                        className='w-10 h-10 rounded-full object-cover'
                    />
                ),
            },
            {
                header: "Name",
                accessorKey: "name",
                cell: info => {
                    const id = info.row.original.id;
                    return (
                        <Link
                            to={`/students-detail/${id}`}
                            className='text-[#0b4776] hover:underline font-medium'>
                            {info.getValue()}
                        </Link>
                    );
                },
            },
            {
                header: "Gender",
                accessorKey: "jinsi",
            },
            {
                header: "Class",
                accessorKey: "sinf",
            },
            {
                header: "Section",
                cell: () => "A",
            },
            {
                header: "Parents",
                accessorKey: "qarindoshi",
            },
            {
                header: "Address",
                accessorKey: "address",
            },
            {
                header: "Date Of Birth",
                accessorKey: "tug_sana",
            },
            {
                header: "Phone",
                accessorKey: "phone",
            },
            {
                header: "E-mail",
                cell: () => "example@gmail.com",
            },
        ],
        []
    );

    const safeData = Array.isArray(data) ? data : [];

    const table = useReactTable({
        data: safeData,
        columns,
        state: {
            globalFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
    });
    console.log();

    return (
        <div className='p-4 md:p-8'>
            <div className='mb-10  flex justify-start flex-col text-[22px]'>
                <h2 className='text-2xl font-bold mb-4'>Students</h2>
                <p className='flex items-center max-md:text-[16px]'>
                    Home <RiArrowUpSLine className='w-6 h-6 rotate-[90deg] text-[#FFA702] mx-2' />{" "}
                    <span className='text-[#FFA702]'>All Students</span>
                </p>
            </div>

            <div className='bg-white rounded-lg shadow p-[20px_30px]'>
                <h2 className='font-semibold text-[22px] mb-4'>All Students Data</h2>

                <div className='flex gap-4 mb-5'>
                    <input
                        type='text'
                        placeholder='Search by Roll ...'
                        className='border px-3 py-2 rounded-md shadow-sm w-[30%]'
                        onChange={e => setGlobalFilter(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Search by Name ...'
                        className='border px-3 py-2 rounded-md shadow-sm w-[30%]'
                    />
                    <input
                        type='text'
                        placeholder='Search by Class ...'
                        className='border px-3 py-2 rounded-md shadow-sm w-[30%]'
                    />
                    <button className='bg-[#FFA702] text-white px-4 py-2 rounded-md font-semibold'>
                        SEARCH
                    </button>
                </div>

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='min-w-full text-sm border border-gray-200'>
                            <thead className='bg-gray-50 text-gray-700'>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className='px-4 py-2 border-b text-left whitespace-nowrap'>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className='hover:bg-gray-50 transition-colors'>
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className='px-4 py-2 border-b whitespace-nowrap'>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentsPage;
