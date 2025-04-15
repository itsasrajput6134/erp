import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCountriesRdx,
  addCountryRdx,
  updateCountryRdx,
  deleteCountryRdx,
} from "../../../store/actions/countryActions.js";
import CountryTable from "./CountryTable";
import CountryForm from "./CountryForm";

const Country = () => {
  const dispatch = useDispatch();
  const { countries, countryLoading, countryError } = useSelector(
    (state) => state.country
  );
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [addCountry, setAddCountry] = useState({ countryName: "" });
  const [updateCountry, setUpdateCountry] = useState({ countryName: "" });

  useEffect(() => {
    dispatch(fetchCountriesRdx());
  }, [dispatch]);

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddCountry((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateCountry((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!addCountry.countryName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    dispatch(addCountryRdx(addCountry));
    setAddCountry({ countryName: "" });
    setIsModalOpenCreate(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateCountry.countryName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    dispatch(updateCountryRdx(updateCountry));
    setUpdateCountry({ countryName: "" });
    setIsModalOpenUpdate(false);
  };

  const openCreateModal = () => setIsModalOpenCreate(true);
  const closeCreateModal = () => setIsModalOpenCreate(false);
  const openUpdateModal = (data) => {
    setUpdateCountry(data);
    setIsModalOpenUpdate(true);
  };
  const closeUpdateModal = () => setIsModalOpenUpdate(false);

  const handleDelete = async (data) => {
    dispatch(deleteCountryRdx(data.countryId));
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
                Country Creation{" "}
                <span
                  className="fs-2"
                  onClick={openCreateModal}
                  style={{ cursor: "pointer" }}
                >
                  <IoMdAddCircleOutline />
                </span>
              </h2> */}
              {/* <div className="border border-gray-700 rounded-lg px-4 py-2 w-fit bg-gray-800"> */}
              <div className="flex justify-between pr-4">
              <h2 className="text-left pl-5 font-bold text-white">
              🌍 COUNTRY TABLE
              </h2>

              <button
              onClick={openCreateModal}
              className="flex items-center gap-1 text-gray-900 dark:text-gray-400 border border-gray-800 dark:border-gray-600 hover:text-white hover:bg-gray-900 dark:hover:text-white dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-md text-xs px-4 py-2 transition-all"
              >
              <IoMdAddCircleOutline className="w-4 h-4" />
              <span className="font-medium">Create</span>
              </button>
              </div>
            </div>
          </section>
        </section>

        <CountryTable
          countries={countries}
          countryLoading={countryLoading}
          handleUpdate={openUpdateModal}
          handleDelete={handleDelete}
        />
      </div>

      {isModalOpenCreate && (
        <CountryForm
          country={addCountry}
          handleChange={handleChangeAdd}
          handleSubmit={handleAdd}
          handleClose={closeCreateModal}
          title="CREATE COUNTRY"
        />
      )}

      {isModalOpenUpdate && (
        <CountryForm
          country={updateCountry}
          handleChange={handleChangeUpdate}
          handleSubmit={handleUpdate}
          handleClose={closeUpdateModal}
          title="UPDATE COUNTRY"
        />
      )}

      <Toaster />
    </>
  );
};

export default Country;










// import React, { useEffect, useState } from "react";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import { toast, Toaster } from "react-hot-toast";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchCountriesRdx,
//   addCountryRdx,
//   updateCountryRdx,
//   deleteCountryRdx,
// } from "../../../store/actions/countryActions.js";
// import CountryTable from "./CountryTable";
// import CountryForm from "./CountryForm";

// const Country = () => {
//   const dispatch = useDispatch();
//   const { countries, countryLoading, countryError } = useSelector(
//     (state) => state.country
//   );
//   const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
//   const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
//   const [addCountry, setAddCountry] = useState({ countryName: "" });
//   const [updateCountry, setUpdateCountry] = useState({ countryName: "" });

//   useEffect(() => {
//     dispatch(fetchCountriesRdx());
//   }, [dispatch]);

//   const handleChangeAdd = (e) => {
//     const { name, value } = e.target;
//     setAddCountry((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleChangeUpdate = (e) => {
//     const { name, value } = e.target;
//     setUpdateCountry((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     if (!addCountry.countryName) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
//     dispatch(addCountryRdx(addCountry));
//     setAddCountry({ countryName: "" });
//     setIsModalOpenCreate(false);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!updateCountry.countryName) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
//     dispatch(updateCountryRdx(updateCountry));
//     setUpdateCountry({ countryName: "" });
//     setIsModalOpenUpdate(false);
//   };

//   const openCreateModal = () => setIsModalOpenCreate(true);
//   const closeCreateModal = () => setIsModalOpenCreate(false);
//   const openUpdateModal = (data) => {
//     setUpdateCountry(data);
//     setIsModalOpenUpdate(true);
//   };
//   const closeUpdateModal = () => setIsModalOpenUpdate(false);

//   const handleDelete = async (data) => {
//     dispatch(deleteCountryRdx(data.countryId));
//   };

//   return (
//     <>
//       <div>
//         <section className="wrapper">
//           <section
//             className="common-section contact-section text-white"
//             id="Country"
//           >
//             <div className="container text-end common-title fw-bold">
//               <h2 className="common-heading text-white">
//                 Sytem configuration{" "}
//                 <span
//                   className="fs-2"
//                   onClick={openCreateModal}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <IoMdAddCircleOutline />
//                 </span>
//               </h2>
//             </div>
//           </section>
//         </section>

//         <CountryTable
//           countries={countries}
//           countryLoading={countryLoading}
//           handleUpdate={openUpdateModal}
//           handleDelete={handleDelete}
//         />
//       </div>

//       {isModalOpenCreate && (
//         <CountryForm
//           country={addCountry}
//           handleChange={handleChangeAdd}
//           handleSubmit={handleAdd}
//           handleClose={closeCreateModal}
//           title="Create System Configuration"
//         />
//       )}

//       {isModalOpenUpdate && (
//         <CountryForm
//           country={updateCountry}
//           handleChange={handleChangeUpdate}
//           handleSubmit={handleUpdate}
//           handleClose={closeUpdateModal}
//           title="Update System Configuration"
//         />
//       )}

//       <Toaster />
//     </>
//   );
// };

// export default Country;
