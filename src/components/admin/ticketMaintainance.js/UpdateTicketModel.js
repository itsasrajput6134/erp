import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTicketRdx } from "../../../store/actions/ticketActions";
import toast from "react-hot-toast";

const UpdateTicketModel = ({ isOpen, isClose, selectedEmployee }) => {
  const dispatch = useDispatch();
  const [boucher, setBoucher] = useState();
  const [updateTicket, setUpdateTicket] = useState({
    travelGenId: "",
    travelMode: "",
    bookingDate: "",
    travelDate: "",
    departureLocation: "",
    arrivalLocation: "",
    passengerName: "",
    seatNumber: "",
    ticketPrice: "",
    bookingId: "",
    cancellationPrice: "",
    cancelled: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setUpdateTicket({
        travelGenId: selectedEmployee.travelGenId || "",
        travelMode: selectedEmployee.travelMode || "",
        bookingDate: selectedEmployee.bookingDate || "",
        travelDate: selectedEmployee.travelDate || "",
        departureLocation: selectedEmployee.departureLocation || "",
        arrivalLocation: selectedEmployee.arrivalLocation || "",
        passengerName: selectedEmployee.passengerName || "",
        seatNumber: selectedEmployee.seatNumber || "",
        ticketPrice: selectedEmployee.ticketPrice || "",
        bookingId: selectedEmployee.bookingId || "",
        cancellationPrice: selectedEmployee.cancellationPrice || "",
        cancelled: selectedEmployee.cancelled || "",
      });
    }
  }, [selectedEmployee]);

  if (!isOpen) return null;

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateTicket((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateTicket.seatNumber || !updateTicket.ticketPrice || !updateTicket.bookingId) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (updateTicket.cancellationPrice === 0) {
      updateTicket.cancelled = false;
    } else {
      updateTicket.cancelled = true;
    }
    const formData = new FormData();
    formData.append("ticketDetail", JSON.stringify(updateTicket));
    formData.append("voucher", boucher);

    dispatch(updateTicketRdx(formData, updateTicket));
    setUpdateTicket({
      seatNumber: "",
      ticketPrice: "",
      bookingId: "",
      cancellationPrice: "",
      cancelled: "",
    });
    isClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setBoucher(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mx-auto">
            UPDATE TICKET BOOKING
          </h2>
          <button
            onClick={isClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ticket Id
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTicket.travelGenId}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Travel Mode
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTicket.travelMode}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Booking Date
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTicket.bookingDate}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Travel Date
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTicket.travelDate}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Departure Location
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTicket.departureLocation}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Arrival Location
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTicket.arrivalLocation}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Passenger Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={updateTicket.passengerName}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Seat Number
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                name="seatNumber"
                value={updateTicket.seatNumber}
                onChange={handleChangeUpdate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ticket Price
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                name="ticketPrice"
                value={updateTicket.ticketPrice}
                onChange={handleChangeUpdate}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Booking Id
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                name="bookingId"
                value={updateTicket.bookingId}
                onChange={handleChangeUpdate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Cancellation Price
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                name="cancellationPrice"
                value={updateTicket.cancellationPrice}
                onChange={handleChangeUpdate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Upload Ticket
              </label>
              <input
                type="file"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={isClose}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTicketModel;