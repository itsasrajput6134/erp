import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStatesRdx,
  addStateRdx,
  updateStateRdx,
  deleteStateRdx,
} from "../../../store/actions/stateAction";
import { fetchCountriesRdx } from "../../../store/actions/countryActions";
import CreateStateModal from "./CreateStateModal";
import UpdateStateModal from "./UpdateStateModal";
import StateTable from "./StateTable";

const State = () => {
  const dispatch = useDispatch();
  const { countries, countryLoading, countryError } = useSelector(
    (state) => state.country
  );
  const { states, statesLoading, statesError } = useSelector(
    (state) => state.state
  );

  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addState, setAddState] = useState({
    stateName: "",
    country: "",
  });
  const [updateState, setUpdateState] = useState({
    stateName: "",
    countryName: "",
  });

  useEffect(() => {
    dispatch(fetchCountriesRdx());
    dispatch(fetchStatesRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddState((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateState((prevDetails) => ({
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
    setUpdateState(data);
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    dispatch(deleteStateRdx(data.stateId));
  };

  // Add the State in the database
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addState.country || !addState.stateName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addStateRdx(addState));
    setAddState({ countryName: "", stateName: "" });
    setIsModalOpenCreate(false);
  };


  // Update the State in the database
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!updateState.countryName || !updateState.stateName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateStateRdx(updateState));
    setUpdateState({ countryName: "", stateName: "" });
    setIsModalOpenUpdate(false);
  };

  return (
    <>
      <div>
        <section className="wrapper">
          <section
            className="common-section contact-section text-white"
            id="Country"
          >
            <div className="container text-end common-title fw-bold">
              {/* <h2 className="common-heading text-white">
                State Creation{" "}
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
              🌍 STATE TABLE
              </h2>
             <button
                onClick={handleCreate}
                className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
                >
                <IoMdAddCircleOutline />
                <span className="text-sm font-medium">State Creation</span>
             </button>
            </div>
            </div>
          </section>
        </section>

        <StateTable
          states={states}
          statesLoading={statesLoading}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>

      <CreateStateModal
        isOpen={isModalOpenCreate}
        onClose={handlecloseCreate}
        onSubmit={handleAdd}
        countries={countries}
        stateData={addState}
        handleChange={handleChangeAdd}
      />

      <UpdateStateModal
        isOpen={isModalOpenUpdate}
        onClose={handlecloseUpdate}
        onSubmit={handleUpdateSubmit}
        stateData={updateState}
        handleChange={handleChangeUpdate}
      />

      <Toaster />
    </>
  );
};

export default State;
