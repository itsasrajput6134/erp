import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRolesRdx } from "../../../store/actions/roleActions.js";

const RightSelectModel = ({
  isModalOpen,
  closeModal,
  onSaveChanges,
}) => {
  const dispatch = useDispatch();
  const { roles, roleLoading, roleError } = useSelector((state) => state.role);

  const [priorities, setPriorities] = useState({});

  useEffect(() => {
    dispatch(fetchRolesRdx());
  }, [dispatch]);

  // Update priorities state on input change
  const handleInputChange = (roleId, value) => {
    setPriorities((prev) => ({
      ...prev,
      [roleId]: value, // Update the priority for the role
    }));
  };

  // Handle Save Changes button click
  const handleSaveChanges = () => {
    const packet = roles
      .map((role) => ({
        roleName: role.name,
        level: Number(priorities[role.id]) || 0, // Default to 0 if not set
      }))
      .filter((item) => item.level !== 0); // Exclude roles with level 0
    console.log("Packet to send:", packet);
    // Call any API or pass the packet to the parent component
    onSaveChanges(packet);
    setPriorities({});
    closeModal();
  };
  

  return (
    <div>
       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 w-1/2 rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="text-white font-semibold">Set Priority</div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>

            <div className="p-6 h-96 overflow-y-auto">
              <div className="space-y-4">
                {roles.map((r) => (
                  <div key={r.id} className="flex items-center space-x-4">
                    <div className="w-1/4">
                      <label htmlFor={`role-${r.id}`} className="block text-white">
                        {r.name}
                      </label>
                    </div>
                    <div className="w-1/2">
                      <input
                        type="number"
                        id={`role-${r.id}`}
                        name={`${r.name}`}
                        placeholder={`Enter ${r.name}`}
                        value={priorities[r.id] || ""}
                        onChange={(e) => handleInputChange(r.id, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end p-4 border-t">
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 mr-4"
              >
                Save Changes
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSelectModel;