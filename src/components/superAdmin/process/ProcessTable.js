import React from "react";
import { Pencil, Loader2, Trash } from "lucide-react";

const ProcessTable = ({ processs, processLoading, handleUpdate, handleDelete }) => {
  return (
  <div className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
   <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
    <table className="w-full text-sm text-gray-300">
      {/* Table Header */}
      <thead className="bg-gray-800 text-white-9000">
        <tr>
          <th className="px-4 py-2 text-left">Process</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-gray-700">
        {processLoading ? (
          <tr>
            <td colSpan="2" className="py-3 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-500" />
            </td>
          </tr>
        ) : processs.length > 0 ? (
          processs.map((item) => (
            <tr key={item.id} className="hover:bg-gray-800 transition">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">
                <div className="flex">
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
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" className="py-3 text-center text-gray-400">
              No processes found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ProcessTable;