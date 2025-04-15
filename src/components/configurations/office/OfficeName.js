import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchStatesRdx } from "../../../store/actions/stateAction";
import {
  fetchOfficesRdx,
  addofficeRdx,
  updateofficeRdx,
  deleteOfficeRdx,
} from "../../../store/actions/officeActions";
import OfficeTable from "./OfficeTable";
import CreateOfficeModel from "./CreateOfficeModel";
import UpdateOfficeModel from "./UpdateOfficeModel";

const OfficeName = () => {
  const dispatch = useDispatch();
  const { states, statesLoading, statesError } = useSelector(
    (state) => state.state
  );
  const { offices, officesLoading, officesError } = useSelector(
    (state) => state.office
  );
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const [addOffice, setAddOffice] = useState({
    stateName: "",
    officeLocation: "",
    officeAddress: "",
    officePincode: "",
  });

  const [updateOffice, setUpdateOffice] = useState({
    // State for adding state
    state: "",
    officeLocation: "",
    officeAddress: "",
    officePincode: "",
  });

  useEffect(() => {
    dispatch(fetchStatesRdx());
    dispatch(fetchOfficesRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddOffice((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateOffice((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };

  const handleUpdate = (data) => {
    console.log(data);
    setUpdateOffice(data);
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    dispatch(deleteOfficeRdx(data.officeId));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(addOffice);
    if (
      !addOffice.officeLocation ||
      !addOffice.officeAddress ||
      !addOffice.officePincode
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    dispatch(addofficeRdx(addOffice));
    setAddOffice({ officeAddress: "", officeLocation: "", officePincode: "" });
    setIsModalOpenCreate(false);
  };

  const handlUpdateSubmit = async (e) => {
    e.preventDefault();
    if (
      !updateOffice.officeAddress ||
      !updateOffice.officeLocation ||
      !updateOffice.officePincode
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateofficeRdx(updateOffice));
    setUpdateOffice({
      officeAddress: "",
      officeLocation: "",
      officePincode: "",
    });
    setIsModalOpenUpdate(false);
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
                Office Creation{" "}
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
              🏢 OFFICE TABLE
              </h2>
              <button
                onClick={handleCreate}
                className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
              >
              <IoMdAddCircleOutline />
              <span className="text-sm font-medium">Office Creation</span>
              </button>
            </div>
            </div>
          </section>
        </section>
        <OfficeTable
          officesLoading={officesLoading}
          offices={offices}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <CreateOfficeModel
        isOpen={isModalOpenCreate}
        isClose={handlecloseCreate}
        addOffice={addOffice}
        handleChangeAdd={handleChangeAdd}
        handleAdd={handleAdd}
        states={states}
      />
      <UpdateOfficeModel
        isOpen={isModalOpenUpdate}
        isClose={handlecloseUpdate}
        updateOffice={updateOffice}
        handleChangeUpdate={handleChangeUpdate}
        handlUpdateSubmit={handlUpdateSubmit}
      />
    </>
  );
};

export default OfficeName;
