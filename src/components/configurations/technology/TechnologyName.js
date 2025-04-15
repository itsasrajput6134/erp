import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import endpoints from "../../../ApiEndpoint";
import { toast, Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchTechnologiesRdx,
  addTechnologyRdx,
  updateTechnologyRdx,
  deleteTechnologyRdx,
} from "../../../store/actions/technologyActions";
import TechnologyTable from "./TechnologyTable";
import CreateTechnologyModel from "./CreateTechnologyModel";
import UpdateTechnologyModel from "./UpdateTechnologyModel";

const TechnologyName = () => {
  const dispatch = useDispatch();
  const { technologies, technologiesLoading, technologiesError } = useSelector(
    (state) => state.technology
  );
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addTechnology, setAddTechnology] = useState({
    techName: "",
  });
  const [updateTechnology, setUpdateTechnology] = useState({
    techName: "",
  });

  useEffect(() => {
    dispatch(fetchTechnologiesRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddTechnology((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateTechnology((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(addTechnologyRdx(addTechnology));
    setAddTechnology({ techName: "" });
    setIsModalOpenCreate(false);
  };

  const handlUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateTechnologyRdx(updateTechnology));
    setIsModalOpenUpdate(false);
  };

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };
  const handleUpdate = (data) => {
    setUpdateTechnology(data);
    setIsModalOpenUpdate(true);
  };
  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const handleDelete = async (data) => {
    console.log(data);
    dispatch(deleteTechnologyRdx(data.techId));
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
                Technology Creation{" "}
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
              💻 TECHNOLOGY TABLE
              </h2>
            <button
            onClick={handleCreate}
            className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
            >
            <IoMdAddCircleOutline className="text-base" />
            <span className="text-sm font-medium">Technology Creation</span>
          </button>
            </div>
            </div>
          </section>
        </section>
        <TechnologyTable
          technologiesLoading={technologiesLoading}
          technologies={technologies}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <CreateTechnologyModel
        isOpen={isModalOpenCreate}
        onClose={handlecloseCreate}
        addTechnology={addTechnology}
        handleChangeAdd={handleChangeAdd}
        handleAdd={handleAdd}
      />
      <UpdateTechnologyModel
        isOpen={isModalOpenUpdate}
        onClose={handlecloseUpdate}
        updateTechnology={updateTechnology}
        handleChangeUpdate={handleChangeUpdate}
        handlUpdate={handlUpdate}
      />
    </>
  );
};

export default TechnologyName;
