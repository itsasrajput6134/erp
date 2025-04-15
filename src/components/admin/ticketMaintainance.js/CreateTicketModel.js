import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTicketRdx } from "../../../store/actions/ticketActions";
import toast from "react-hot-toast";

const CreateTicketModel = ({ isOpen, isClose, employeeTravelList }) => {
  const dispatch = useDispatch();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [boucher, setBoucher] = useState(null);
  const [addTicket, setAddTicket] = useState({
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
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedEmployee(null);
      setAddTicket({
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
      });
      setBoucher(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const selectedTravelGenId = e.target.value;
    const selectedEmployee = employeeTravelList.find(
      (employee) => employee.travelGenId === selectedTravelGenId
    );
    setSelectedEmployee(selectedEmployee);
    setAddTicket({
      travelGenId: selectedEmployee.travelGenId || "",
      travelMode: selectedEmployee?.travelMode || "",
      bookingDate: selectedEmployee?.travelDate || "",
      travelDate: selectedEmployee?.travelDate || "",
      departureLocation: selectedEmployee?.destCity || "",
      arrivalLocation: selectedEmployee?.destCity || "",
      passengerName: selectedEmployee?.employeeEmail || "",
    });
  };

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddTicket((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBoucher(file);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ticketDetail", JSON.stringify(addTicket));
    formData.append("voucher", boucher);

    if (!addTicket.seatNumber || !addTicket.ticketPrice) {
      toast.error("Please fill in all required fields.");
      return;
    }

    dispatch(addTicketRdx(formData));
    setAddTicket({
      seatNumber: "",
      ticketPrice: "",
      bookingId: "",
    });
    isClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mx-auto">
          TICKET BOOKING
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
              <select
                id="travelGenId"
                name="travelGenId"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                onChange={handleChange}
              >
                <option value="" disabled selected className="text-gray-400">
                  Select Travel Id
                </option>
                {employeeTravelList.map((employee) => (
                  <option
                    key={employee.travelGenId}
                    value={employee.travelGenId}
                    className="text-gray-200"
                  >
                    {employee.travelGenId}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Travel Mode
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={selectedEmployee?.travelMode || ""}
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
                value={selectedEmployee?.travelDate || ""}
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
                value={selectedEmployee?.travelDate || ""}
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
                value={selectedEmployee?.destCity || ""}
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
                value={selectedEmployee?.destCity || ""}
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
                value={selectedEmployee?.employeeEmail || ""}
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
                value={addTicket.seatNumber}
                onChange={handleChangeAdd}
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
                value={addTicket.ticketPrice}
                onChange={handleChangeAdd}
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
                value={addTicket.bookingId}
                onChange={handleChangeAdd}
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
            onClick={handleAdd}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketModel;