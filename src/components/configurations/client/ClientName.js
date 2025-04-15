import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchClientsRdx,
  addClientRdx,
  updateClientRdx,
  deleteClientRdx,
} from "../../../store/actions/clientActions";
import ClientTable from "./ClientTable";
import CreateClientModel from "./CreateClientModel";
import UpdateClientModel from "./UpdateClientModel";

const ClientName = () => {
  const dispatch = useDispatch();
  const { clients, clientsLoading, clientsError } = useSelector(
    (state) => state.client
  );
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addClients, setAddClients] = useState({
    spocName: "",
    clientName: "",
    email: "",
    address: "",
    phonenumber: "",
    bussinessnumber: "",
  });

  const [updateClients, setUpdateClients] = useState({
    clientId: "",
    spocName: "",
    clientName: "",
    email: "",
    address: "",
    phonenumber: "",
    bussinessnumber: "",
  });

  useEffect(() => {
    dispatch(fetchClientsRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddClients((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateClients((prevDetails) => ({
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
    setUpdateClients(data);
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    dispatch(deleteClientRdx(data.clientId));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(addClientRdx(addClients));
    setAddClients({
      spocName: "",
      clientName: "",
      email: "",
      address: "",
      phonenumber: "",
      bussinessnumber: "",
    });
    setIsModalOpenCreate(false);
  };

  const handlUpdateSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateClientRdx(updateClients));
    setUpdateClients({
      spocName: "",
      clientName: "",
      email: "",
      address: "",
      phonenumber: "",
      bussinessnumber: "",
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
                Client Creation{" "}
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
              👥 CLIENT TABLE
              </h2>
            <button
            onClick={handleCreate}
            className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
            >
            <IoMdAddCircleOutline className="text-base" />
            <span className="text-sm font-medium">Client Creation</span>
          </button>
            </div>
            </div>
          </section>
        </section>
        <ClientTable
          clientsLoading={clientsLoading}
          clients={clients}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <CreateClientModel
        isOpen={isModalOpenCreate}
        onClose={handlecloseCreate}
        addClients={addClients}
        handleChangeAdd={handleChangeAdd}
        handleAdd={handleAdd}
      />
      <UpdateClientModel
        isOpen={isModalOpenUpdate}
        onClose={handlecloseUpdate}
        updateClients={updateClients}
        handleChangeUpdate={handleChangeUpdate}
        handlUpdateSubmit={handlUpdateSubmit}
      />
    </>
  );
};

export default ClientName;
