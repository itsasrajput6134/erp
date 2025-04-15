import React, { useEffect } from "react";
import Pagination from "../../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../store/actions/paginationActions";

const HolidayTable = ({
  holidaysLoading,
  holidays,
  handleUpdate,
  handleDelete,
}) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const itemsPerPage = 10;
  
  useEffect(() => {
    // Reset to page 1 when countries change
    dispatch(setCurrentPage(1));
  }, [holidays, dispatch]);

  const paginatedHolidays = holidays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Department Table */}
      <div class="table-agile-info">
        <div class="panel panel-default">
          {/* <div class="panel-heading">Holiday Table</div> */}
          <div class="table-responsive">
            <table class="table" width="100">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Holiday Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {holidaysLoading ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedHolidays.length > 0 ? (
                  paginatedHolidays.map((item) => ( 
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.name}</td>
                      <td>
                        <div className="d-flex">
                          <i
                            class="fa-solid fa-pen-to-square me-2"
                            onClick={() => handleUpdate(item)}
                          ></i>
                          <i
                            class="fa-solid fa-trash"
                            onClick={() => handleDelete(item)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No State found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
          <Pagination
            totalItems={holidays.length > 0 ? holidays.length : 0}
            itemsPerPage={itemsPerPage}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayTable;
