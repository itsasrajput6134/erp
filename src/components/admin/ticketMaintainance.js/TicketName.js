import React, { useEffect, useState } from 'react'
import TicketTable from './TicketTable'
import CreateTicketModel from './CreateTicketModel'
import UpdateTicketModel from './UpdateTicketModel'
import { IoMdAddCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTicketsRdx,
  addTicketRdx,
  updateTicketRdx,
  deleteTicketRdx,
} from "../../../store/actions/ticketActions";
import axios from 'axios';
import endpoints from '../../../ApiEndpoint';

const TicketName = () => {
  const dispatch = useDispatch();
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
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
  });
  const {tickets , ticketLoading, ticketError } = useSelector(
    (state) => state.ticket
  );
  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${endpoints.getTravellerEmployeesByStatus}/APPROVED`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      setEmployeeTravelList(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch the travel list");
    } 
  };
  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    dispatch(fetchTicketsRdx());
  }, [dispatch]);

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };
  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };
  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const handleUpdate = (data) => {
    console.log(data);
    setUpdateTicket(data);
    setIsModalOpenUpdate(true);
  };
  const handleDelete = async (data) => {
    dispatch(deleteTicketRdx(data.travelGenId));
  };
  
  return (
    <>
      <div>
        <section class="wrapper">
          <section
            class="common-section contact-section text-white"
            id="Country"
          >
            <div class="container text-end common-title fw-bold">
          {/* <button
            onClick={handleCreate}
            className="flex items-center gap-1 bg-gradient-to-r from-black to-gray-800 text-white px-3 py-1 text-sm rounded-xl shadow-md hover:from-gray-900 hover:to-black transition-all transform hover:scale-105"
            >
            <IoMdAddCircleOutline className="text-base" />
            <span className="text-sm font-medium">Create Ticket</span>
          </button> */}
          <div className="flex justify-between pr-4">
            <h2 className="text-left pl-5 font-bold text-white">Ticket Details</h2>
          <button
            onClick={handleCreate}
            className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
            >
            <IoMdAddCircleOutline className="w-4 h-4" />
            <span className="text-sm font-medium">Create Ticket</span>
          </button>
            </div>
            </div>
          </section>
        </section>
        <TicketTable
          ticketLoading={ticketLoading}
          tickets={tickets}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <CreateTicketModel
        isOpen={isModalOpenCreate}
        isClose={handlecloseCreate}
        employeeTravelList={employeeTravelList}
      />
      <UpdateTicketModel
        isOpen={isModalOpenUpdate}
        isClose={handlecloseUpdate}
        selectedEmployee={updateTicket}
        // handleChangeUpdate={handleChangeUpdate}
        // handlUpdateSubmit={handlUpdateSubmit}
      />
    </>
  )
}

export default TicketName
