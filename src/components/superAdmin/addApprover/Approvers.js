import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import CreateApproverModel from "./CreateApproverModel";


const Approvers = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  const handleCreate = () => {
    setIsModalOpenCreate(true);
  };
  const handlecloseCreate = () => {
    setIsModalOpenCreate(false);
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
               <div className="flex justify-end pr-5">
                 <button
                 onClick={handleCreate}
                 className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
                 >
                <IoMdAddCircleOutline className="w-4 h-4" />
                <span className="font-medium">Create Approver</span>
                </button>
                </div>
            </div>
          </section>
        </section>
        {/* <ProjectTable
          projectsLoading={projectsLoading}
          projects={projects}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        /> */}
      </div>
      <CreateApproverModel
      isOpen={isModalOpenCreate}
      onClose={handlecloseCreate}
      />
    </>
  );
};

export default Approvers;