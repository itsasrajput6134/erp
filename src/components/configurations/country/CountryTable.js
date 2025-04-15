import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../store/actions/paginationActions";
import Pagination from "../../pagination/Pagination";
import { Edit, Trash, Loader2 } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

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


const CountryTable = ({ countries, countryLoading, handleUpdate, handleDelete }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [countries, dispatch]);

  // Add countryCode to each country object
  const countriesWithCodes = countries.map((country) => ({
    ...country,
    countryCode: countryCodeMap[country.countryName] || "XX", // Fallback to "XX" if code not found
  }));

  const paginatedCountries = countriesWithCodes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
      {/* <h2 className="text-lg font-bold text-gray-200 mb-3 text-center">🌍 Country Table</h2> */}

      <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {countryLoading ? (
              <tr>
                <td colSpan="2" className="py-3 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-500" />
                </td>
              </tr>
            ) : paginatedCountries.length > 0 ? (
              paginatedCountries.map((item) => (
                <tr key={item.countryId} className="hover:bg-gray-800 transition">
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
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="p-2 text-purple-400 hover:text-purple-300 transition"
                    >
                    <Edit className="w-5 h-5 text-gray-500 hover:text-gray-700" />
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
                <td colSpan="2" className="py-3 text-center text-gray-400">
                  No countries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination totalItems={countries.length} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
};

export default CountryTable;