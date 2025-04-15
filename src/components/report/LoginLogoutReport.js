import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/actions/paginationActions";

const Login_Logout = () => {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [duplicateEmployeeTravelList, setDuplicateEmployeeTravelList] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState("Select Filter to see Data");
  const [showModal, setShowModal] = useState(false);
  const [mapLocation, setMapLocation] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);

  // Pagination setup
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const itemsPerPage = 10;

  // Reset to page 1 when data changes
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [employeeTravelList, dispatch]);

  // Calculate paginated data
  const paginatedData = employeeTravelList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Load all data when the component mounts
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${endpoints.getLoginLogoutReportData}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      const data = response.data;
      setLoading(false);
      if (data.length > 0) {
        setEmployeeTravelList(data);
        setDuplicateEmployeeTravelList(data);
        setNoDataMessage("");
      } else {
        setEmployeeTravelList([]);
        setNoDataMessage("No data found");
      }
    } catch (error) {
      setLoading(false);
      setEmployeeTravelList([]);
      setNoDataMessage(error.response?.data?.message || "Error fetching data");
    }
  };

  const handleSearch = async () => {
    if (!selectedDateStart || !selectedDateEnd) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (new Date(selectedDateEnd) < new Date(selectedDateStart)) {
      toast.error("End date cannot be earlier than start date.");
      return;
    }

    try {
      setLoading(true);
      setEmployeeTravelList([]);
      const response = await axios.get(
        `${endpoints.getLoginLogoutReportData}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      setLoading(false);
      if (data.length > 0) {
        setEmployeeTravelList(data);
        setDuplicateEmployeeTravelList(data);
        setNoDataMessage("");
      } else {
        setEmployeeTravelList([]);
        setNoDataMessage("No data found for selected filter");
      }
    } catch (error) {
      setLoading(false);
      setEmployeeTravelList([]);
      setNoDataMessage(error.response?.data?.message || "Error fetching data");
    }
  };

  const handleFilter = (status) => {
    if (status === "ALL") {
      setEmployeeTravelList(duplicateEmployeeTravelList);
    } else {
      const filteredData = duplicateEmployeeTravelList.filter((item) => item.status === status);
      setEmployeeTravelList(filteredData);
    }
  };

  const openLocationModal = (lat, lng) => {
    if (!lat || !lng) {
      toast.error("Location data not available");
      return;
    }
    setMapLocation({ lat, lng });    
    setShowModal(true);
    setMapLoading(true);
  };

  return (
    <div>
      <section className="wrapper p-3">
        <div className="row pl-5 pr-3">
          <div className="container mx-auto p-3 bg-gray-900 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* From Date */}
                      <div>
                        <label htmlFor="start" className="block text-white mb-1">
                          From Date
                        </label>
                        <input
                          type="date"
                          id="start"
                          name="start"
                          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={selectedDateStart}
                          onChange={(e) => setSelectedDateStart(e.target.value)}
                        />
                      </div>
                      
                      {/* To Date */}
                      <div>
                        <label htmlFor="end" className="block text-white mb-1">
                          To Date
                        </label>
                        <input
                          type="date"
                          id="end"
                          name="end"
                          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={selectedDateEnd}
                          onChange={(e) => setSelectedDateEnd(e.target.value)}
                          min={selectedDateStart}
                        />
                      </div>
                      
                      {/* Status Filter */}
                      <div>
                        <label htmlFor="status" className="block text-white mb-1">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onChange={(e) => handleFilter(e.target.value)}
                        >
                          <option value="" disabled selected>Select Status</option>
                          <option value="APPROVED">Approved</option>
                          <option value="REJECTED">Rejected</option>
                          <option value="PENDING">Pending</option>
                          <option value="ALL">All</option>
                        </select>
                      </div>
                    </div>
    
                    {/* Search Button */}
                    <div>
                      <button 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
              <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-full text-center font-semibold text-black bg-white p-4">
                    Login Logout Report
                  </div>
                </div>
                <div className="table-responsive">
                  {loading ? (
                    <div className="text-center p-3 text-white">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <table className="w-full text-lg text-gray-300">
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="px-4 py-2 text-left">Employee Email</th>
                          <th className="px-4 py-2 text-left">Login Timestamp</th>
                          <th className="px-4 py-2 text-left">Logout Timestamp</th>
                          <th className="px-4 py-2 text-left">Login Location</th>
                          <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {paginatedData.length > 0 ? (
                          paginatedData.map((item) => (
                            <tr key={item.username} className="hover:bg-gray-800 transition">
                              <td className="px-4 py-2">{item.username || "Null"}</td>
                              <td className="px-4 py-2">{item.loginTimestamp || "Null"}</td>
                              <td className="px-4 py-2">{item.logoutTimestamp || "Null"}</td>
                              <td className="px-4 py-2">{item.address || "Null"}</td>
                              <td className="px-4 py-2">
                                <button
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                  onClick={() => openLocationModal(item.latitudeCoord, item.longitudeCoord)}
                                >
                                  See Location
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center py-4 text-white">
                              {noDataMessage}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
                {/* Pagination Component */}
                {employeeTravelList.length > itemsPerPage && (
                  <div className="mt-4">
                    <Pagination
                      totalItems={employeeTravelList.length}
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className={`modal-dialog ${mapLoading ? "modal-sm" : "modal-lg"}`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Location</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {mapLoading && (
                  <div className="text-center p-3">
                    <div className="spinner-border text-primary"></div>
                  </div>
                )}
                {mapLocation.lat && mapLocation.lng && (
                  <iframe
                    width="100%"
                    height="400px"
                    src={`https://maps.google.com/maps?q=${mapLocation.lat},${mapLocation.lng}&z=15&output=embed`}
                    onLoad={() => setMapLoading(false)}
                    style={{ display: mapLoading ? "none" : "block" }}
                    title="Google Map Location"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login_Logout;