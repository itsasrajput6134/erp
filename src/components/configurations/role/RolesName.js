import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRolesRdx,
  addRoleRdx,
  updateRoleRdx,
  deleteRoleRdx,
} from "../../../store/actions/roleActions.js";
import AssetTable from "../asset/AssetTable.js";
import CreateRoleModel from "./CreateRoleModel.js";
import UpdateRoleModel from "./UpdateRoleModel.js";
import RoleTable from "./RoleTable.js";

const RolesName = () => {
  const dispatch = useDispatch();
  const { roles, roleLoading, roleError } = useSelector((state) => state.role);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addRole, setAddRole] = useState({
    name: "",
  });
  const [updateRole, setUpdateRole] = useState({
    id: "",
    name: "",
  });

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddRole((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateRole((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchRolesRdx());
  }, [dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(addRole);
    if (!addRole.name) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(addRoleRdx(addRole));
    setAddRole({ name: "" });
    setIsModalOpenCreate(false);
  };

  const handlUpdate = async (e) => {
    e.preventDefault();
    console.log(updateRole);
    if (!updateRole.name) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateRoleRdx(updateRole));
    setUpdateRole({ name: "", id: "" });
    setIsModalOpenUpdate(false);
  };

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };
  const handleUpdate = (data) => {
    setUpdateRole({
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
    dispatch(deleteRoleRdx(data.id));
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
                Role Creation{" "}
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
              👤 ROLE TABLE
              </h2>
            <button
            onClick={handleCreate}
            className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
            >
            <IoMdAddCircleOutline className="text-base" />
            <span className="text-sm font-medium">Role Creation</span>
          </button>
            </div>
            </div>
          </section>
        </section>
        <RoleTable
          roles={roles}
          roleLoading={roleLoading}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <CreateRoleModel
        isModalOpenCreate={isModalOpenCreate}
        handlecloseCreate={handlecloseCreate}
        addRole={addRole}
        handleChangeAdd={handleChangeAdd}
        handleAdd={handleAdd}
      />
      <UpdateRoleModel
        isModalOpenUpdate={isModalOpenUpdate}
        handlecloseUpdate={handlecloseUpdate}
        updateRole={updateRole}
        handleChangeUpdate={handleChangeUpdate}
        handlUpdate={handlUpdate}
      />
      <Toaster />
    </>
  );
};

export default RolesName;
