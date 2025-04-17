import { BsPeople } from "react-icons/bs";
import { Menu } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../style/Sidebar.css";

const MenuList = ({ collapsed }) => {
    const location = useLocation();

    const items = [
        {
            key: "students",
            icon: <BsPeople />,
            label: <span className='menu-title'>Students</span>,
            children: [
                {
                    key: "/",
                    label: <NavLink to='/'>All Students</NavLink>,
                    className: "menu-item",
                },
                {
                    key: "/students-detail/:id",
                    label: <NavLink to='/students-detail'>Student Detail</NavLink>,
                    className: "menu-item",
                },
                {
                    key: "/admission-form",
                    label: <NavLink to='/admission-form'>Admission Form</NavLink>,
                    className: "menu-item",
                },
            ],
        },
    ];

    return (
        <Menu
            mode='inline'
            defaultOpenKeys={["students"]}
            selectedKeys={[location.pathname]}
            className='custom-sidebar-menu'
            inlineCollapsed={collapsed}
            items={items}
        />
    );
};

export default MenuList;
