import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../store/actions/paginationActions";
import Pagination from "../../pagination/Pagination";
import { Pencil, Trash, Loader2 } from "lucide-react";
import ReactCountryFlag from "react-country-flag"; // Import the flag component

// Mapping of country names to ISO codes
const countryCodeMap = {
  "United States": "US",
  "United Kingdom": "GB",
  "India": "IN",
  "Germany": "DE",
  "France": "FR",
  "Japan": "JP",
  "China": "CN",  
  "United Arab Emirates": "AE", 
  "Singapore": "SG",
  "Australia": "AU", 
};

const StateTable = ({ states, statesLoading, handleUpdate, handleDelete }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [states, dispatch]);

  // Add countryCode to each state object
  const statesWithCodes = states.map((state) => ({
    ...state,
    countryCode: countryCodeMap[state.countryName] || "XX", // Fallback to "XX" if code not found
  }));

  const paginatedStates = statesWithCodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
      {/* <h2 className="text-lg font-semibold text-gray-200 mb-3 text-center">🌍 State Table</h2> */}

      <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
        <table className="w-full text-sm text-gray-300">
          {/* Table Header */}
          <thead className="bg-gray-800 text-white-9000">
            <tr>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-700">
            {statesLoading ? (
              <tr>
                <td colSpan="3" className="py-3 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-500" />
                </td>
              </tr>
            ) : paginatedStates.length > 0 ? (
              paginatedStates.map((item) => (
                <tr key={item.stateId} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-2 flex items-center">
                    {item.countryCode ? (
                      <ReactCountryFlag
                        countryCode={item.countryCode}
                        svg
                        style={{
                          width: '1.5em',
                          height: '1.5em',
                          marginRight: '0.5em',
                        }}
                      />
                    ) : (
                      <span>🌍</span> // Fallback icon
                    )}
                    {item.countryName}
                  </td>
                  <td className="px-4 py-2">{item.stateName}</td>
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
                  No states found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination totalItems={states.length} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
};

export default StateTable;