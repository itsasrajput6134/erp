import React, { useState } from "react";

const CreateApproverModel = ({ isOpen, onClose }) => {
  const [editIdx, setEditIdx] = useState(-1);
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    expenseDate: "",
    expenseType: "",
    description: "",
    expenseAmount: "",
    billId: "",
    filePath: "",
  });
  const handleEditRow = (idx) => {
    setEditIdx(idx);
  };
  const handleDeleteRow = (idx) => {
    const updatedRows = rows.filter((_, index) => index !== idx);
    setRows(updatedRows);
  };
  const handleEditChange = (e, idx) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[idx] = { ...updatedRows[idx], [name]: value };
    setRows(updatedRows);
    console.log(rows);
  };
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        expenseDate: newRow.expenseDate,
        expenseType: newRow.expenseType,
        description: newRow.description,
        expenseAmount: newRow.expenseAmount,
        billId: newRow.billId,
      },
    ]);
    setNewRow({
      expenseDate: "",
      expenseType: "",
      description: "",
      expenseAmount: "",
      billId: "",
    });
  };
  if (!isOpen) return null;
  return (
    // <div>
    //   <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
    //     <div className="modal-content w-75 p-3">
    //       <div className="row">
    //         <div class="container text-center common-title fw-bold col-11">
    //           <h2 class="common-heading mb-3">Add Approver</h2>
    //         </div>
    //         <div className="col-1">
    //           <i
    //             className="fa-solid fa-xmark mt-3 me-3 close"
    //             onClick={onClose}
    //           ></i>
    //         </div>
    //       </div>
    //       <div className="row h-75">
    //         <div class="container">
    //           <div class="form-section d-flex justify-content-start w-100">
    //             <div className="container">
    //               <div class="col-4">
    //                 <label for="exampleFormControlInput1" class="form-label">
    //                   Approver Page
    //                 </label>
    //                 <select
    //                   id="department"
    //                   name="department"
    //                   class="form-select"
    //                   // value={addProjects.department}
    //                   // onChange={handleChangeAdd}
    //                 >
    //                   <option value="" selected disabled>
    //                     Select Page
    //                   </option>
    //                   {/* {departments.map((dept) => (
    //                       <option
    //                         key={dept.departmentId}
    //                         value={dept.departmentId}
    //                       >
    //                         {`${dept.departmentName}(${dept.officeName})`}
    //                       </option>
    //                     ))} */}
    //                 </select>
    //               </div>
    //               <div class="row mb-3 mt-3">
    //                 <div className="table-agile-info pt-3 pb-3">
    //                   <div className="panel panel-default">
    //                     <div className="table-responsive">
    //                       {rows.length > 0 && (
    //                         <div
    //                           style={{ maxHeight: "300px", overflowY: "auto" }}
    //                         >
    //                           <table className="table table-bordered">
    //                             <thead>
    //                               <tr>
    //                                 <th>Select Approver</th>
    //                                 <th>Role</th>
    //                                 <th>Step Order</th>
    //                                 <th>Actions</th>
    //                               </tr>
    //                             </thead>
    //                             <tbody>
    //                               {rows.map((row, idx) => (
    //                                 <tr key={idx}>
    //                                   <>
    //                                     <td>
    //                                       <select
    //                                         id="expenseType"
    //                                         name="expenseType"
    //                                         className="form-select"
    //                                         // value={row.expenseType}
    //                                         // onChange={(e) => handleEditChange(e, idx)}
    //                                         readOnly={
    //                                           editIdx === idx ? false : true
    //                                         }
    //                                       >
    //                                         <option value="a" disabled selected>
    //                                           Select Claim Type
    //                                         </option>
    //                                         {/* {claimType.length > 0 &&
    //                               claimType.map((claim) => (
    //                                 <option
    //                                   index={claim.id}
    //                                   value={claim.claimTypeName}
    //                                 >
    //                                   {claim.claimTypeName}
    //                                 </option>
    //                               ))} */}
    //                                       </select>
    //                                     </td>
    //                                     <td>
    //                                       <input
    //                                         type="text"
    //                                         name="billId"
    //                                         // value={row.billId}
    //                                         // onChange={(e) => handleEditChange(e, idx)}
    //                                         className="form-control"
    //                                         readOnly={
    //                                           editIdx === idx ? false : true
    //                                         }
    //                                       />
    //                                     </td>
    //                                     <td>
    //                                       <input
    //                                         type="text"
    //                                         name="description"
    //                                         value={row.description}
    //                                         onChange={(e) =>
    //                                           handleEditChange(e, idx)
    //                                         }
    //                                         className="form-control"
    //                                         readOnly={
    //                                           editIdx === idx ? false : true
    //                                         }
    //                                       />
    //                                     </td>
    //                                   </>
    //                                   <td>
    //                                     <div className="d-flex justify-content-between">
    //                                       {editIdx === idx ? (
    //                                         <i
    //                                           class="fa-solid fa-floppy-disk fs-3 me-2"
    //                                           //   onClick={handleSaveRow}
    //                                         ></i>
    //                                       ) : (
    //                                         <i
    //                                           class="fa-solid fa-pen-to-square fs-3 me-2"
    //                                           onClick={() => handleEditRow(idx)}
    //                                         ></i>
    //                                       )}

    //                                       <i
    //                                         class="fa-solid fa-trash fs-3 me-2"
    //                                         onClick={() => handleDeleteRow(idx)}
    //                                       ></i>
    //                                     </div>
    //                                   </td>
    //                                 </tr>
    //                               ))}
    //                             </tbody>
    //                           </table>
    //                         </div>
    //                       )}
    //                       <div className="text-start">
    //                         <button
    //                           className="btn btn-danger"
    //                           onClick={handleAddRow}
    //                         >
    //                           Add Approver
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="text-center mb-3 d-flex justify-content-center">
    //             <button class="btn btn-primary me-3">Submit</button>
    //             <button class="btn btn-danger me-3" onClick={onClose}>
    //               Cancel
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 overflow-y-auto max-h-[90vh]">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mx-auto">
        Add Approver
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-200 transition-colors"
      >
        <i className="fa-solid fa-xmark text-2xl"></i>
      </button>
    </div>

    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Approver Page
          </label>
          <select
            id="department"
            name="department"
            className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            // value={addProjects.department}
            // onChange={handleChangeAdd}
          >
            <option value="" disabled selected>
              Select Page
            </option>
            {/* {departments.map((dept) => (
              <option
                key={dept.departmentId}
                value={dept.departmentId}
              >
                {`${dept.departmentName}(${dept.officeName})`}
              </option>
            ))} */}
          </select>
        </div>
      </div>

      <div className="pt-3 pb-3">
        <div className="panel panel-default">
          <div className="table-responsive">
            {rows.length > 0 && (
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full border-collapse border border-gray-600">
                  <thead>
                    <tr>
                      <th className="border border-gray-600 p-2 text-gray-300">Select Approver</th>
                      <th className="border border-gray-600 p-2 text-gray-300">Role</th>
                      <th className="border border-gray-600 p-2 text-gray-300">Step Order</th>
                      <th className="border border-gray-600 p-2 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-600 p-2">
                          <select
                            id="expenseType"
                            name="expenseType"
                            className="w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                            // value={row.expenseType}
                            // onChange={(e) => handleEditChange(e, idx)}
                            readOnly={editIdx === idx ? false : true}
                          >
                            <option value="a" disabled selected>
                              Select Claim Type
                            </option>
                            {/* {claimType.length > 0 &&
                              claimType.map((claim) => (
                                <option
                                  index={claim.id}
                                  value={claim.claimTypeName}
                                >
                                  {claim.claimTypeName}
                                </option>
                              ))} */}
                          </select>
                        </td>
                        <td className="border border-gray-600 p-2">
                          <input
                            type="text"
                            name="billId"
                            // value={row.billId}
                            // onChange={(e) => handleEditChange(e, idx)}
                            className="w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                            readOnly={editIdx === idx ? false : true}
                          />
                        </td>
                        <td className="border border-gray-600 p-2">
                          <input
                            type="text"
                            name="description"
                            value={row.description}
                            onChange={(e) => handleEditChange(e, idx)}
                            className="w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                            readOnly={editIdx === idx ? false : true}
                          />
                        </td>
                        <td className="border border-gray-600 p-2">
                          <div className="flex justify-between">
                            {editIdx === idx ? (
                              <i
                                className="fa-solid fa-floppy-disk text-xl cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
                                // onClick={handleSaveRow}
                              ></i>
                            ) : (
                              <i
                                className="fa-solid fa-pen-to-square text-xl cursor-pointer text-gray-300 hover:text-purple-400 transition-colors"
                                onClick={() => handleEditRow(idx)}
                              ></i>
                            )}
                            <i
                              className="fa-solid fa-trash text-xl cursor-pointer text-gray-300 hover:text-red-400 transition-colors"
                              onClick={() => handleDeleteRow(idx)}
                            ></i>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="text-start mt-4">
              <button
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
                onClick={handleAddRow}
              >
                Add Approver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 flex justify-end space-x-4">
      <button
        onClick={onClose}
        className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
      >
        Cancel
      </button>
    </div>
  </div>
</div>
  );
};

export default CreateApproverModel;