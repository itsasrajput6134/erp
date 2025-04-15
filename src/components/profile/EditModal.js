import React from "react";

const EditModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-lg shadow-2xl p-6 w-1/2">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-200"
                    >
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default EditModal;