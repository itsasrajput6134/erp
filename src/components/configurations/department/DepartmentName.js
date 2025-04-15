import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficesRdx } from "../../../store/actions/officeActions";
import {
  fetchDepartmentsRdx,
  adddepartmentRdx,
  updatedepartmentRdx,
  deleteDepartmentRdx,
} from "../../../store/actions/departmentActions";
import DepartmentTable from "./DepartmentTable";
import CreateDepartmentModel from "./CreateDepartmentModel";
import UpdateDepartmentModel from "./UpdateDepartmentModel";
const DepartmentName = () => {
  const dispatch = useDispatch();
  const { offices, officesLoading, officesError } = useSelector(
    (state) => state.office
  );
  const { departments, departmentsLoading, departmentsError } = useSelector(
    (state) => state.department
  );
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addDepartment, setAddDepartment] = useState({
    office: "",
    officeName: "",
    departmentName: "",
  });

  const [updateDepartment, setUpdateDepartment] = useState({
    // State for adding state
    office: "",
    officeName: "",
    departmentName: "",
    departmentId: "",
  });

  useEffect(() => {
    dispatch(fetchOfficesRdx());
    dispatch(fetchDepartmentsRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddDepartment((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateDepartment((prevDetails) => ({
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
    setUpdateDepartment({
      office: data.office,
      officeName: data.officeName,
      departmentName: data.departmentName,
      departmentId: data.departmentId,
    });
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    console.log(data);
    dispatch(deleteDepartmentRdx(data.departmentId));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(addDepartment);
    if (!addDepartment.departmentName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(adddepartmentRdx(addDepartment));
    setAddDepartment({
      office: "",
      officeName: "",
      departmentName: "",
    });
    setIsModalOpenCreate(false);
  };

  const handlUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(updateDepartment);
    if (!updateDepartment.departmentName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updatedepartmentRdx(updateDepartment));
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
                Department Creation{" "}
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
              🏢 DEPARTMENT TABLE
              </h2>
             <button
                 onClick={handleCreate}
                 className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
                 >
                 <IoMdAddCircleOutline />
                 <span className="text-sm font-medium">Department Creation</span>
             </button>
            </div>
            </div>
          </section>
        </section>
        <DepartmentTable
          departmentsLoading={departmentsLoading}
          departments={departments}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
        <CreateDepartmentModel
          isOpen={isModalOpenCreate}
          isClose={handlecloseCreate}
          offices={offices}
          addDepartment={addDepartment}
          handleChangeAdd={handleChangeAdd}
          handleAdd={handleAdd}
        />
        <UpdateDepartmentModel
          isOpen={isModalOpenUpdate}
          isClose={handlecloseUpdate}
          updateDepartment={updateDepartment}
          handleChangeUpdate={handleChangeUpdate}
          handlUpdateSubmit={handlUpdateSubmit}
        />
      </div>
    </>
  );
};

export default DepartmentName;
