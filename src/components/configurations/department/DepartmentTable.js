import React from "react";
import { Pencil, Trash, Loader2 } from "lucide-react";

const DepartmentTable = ({
  departmentsLoading,
  departments,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <div className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
      {/* <h2 className="text-lg font-semibold text-gray-200 mb-3 text-center">🏢 Department Table</h2> */}

      <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
        <table className="w-full text-sm text-gray-300">
          {/* Table Header */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Office Location</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-700">
            {departmentsLoading ? (
              <tr>
                <td colSpan="3" className="py-3 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-500" />
                </td>
              </tr>
            ) : departments.length > 0 ? (
              departments.map((item) => (
                <tr key={item.departmentId} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-2">{item.officeName}</td>
                  <td className="px-4 py-2">{item.departmentName}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="p-2 text-purple-400 hover:text-purple-300 transition"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-red-500 hover:text-red-400 transition"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-3 text-center text-gray-400">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentTable;