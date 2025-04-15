import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints from "../../ApiEndpoint";
import toast from "react-hot-toast";
import CustomDatePicker from "./CustomDatePicker";

const Accomdation_Request = () => {
  const [employeeTravelList, setEmployeeTravelList] = useState([]);
  const [travelDetails, setTravelDetails] = useState();
  const [guestHouseDetail, setGuestHouseDetail] = useState([]);
  const [openCheckAvailabelDates, setOpenCheckAvailabelDates] = useState(false);
  const [bookedDates, setbookedDates] = useState([]);
  const [boucher, setBoucher] = useState()
  const [hotelDetail, setHotelDetail] = useState({
    travelRequestGenId: "",
    checkInDate: "",
    checkOutDate: "",
    hotelName: "",
    hotelAddress: "",
    hotelPhoneNumber: "",
  });
  const [guestHouseAvailable, setGuestHouseAvailable] = useState({
    guesthouseName: "",
    travelRequestGenId: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfRooms: 1,
  });
  const [employeeTravelListLoading, setEmployeeTravelListLoading] =
    useState(true);

  useEffect(() => {
    fetchList();
    setEmployeeTravelListLoading(false);
    fetchGuestHouse();
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setBoucher(file); 
  };


  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${endpoints.getTravellerEmployeesByStatus}/APPROVED`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      setEmployeeTravelList(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch the travel list");
    } finally {
      setEmployeeTravelListLoading(false);
    }
  };

  const fetchGuestHouse = async () => {
    try {
      const response = await axios.get(endpoints.getAllGuestHouse, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      setGuestHouseDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDetail = (item) => {
    console.log(item);
    setTravelDetails(item);
    setHotelDetail({
      ...hotelDetail,
      travelRequestGenId: item.travelGenId || "",
      checkInDate: item.checkinDate || "",
      checkOutDate: item.checkoutDate || "",
      hotelName: item.guestHouseName || "",
      hotelAddress: "",
      hotelPhoneNumber: "",
    });
  };

  const handleChange = (e) => {
    setHotelDetail({ ...hotelDetail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log(hotelDetail);
    formData.append("hotelDetail", JSON.stringify(hotelDetail)); // Send as a JSON string
    formData.append("voucher", boucher); // File upload
    console.log(endpoints.bookHotelBetweenCheckinCheckout, formData);
    try {
      const response = await axios.post(
        endpoints.bookHotelBetweenCheckinCheckout,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      fetchList();
      toast.success("Submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Submit.");
    }
  };

  const handleCheckHotelAvailablity = async () => {
    const requestData = {
      guesthouseName: travelDetails.guestHouseName || "",
      travelRequestGenId: travelDetails?.travelGenId || "",
      checkInDate: travelDetails?.checkinDate || "",
      checkOutDate: travelDetails?.checkoutDate || "",
      numberOfRooms: 1,
    };

    console.log(requestData);

    try {
      const response = await axios.post(
        endpoints.checkGuestHouseAvailable,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    fetchList();
  };

  const closeCheckCalender = () => {
    console.log("HelloClose");

    setOpenCheckAvailabelDates(false);
  };

  const openCheckCaleder = async (id) => {
    console.log("HelloOpen");
    await populateDate(id);
    await setOpenCheckAvailabelDates(true);
  };

  const populateDate = async (selectedKey) => {
    setbookedDates([]);
    try {
      const response = await axios.get(
        `${endpoints.getAllAvailableDates}${selectedKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      console.log(data);
      setbookedDates(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <section className="wrapper">
          <div className="table-agile-info">
            <div className="panel panel-default">
              <div className="panel-heading">Travel Approved Request</div>
              <div className="table-responsive">
                <table className="table" width="100">
                  <thead>
                    <tr>
                      <th>Travel Request Id</th>
                      <th>Accomadation Type</th>
                      <th>Travel Date</th>
                      <th>Mode Of Travel</th>
                      <th>Destination</th>
                      <th>Purpose Of Travel</th>
                      <th>Approver</th>
                      <th>Requester</th>
                      <th>Status</th>
                      <th>Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeTravelListLoading ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : employeeTravelList.length > 0 ? (
                      employeeTravelList.map((item) => (
                        <tr key={item.travelId}>
                          <td>{item.travelGenId}</td>
                          <td>{item.accommodationType}</td>
                          <td>{item.travelDate}</td>
                          <td>{item.travelMode}</td>
                          <td>
                            {item.accommodationType === "GUESTHOUSE"
                              ? `${item.destCity}`
                              : `${item.landMark}, ${item.destCity}, ${item.destCountry}`}
                          </td>
                          <td>{item.travelPurpose}</td>
                          <td>{item.approvalManager}</td>
                          <td>{item.employeeEmail}</td>
                          <td>{item.book}</td>
                          <td>
                            <div className="d-flex">
                              {item.hotelDetailIds.length > 0 ||
                                item.guestHouseDetailIds.length > 0 ? (
                                "Accommodation Booked"
                              ) : item.bookedStausGuestHouse ===
                                "Not Avaialble" ? (
                                "Not Available"
                              ) : (
                                <i
                                  className="fa-solid fa-book me-2"
                                  data-bs-toggle="modal"
                                  data-bs-target={
                                    item.accommodationType === "HOTEL"
                                      ? "#staticBackdropHotel"
                                      : "#staticBackdropGuestHouse"
                                  }
                                  onClick={() => {
                                    handleGetDetail(item);
                                  }}
                                ></i>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No Request Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Hotel Booking Model */}
      <div
        className="modal fade"
        id="staticBackdropHotel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Hotel Booking Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row mb-3">
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Travel Request Id
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="travelRequestGenId"
                      name="travelRequestGenId"
                      placeholder="travelRequestGenId"
                      value={travelDetails?.travelGenId || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Accomadation Type
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="accommodationType"
                      name="accommodationType"
                      placeholder="accommodationType"
                      value={travelDetails?.accommodationType || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Travel Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="travelDate"
                      name="travelDate"
                      placeholder="travelDate"
                      value={travelDetails?.travelDate || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Check-in Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkInDate"
                      name="checkInDate"
                      placeholder="checkInDate"
                      value={travelDetails?.checkinDate || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Check-out Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkOutDate"
                      name="checkOutDate"
                      placeholder="checkOutDate"
                      value={travelDetails?.checkoutDate || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Hotel Name
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelName"
                      name="hotelName"
                      placeholder="hotelName"
                      value={hotelDetail.hotelName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Hotel Address
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelAddress"
                      name="hotelAddress"
                      placeholder="hotelAddress"
                      value={hotelDetail.hotelAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Hotel PhoneNumber
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="hotelPhoneNumber"
                      name="hotelPhoneNumber"
                      placeholder="hotelPhoneNumber"
                      value={hotelDetail.hotelPhoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Upload Ticket
                    </label>
                    <input
                      type="file"
                      required
                      className="form-control"
                      id="voucher"
                      name="voucher"
                      placeholder="voucher"
                      value={hotelDetail.voucher}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guest House Booking Model */}
      <div
        className="modal fade"
        id="staticBackdropGuestHouse"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Guest House Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row mb-3">
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Travel Request Id
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="travelRequestGenId"
                      name="travelRequestGenId"
                      placeholder="travelRequestGenId"
                      value={travelDetails?.travelGenId || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Accomadation Type
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="accommodationType"
                      name="accommodationType"
                      placeholder="accommodationType"
                      value={travelDetails?.accommodationType || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Travel Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="travelDate"
                      name="travelDate"
                      placeholder="travelDate"
                      value={travelDetails?.travelDate || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Check-in Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkInDate"
                      name="checkInDate"
                      placeholder="checkInDate"
                      value={travelDetails?.checkinDate || ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Check-out Date
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="checkOutDate"
                      name="checkOutDate"
                      placeholder="checkOutDate"
                      value={travelDetails?.checkoutDate || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Guest House
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="guestHouseName"
                      name="guestHouseName"
                      placeholder="guestHouseName"
                      value={travelDetails?.guestHouseName || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-6 col-md-3">
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        openCheckCaleder(travelDetails.guestHouseId)
                      }
                    >
                      Availablity
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleCheckHotelAvailablity}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Available guest House Model */}
      {openCheckAvailabelDates && (
        <div>
          <div className="modal d-flex w-100 h-100 justify-content-center align-items-center">
            <div className="modal-content w-50 p-3">
              <div className="row">
                <div class="container text-center common-title fw-bold col-11">
                  <h2 class="common-heading mb-3">Availablity</h2>
                </div>
                <div className="col-1">
                  <i
                    className="fa-solid fa-xmark mt-3 me-3 close"
                    onClick={closeCheckCalender}
                  ></i>
                </div>
              </div>
              <div className="row h-75 d-flex justify-content-center">
                <div class="container">
                  <div className="text-center mb-3 d-flex justify-content-center">
                    <CustomDatePicker bookedDates={bookedDates} />
                  </div>
                  {/* Legend for the colors */}
                  <div className="calendar-legend d-flex justify-content-center mb-3">
                    <div className="legend-item d-flex align-items-center justify-content-center me-2">
                      <span className="legend-color booked-red me-1"></span>
                      <span>Fully Booked</span>
                    </div>
                    <div className="legend-item d-flex align-items-center justify-content-center me-2">
                      <span className="legend-color booked-amber me-1"></span>
                      <span>Partially Booked</span>
                    </div>
                    <div className="legend-item d-flex align-items-center justify-content-center me-2">
                      <span className="legend-color available-green me-1"></span>
                      <span>Available</span>
                    </div>
                  </div>
                  <div className="text-center mb-3 d-flex justify-content-center">
                    <button
                      class="btn btn-danger me-3"
                      onClick={closeCheckCalender}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accomdation_Request;
