import React from "react";
import { Pencil, Trash, Loader2 } from "lucide-react";

const ProjectTable = ({
  projectsLoading,
  projects,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <div className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
      {/* <h2 className="text-lg font-semibold text-gray-200 mb-3 text-center">📂 Project Table</h2> */}

      <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
        <table className="w-full text-sm text-gray-300">
          {/* Table Header */}
          <thead className="bg-gray-800 text-white-9000">
            <tr>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Project Name</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Account Manager</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-700">
            {projectsLoading ? (
              <tr>
                <td colSpan="5" className="py-3 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-500" />
                </td>
              </tr>
            ) : projects.length > 0 ? (
              projects.map((item) => (
                <tr key={item.projectId} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-2">{`${item.departmentName} (${item.officeLocation})`}</td>
                  <td className="px-4 py-2">{item.projectName}</td>
                  <td className="px-4 py-2">{item.clientName}</td>
                  <td className="px-4 py-2">{item.accountManager}</td>
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
                <td colSpan="5" className="py-3 text-center text-gray-400">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;