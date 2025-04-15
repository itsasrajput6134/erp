import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTravelRdx,
  deleteTravelRdx,
} from "../../store/actions/travelAction";
import { fetchEmployeesActiveRdx } from "../../store/actions/employeeActions.js";

const Travel_History = () => {
  const dispatch = useDispatch();
  const [guestHouse, setGuestHouse] = useState([]);
  const [adminEmployee, setAdminEmployee] = useState([]);
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [employeeTravelListLoading, setEmployeeTravelListLoading] =
    useState(true);
  const [updateTravel, setUpdateTravel] = useState();
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [travelMode, setTravelMode] = useState([]);
  const [accomadationType, setAccomadationType] = useState([]);
  const [managerDescription, setManagerDescription] = useState("");
  const [travelDetails, setTravelDetails] = useState();
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );
  const fetchClaimType = async () => {
    try {
      const response = await axios.get(`${endpoints.getAllClaimType}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data;
      setClaimType(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGuestHouse = async () => {
    try {
      const response = await axios.get(endpoints.getAllGuestHouse, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      setGuestHouse(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [hotelDetail, setHotelDetail] = useState({
    travelRequest: "",
    checkInDate: "",
    checkOutDate: "",
    hotelName: "",
    hotelAddress: "",
    hotelPhoneNumber: "",
  });
  const [guestHouseDetail, setGuestHouseDetail] = useState({
    travelRequest: "",
    checkInDate: "",
    checkOutDate: "",
    guesthouseName: "",
    hotelAddress: "",
    BookingStatus: "",
  });
  const [claimType, setClaimType] = useState([]);
  useEffect(() => {
    dispatch(fetchEmployeesActiveRdx());
    fetchClaimType();
  }, [dispatch]);
  useEffect(() => {
    fetchList();
    fetchTravelMode();
    fetchAccomdationType();
    fetchGuestHouse();
  }, []);

  useEffect(() => {
    if (employees && employees.length > 0) {
      filterEmployees();
    }
  }, [employees]);

  const filterEmployees = () => {
    const adminEmpl = employees.filter((employee) =>
      employee.roleName.includes("ADMIN")
    );
    console.log(adminEmpl);
    setAdminEmployee(adminEmpl);
  };

  const fetchList = async () => {
    setEmployeeTravelListLoading(true);
    try {
      const response = await axios.get(
        `${endpoints.getAllTravelsEmployee}/${localStorage.getItem(
          "username"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      setEmployeeTravelList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setEmployeeTravelListLoading(false);
    }
  };

  const fetchTravelMode = async () => {
    try {
      const response = await axios.get(endpoints.getAllTravelMode, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      setTravelMode(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAccomdationType = async () => {
    try {
      const response = await axios.get(endpoints.getAllAccomdationType, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      setAccomadationType(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (item) => {
    console.log(item);
    setUpdateTravel(item);
    setIsModalOpenUpdate(true);
  };

  const handleDelete = async (item) => {
    await dispatch(deleteTravelRdx(item.travelGenId));
    fetchList();
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleChangeTravelUpdate = (e) => {
    const { name, value, checked } = e.target;
    setUpdateTravel((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleTravelUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(updateTravel);

    try {
      // Dispatch the update action
      await dispatch(updateTravelRdx(updateTravel));

      // Clear the form fields and close the modal
      setUpdateTravel({
        travelId: "",
        travelGenId: "",
        employeeEmail: "",
        travelDate: "",
        travelMode: "",
        accommodationType: "",
        destCountry: "",
        destCity: "",
        landMark: "",
        checkinDate: "",
        checkoutDate: "",
        approvalManager: "",
        travelPurpose: "",
        description: "",
        approvalStatus: "",
      });

      setIsModalOpenUpdate(false);
      // Fetch the updated travel list to refresh the table
      fetchList();
    } catch (error) {
      console.error("Failed to update travel:", error);
      toast.error("Failed to update travel. Please try again.");
    }
  };

  const handleClose = () => {
    setManagerDescription("");
  };

  const handleGetDetail = async (item) => {
    console.log(item);
    const travelGenId = item.travelGenId;
    const modalId =
      item.accommodationType === "HOTEL"
        ? "staticBackdropHotel"
        : "staticBackdropGuestHouse";

    if (item.accommodationType === "HOTEL") {
      try {
        console.log(`${endpoints.hotelDetailsBytravelGenId}/${travelGenId}`);

        const response = await axios.get(
          `${endpoints.hotelDetailsBytravelGenId}/${travelGenId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const data = await response.data[0];
        setHotelDetail({
          travelRequest: data.travelRequestGenId,
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          hotelName: data.hotelName,
          hotelAddress: data.hotelAddress,
          hotelPhoneNumber: data.hotelPhoneNumber,
        });
        // Get the modal element by ID
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
          // Access bootstrap via the global window object
          const modal = new window.bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error("Modal element not found!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Hotel not booked yet");
      }
    } else if (item.accommodationType === "GUESTHOUSE") {
      console.log(`${endpoints.getGuestHouseDetail}/${travelGenId}`);
      try {
        const response = await axios.get(
          `${endpoints.getGuestHouseDetail}/${travelGenId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const data = await response.data[0];
        console.log(data);
        setGuestHouseDetail({
          travelRequest: data.travelRequest,
          checkInDate: data.checkInDate,
          checkOutDate: data.checkOutDate,
          guesthouseName: data.guesthouseName,
          hotelAddress: "",
          BookingStatus: "",
        });
        // Get the modal element by ID
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
          // Access bootstrap via the global window object
          const modal = new window.bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error("Modal element not found!");
        }
      } catch (error) {
        console.log(error);
        toast.error("Either Guest House Not Booked or Not Available.");
        return;
      }
    }
  };

  const handleCloseModelHotel = () => {
    setHotelDetail({
      travelRequest: "",
      checkInDate: "",
      checkOutDate: "",
      hotelName: "",
      hotelAddress: "",
      hotelPhoneNumber: "",
    });
  };

  return (
    <div className="pt-20">
      <section className="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
    <div className="p-4 overflow-x-auto border border-gray-800 rounded-lg">
    <div className="w-full text-center font-bold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">TRAVEL HISTORY</div>
    <table className="w-full text-sm text-gray-300">
      {/* Table Header */}
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2 text-left">Travel Request Id</th>
          <th className="px-4 py-2 text-left">Accommodation Type</th>
          <th className="px-4 py-2 text-left">Travel Date</th>
          <th className="px-4 py-2 text-left">Mode Of Travel</th>
          <th className="px-4 py-2 text-left">Destination</th>
          <th className="px-4 py-2 text-left">Approval Manager</th>
          <th className="px-4 py-2 text-left">Purpose Of Travel</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-gray-700">
        {employeeTravelListLoading ? (
          <tr>
            <td colSpan="9" className="text-center py-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            </td>
          </tr>
        ) : employeeTravelList.length > 0 ? (
          employeeTravelList.map((item) => (
            <tr key={item.travelId} className="hover:bg-gray-800 transition">
              <td className="px-4 py-2">{item.travelGenId}</td>
              <td className="px-4 py-2">{item.accommodationType}</td>
              <td className="px-4 py-2">{item.travelDate}</td>
              <td className="px-4 py-2">{item.travelMode}</td>
              <td className="px-4 py-2">
                {item.accommodationType === "GUESTHOUSE"
                  ? `${item.destCity}`
                  : `${item.landMark}, ${item.destCity}, ${item.destCountry}`}
              </td>
              <td className="px-4 py-2">{item.approvalManager}</td>
              <td className="px-4 py-2">{item.travelPurpose}</td>
              <td className="px-4 py-2">{item.approvalStatus}</td>
              <td className="px-4 py-2">
                {item.approvalStatus === "PENDING" ? (
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-purple-400 hover:text-purple-300 transition"
                      onClick={() => handleUpdate(item)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="p-2 text-red-500 hover:text-red-400 transition"
                      onClick={() => handleDelete(item)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-blue-400 hover:text-blue-300 transition"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => setManagerDescription(item.managerDescription)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    {item.approvalStatus === "APPROVED" && (
                      <button
                        className="p-2 text-green-400 hover:text-green-300 transition"
                        onClick={() => handleGetDetail(item)}
                      >
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-center py-4">
              No Request Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</section>

      {/* Update Travel Model  */}

         <div>
         {isModalOpenUpdate && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 overflow-y-auto max-h-[90vh]">
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mx-auto">
            UPDATE TRAVEL
          </h2>
          <button
            onClick={handlecloseUpdate}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Travel Date
              </label>
              <input
                type="date"
                required
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                id="travelDate"
                name="travelDate"
                value={updateTravel.travelDate}
                onChange={handleChangeTravelUpdate}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Mode of Travel
              </label>
              <select
                id="travelMode"
                name="travelMode"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTravel.travelMode}
                onChange={handleChangeTravelUpdate}
              >
                <option value="" disabled selected>Select Mode</option>
                {travelMode.length > 0 &&
                  travelMode.map((trvl) => (
                    <option key={trvl.modeId} value={trvl.mode}>
                      {trvl.mode}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Employee Official Email
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                id="firstName"
                name="firstName"
                value={updateTravel.employeeEmail}
                onChange={handleChangeTravelUpdate}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Estimated Check-in Date
              </label>
              <input
                type="date"
                required
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                id="checkinDate"
                name="checkinDate"
                min={new Date().toISOString().split("T")[0]}
                value={updateTravel.checkinDate}
                onChange={handleChangeTravelUpdate}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Estimated Check-out Date
              </label>
              <input
                type="date"
                required
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                id="checkoutDate"
                name="checkoutDate"
                min={new Date().toISOString().split("T")[0]}
                value={updateTravel.checkoutDate}
                onChange={handleChangeTravelUpdate}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Approver Manager
              </label>
              <select
                id="approvalManager"
                name="approvalManager"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTravel.approvalManager}
                onChange={handleChangeTravelUpdate}
              >
                <option value="" disabled selected>Select Approver</option>
                {adminEmployee.length > 0 &&
                  adminEmployee.map((empl) => (
                    <option key={empl.userId} value={empl.email}>
                      {empl.firstName + " " + empl.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Accommodation Type
              </label>
              <select
                id="travelMode"
                name="accommodationType"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTravel.accommodationType}
                onChange={handleChangeTravelUpdate}
              >
                <option value="" disabled selected>Select Type</option>
                {accomadationType.length > 0 &&
                  accomadationType.map((trvl) => (
                    <option key={trvl.id} value={trvl.type}>
                      {trvl.type}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Guest House
              </label>
              <select
                id="travelMode"
                name="guestHouseName"
                className={`mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${updateTravel.accommodationType !== "GUESTHOUSE" ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={updateTravel.guestHouseName}
                onChange={handleChangeTravelUpdate}
                disabled={updateTravel.accommodationType !== "GUESTHOUSE"}
              >
                <option value="" disabled selected>Select Guest House</option>
                {guestHouse.length > 0 &&
                  guestHouse.map((gt) => (
                    <option key={gt.id} value={gt.guesthouseName}>
                      {gt.guesthouseName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Destination Country
              </label>
              <input
                type="text"
                required
                className={`mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${updateTravel.accommodationType !== "HOTEL" ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="destCountry"
                name="destCountry"
                value={updateTravel.destCountry}
                onChange={handleChangeTravelUpdate}
                readOnly={updateTravel.accommodationType !== "HOTEL"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Destination City
              </label>
              <input
                type="text"
                required
                className={`mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${updateTravel.accommodationType !== "HOTEL" ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="destCity"
                name="destCity"
                value={updateTravel.destCity}
                onChange={handleChangeTravelUpdate}
                readOnly={updateTravel.accommodationType !== "HOTEL"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Landmark
              </label>
              <input
                type="text"
                required
                className={`mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${updateTravel.accommodationType !== "HOTEL" ? 'opacity-50 cursor-not-allowed' : ''}`}
                id="landMark"
                name="landMark"
                value={updateTravel.landMark}
                onChange={handleChangeTravelUpdate}
                readOnly={updateTravel.accommodationType !== "HOTEL"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 required">
                Purpose Of Travel
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                id="travelPurpose"
                name="travelPurpose"
                value={updateTravel.travelPurpose}
                onChange={handleChangeTravelUpdate}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1 required">
              Description
            </label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              id="description"
              rows="3"
              name="description"
              value={updateTravel.description}
              onChange={handleChangeTravelUpdate}
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handlecloseUpdate}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleTravelUpdateSubmit}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
         </div>
          )}
         </div>

      {/* Manager Remark Model */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Manager Remark
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div class="modal-body">
              <div className="row mb-3">
                <div class="col-12">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="managerDescription"
                    value={managerDescription}
                    readOnly
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Booking Model */}
      <div
        class="modal fade"
        id="staticBackdropHotel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Booked Hotel Detail
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModelHotel}
              ></button>
            </div>
            <div class="modal-body">
              <div className="container">
                <div class="row mb-3">
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Travel Request Id
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="travelRequest"
                      name="travelRequest"
                      placeholder="travelRequest"
                      value={hotelDetail?.travelRequest || ""}
                      readOnly
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Check-in Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkInDate"
                      name="checkInDate"
                      placeholder="checkInDate"
                      value={hotelDetail?.checkInDate || ""}
                      readOnly
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Check-out Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkOutDate"
                      name="checkOutDate"
                      placeholder="checkOutDate"
                      value={hotelDetail?.checkOutDate || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Hotel Name
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelName"
                      name="hotelName"
                      placeholder="hotelName"
                      value={hotelDetail.hotelName}
                      readOnly
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Hotel Address
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelAddress"
                      name="hotelAddress"
                      placeholder="hotelAddress"
                      value={hotelDetail.hotelAddress}
                      readOnly
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Hotel PhoneNumber
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelPhoneNumber"
                      name="hotelPhoneNumber"
                      placeholder="hotelPhoneNumber"
                      value={hotelDetail.hotelPhoneNumber}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseModelHotel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guest House Booking Model */}
      <div
        class="modal fade"
        id="staticBackdropGuestHouse"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Guest House Details
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="container">
                <div class="row mb-3">
                  <div class="col-6 col-md-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Travel Request Id
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="travelRequest"
                      name="travelRequest"
                      placeholder="travelRequest"
                      value={guestHouseDetail?.travelRequest || ""}
                      readOnly
                    />
                  </div>
                  {/* <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Accomadation Type
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="accommodationType"
                      name="accommodationType"
                      placeholder="accommodationType"
                      value={travelDetails?.accommodationType || ""}
                      readOnly
                    />
                  </div> */}
                  {/* <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Travel Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="travelDate"
                      name="travelDate"
                      placeholder="travelDate"
                      value={travelDetails?.travelDate || ""}
                      readOnly
                    />
                  </div> */}
                  <div class="col-6 col-md-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Check-in Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkInDate"
                      name="checkInDate"
                      placeholder="checkInDate"
                      value={guestHouseDetail?.checkInDate || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 col-md-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Check-out Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkOutDate"
                      name="checkOutDate"
                      placeholder="checkOutDate"
                      value={guestHouseDetail?.checkOutDate || ""}
                      readOnly
                    />
                  </div>
                  <div class="col-6 col-md-6">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Guest House
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelName"
                      name="hotelName"
                      placeholder="hotelName"
                      value={guestHouseDetail.guesthouseName}
                      readOnly
                    />
                  </div>
                  {/* <div class="col-6 col-md-3 d-flex flex-column">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Availability
                    </label>
                    <button type="button" class="btn btn-primary">
                      Check
                    </button>
                  </div> */}
                  {/* <div class="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Hotel PhoneNumber
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelPhoneNumber"
                      name="hotelPhoneNumber"
                      placeholder="hotelPhoneNumber"
                      value={hotelDetail.hotelPhoneNumber}
                      readOnly
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Travel_History;
