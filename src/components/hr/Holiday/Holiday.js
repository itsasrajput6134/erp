import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHolidaysRdx,
  addHolidayRdx,
  updateHolidayRdx,
  deleteHolidayRdx,
} from "../../../store/actions/holidayActions";
import HolidayTable from "./HolidayTable";
import CreateHolidayModel from "./CreateHolidayModel";
import UpdateHolidayModel from "./UpdateHolidayModel";
import toast from "react-hot-toast";
const Holiday = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const [addHoliday, setAddHoliday] = useState({
    id:"",
    name: "",
    date: "",
    description: "",
  });
  const [updateHoliday, setUpdateHoliday] = useState({
    id:"",
    name: "",
    date: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { holidays, holidayLoading, holidayError } = useSelector(
    (state) => state.holiday
  );
  useEffect(() => {
   dispatch(fetchHolidaysRdx());
  }, [dispatch]);

  const handleCreate = () => {    
    setIsModalOpenCreate(true);
  };
  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddHoliday((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  
  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateHoliday((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(addHoliday);
    if (!addHoliday.name || !addHoliday.date) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addHolidayRdx(addHoliday));
    setAddHoliday({
      id:"",
      date: "",
      name: "",
      description: "",
    });
    setIsModalOpenCreate(false);
  };
  const handlUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(updateHoliday);
    if (!updateHoliday.date) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateHolidayRdx(updateHoliday));
    setIsModalOpenUpdate(false);
  };
  const handleUpdate = (data) => {
    console.log(data);
    setUpdateHoliday({
      id:data.id,
      date: data.date,
      name: data.name,
      description: data.description,
    });
    setIsModalOpenUpdate(true);
  };
  const handleDelete = async (data) => {
    console.log(data);
    dispatch(deleteHolidayRdx(data.id));
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
            {/* <h2 class="common-heading text-white">
              Add Holiday{" "}
              <span
                className="fs-2"
                onClick={handleCreate}
                style={{ cursor: "pointer" }}
              >
                <IoMdAddCircleOutline />
              </span>
            </h2> */}
             <div className="flex justify-between pr-4">
              <h2 className="text-left pl-5 font-bold text-white">
               HOLIDAY TABLE
              </h2>
            <button
              onClick={handleCreate}
              className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
            >
            <IoMdAddCircleOutline />
            <span className="text-sm font-medium">Add Holiday</span>
            </button>
          </div>
          </div>
        </section>
      </section>
      <HolidayTable
        holidaysLoading={holidayLoading}
        holidays={holidays}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <CreateHolidayModel
        isOpen={isModalOpenCreate}
        isClose={handlecloseCreate}
        addHoliday={addHoliday}
        handleChangeAdd={handleChangeAdd}
        handleAdd={handleAdd}
      />
      <UpdateHolidayModel
        isOpen={isModalOpenUpdate}
        isClose={handlecloseUpdate}
        updateHoliday={updateHoliday}
        handleChangeUpdate={handleChangeUpdate}
        handlUpdateSubmit={handlUpdateSubmit}
      />
    </div>
  </>
  )
}

export default Holiday
