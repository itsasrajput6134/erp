import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProcesssRdx,
  addProcessRdx,
  updateProcessRdx,
  deleteProcessRdx,
} from "../../../store/actions/processActions.js";
import CreateProcessModel from "./CreateProcessModel.js";
import UpdateProcessModel from "./UpdateProcessModel.js";
import ProcessTable from "./ProcessTable.js";

const ProcessName = () => {
  const dispatch = useDispatch();
  const { processs, processLoading, processError } = useSelector((state) => state.process);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addProcess, setAddProcess] = useState({
    name: "",
  });
  const [updateProcess, setUpdateProcess] = useState({
    id: "",
    name: "",
  });

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddProcess((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateProcess((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchProcesssRdx());
  }, [dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(addProcess);
    if (!addProcess.name) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addProcessRdx(addProcess));
    setAddProcess({ name: "" });
    setIsModalOpenCreate(false);
  };

  const handlUpdate = async (e) => {
    e.preventDefault();
    console.log(updateProcess);
    if (!updateProcess.name) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateProcessRdx(updateProcess));
    setUpdateProcess({ name: "", id: "" });
    setIsModalOpenUpdate(false);
  };

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };
  const handleUpdate = (data) => {
    console.log(data);
    setUpdateProcess({
      name: data.name,
      id: data.id,
    });
    setIsModalOpenUpdate(true);
  };
  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const handleDelete = async (data) => {
    console.log(data);
    dispatch(deleteProcessRdx(data.id));
  };
  return (
    <>
      <div>
        <section class="wrapper">
          <section
            class="common-section contact-section text-white"
            id="Country"
          >
        <div className="flex justify-between pr-7">
        <h2 className="text-left pl-6 font-bold text-white">
        PROCESS TABLE
        </h2>
        
        <button
        onClick={handleCreate}
        className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
        >
        <IoMdAddCircleOutline className="w-4 h-4" />
        <span className="font-medium">Process Creation</span>
        </button>
        </div>
          </section>
        </section>
        <ProcessTable
          processs={processs}
          processLoading={processLoading}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <CreateProcessModel
        isModalOpenCreate={isModalOpenCreate}
        handlecloseCreate={handlecloseCreate}
        addProcess={addProcess}
        handleChangeAdd={handleChangeAdd}
        handleAdd={handleAdd}
      />
      <UpdateProcessModel
        isModalOpenUpdate={isModalOpenUpdate}
        handlecloseUpdate={handlecloseUpdate}
        updateProcess={updateProcess}
        handleChangeUpdate={handleChangeUpdate}
        handlUpdate={handlUpdate}
      />
      <Toaster />
    </>
  );
};

export default ProcessName;