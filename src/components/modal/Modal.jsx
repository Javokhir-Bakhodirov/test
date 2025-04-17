import React, { useEffect } from "react";

const Modal = ({ children, className, isOpen = true }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black/40 z-50 ${
                isOpen ? "block" : "hidden"
            }`}>
            <div
                className={`min-w-[300px] w-[100%] max-w-[570px] bg-white min-h-[600px] rounded-md shadow-2xl shadow-gray-800 overflow-y-auto ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
