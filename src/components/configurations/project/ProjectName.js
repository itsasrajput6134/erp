import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartmentsRdx } from "../../../store/actions/departmentActions";
import {
  fetchProjectsRdx,
  addprojectRdx,
  updateprojectRdx,
  deleteProjectRdx,
} from "../../../store/actions/projectActions";
import { fetchClientsRdx } from "../../../store/actions/clientActions";
import { fetchEmployeesActiveRdx } from "../../../store/actions/employeeActions";
import ProjectTable from "./ProjectTable";
import CreateProjectModel from "./CreateProjectModel";
import UpdateProjectModel from "./UpdateProjectModel";

const ProjectName = () => {
  const dispatch = useDispatch();
  const { projects, projectsLoading, projectsError } = useSelector(
    (state) => state.project
  );
  const { departments, departmentsLoading, departmentsError } = useSelector(
    (state) => state.department
  );
  const { clients, clientsLoading, clientsError } = useSelector(
    (state) => state.client
  );
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addProjects, setAddProjects] = useState({
    departmentName: "",
    department: "",
    // projectClient: "",
    clientId: "",
    projectName: "",
    accountManagerId:"",
  });

  const [updateProject, setUpdateProject] = useState({
    departmentName: "",
    department: "",
    // projectClient: "",
    clientId: "",
    projectName: "",
    accountManagerId:"",
  });

  useEffect(() => {
    dispatch(fetchDepartmentsRdx());
    dispatch(fetchProjectsRdx());
    dispatch(fetchClientsRdx());
    dispatch(fetchEmployeesActiveRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddProjects((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUpdateProject((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    console.log(updateProject);
  };

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
  };

  const handleUpdate = (data) => {
    console.log(data);
    setUpdateProject({ ...data });
    setIsModalOpenUpdate(true);
  };

  const handlecloseUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  const handleDelete = async (data) => {
    console.log(data);
    dispatch(deleteProjectRdx(data.projectId));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(addProjects);

    dispatch(addprojectRdx(addProjects));
    setAddProjects({
      departmentName: "",
      projectName: "",
      // projectClient: "",
      clientId: "",
      accountManagerId:"",
    });
    setIsModalOpenCreate(false);
  };

  const handlUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(updateProject);

    dispatch(updateprojectRdx(updateProject));
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
                Project Creation{" "}
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
              📂 PROJECT TABLE
              </h2>
            <button
            onClick={handleCreate}
            className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
            >
            <IoMdAddCircleOutline className="text-base" />
            <span className="text-sm font-medium">Project Creation</span>
          </button>
            </div>
            </div>
          </section>
        </section>
        <ProjectTable
          projectsLoading={projectsLoading}
          projects={projects}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
      <CreateProjectModel
        isOpen={isModalOpenCreate}
        onClose={handlecloseCreate}
        addProjects={addProjects}
        handleChangeAdd={handleChangeAdd}
        departments={departments}
        handleAdd={handleAdd}
        clients={clients}
        employees={employees}
      />
      <UpdateProjectModel
        isOpen={isModalOpenUpdate}
        onClose={handlecloseUpdate}
        updateProject={updateProject}
        handleChangeUpdate={handleChangeUpdate}
        clients={clients}
        handlUpdateSubmit={handlUpdateSubmit}
        employees={employees}
      />
    </>
  );
};

export default ProjectName;
