import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployeesActiveRdx } from "../../store/actions/employeeActions";
import {
  fetchTravelsRdx,
  addTravelRdx,
  updateTravelRdx,
} from "../../store/actions/travelAction";
import axios from "axios";
import endpoints from "../../ApiEndpoint";
import CustomDatePicker from "./CustomDatePicker";
import toast from "react-hot-toast";

const Travel_Request_Form = () => {
  const dispatch = useDispatch();
  const [guestHouseDetail, setGuestHouseDetail] = useState([]);
  const [bookedDates, setbookedDates] = useState([]);
  const [guestHouseId, setGuestHouseId] = useState();
  const [travelEmployee, settravelEmployee] = useState({
    employeeEmail: localStorage.getItem("username"),
    travelDate: "",
    travelMode: "",
    destCountry: "",
    destCity: "",
    landMark: "",
    checkinDate: "",
    checkoutDate: "",
    travelPurpose: "",
    description: "",
    accommodationType: "",
    guestHouseName: "",
    currentRole: "",
    processType: "Travel_Process",
  });
  const [travelMode, setTravelMode] = useState([]);
  const [accomadationType, setAccomadationType] = useState([]);
  const [openCheckAvailabelDates, setOpenCheckAvailabelDates] = useState(false);
  const { employees, employeesLoading, employeesError } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    dispatch(fetchEmployeesActiveRdx());
  }, [dispatch]);


  useEffect(() => {
    fetchTravelMode();
    fetchAccomdationType();
    fetchGuestHouse();
  }, []);



  const fetchTravelMode = async () => {
    try {
      const response = await axios.get(endpoints.getAllTravelMode, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      setTravelMode(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAccomdationType = async () => {
    try {
      const response = await axios.get(endpoints.getAllAccomdationType, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.data;
      setAccomadationType(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    settravelEmployee((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    if (name === "guestHouseName") {
      const selectedGuestHouse = guestHouseDetail.find(
        (gt) => gt.guesthouseName === value
      );
      const selectedKey = selectedGuestHouse ? selectedGuestHouse.id : null;
      await setGuestHouseId(selectedKey);
      console.log(selectedKey);

      await populateDate(selectedKey);
      await setOpenCheckAvailabelDates(true);
    }

    if (name === "accommodationType") {
      if (value === "HOTEL") {
        settravelEmployee((prevDetails) => ({
          ...prevDetails,
          guestHouseName: "",
        }));
      } else if (value === "GUESTHOUSE") {
        settravelEmployee((prevDetails) => ({
          ...prevDetails,
          guestHouseName: "",
          destCountry: "",
          destCity: "",
          landMark: "",
        }));
      }
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    settravelEmployee({
      employeeEmail: localStorage.getItem("username"),
      travelDate: "",
      travelMode: "",
      destCountry: "",
      destCity: "",
      landMark: "",
      checkinDate: "",
      checkoutDate: "",
      travelPurpose: "",
      description: "",
      accommodationType: "",
      currentRole: "",
      processType: "Travel_Process",
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (travelEmployee.accommodationType === "GUESTHOUSE") {
      if (
        !isBookingAvailable(
          bookedDates,
          new Date(travelEmployee.checkinDate),
          new Date(travelEmployee.checkoutDate)
        )
      ) {
        toast.error("Room Not Available on selected checkin checkout date");
        return;
      }
    }
    console.log(travelEmployee);
    dispatch(addTravelRdx(travelEmployee));
    settravelEmployee({
      employeeEmail: localStorage.getItem("username"),
      travelDate: "",
      travelMode: "",
      destCountry: "",
      destCity: "",
      landMark: "",
      checkinDate: "",
      checkoutDate: "",
      travelPurpose: "",
      description: "",
      accommodationType: "",
      currentRole: "",
      processType: "Travel_Process",
    });
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
      await setbookedDates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeCheckCalender = () => {
    setOpenCheckAvailabelDates(false);
  };

  const isBookingAvailable = (apiData, checkin, checkout) => {
    let bookingAvailable = true;

    for (let i = 0; i < apiData.length; i++) {
      const apiDate = new Date(apiData[i].date);
      const roomNumber = apiData[i].roomNumber;
      const totalRooms = apiData[i].totalRooms;

      if (apiDate >= checkin && apiDate <= checkout) {
        if (roomNumber >= totalRooms) {
          bookingAvailable = false;
          break;
        }
      }
    }

    return bookingAvailable;
  };

  return (
    <div>
      <section class="wrapper">
        <section>
          <div class="container text-center common-title fw-bold">
            <h2 class="common-heading text-white">
              Travel & Accomadation Request
            </h2>
            <hr class="w-50 mx-auto text-white" />
          </div>

          <div class="container">
            <div class="form-section d-flex justify-content-start w-100 text-white">
              <div className="container">
                <div class="row mb-3">
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
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
                      value={travelEmployee.travelDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Mode of Travel
                    </label>
                    <select
                      id="travelMode"
                      name="travelMode"
                      class="form-select"
                      value={travelEmployee.travelMode}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Select Mode
                      </option>
                      {travelMode.length > 0 &&
                        travelMode.map((trvl) => (
                          <option key={trvl.modeId} value={trvl.mode}>
                            {trvl.mode}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Employee Official Email
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="firstName"
                      value={travelEmployee.employeeEmail}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Extimated Check-in Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="checkinDate"
                      name="checkinDate"
                      placeholder="checkinDate"
                      min={new Date().toISOString().split("T")[0]}
                      value={travelEmployee.checkinDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Estimated Check-out Date
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      id="checkoutDate"
                      name="checkoutDate"
                      placeholder="checkoutDate"
                      min={new Date().toISOString().split("T")[0]}
                      value={travelEmployee.checkoutDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label required"
                    >
                      Current Role
                    </label>
                    <select
                      id="currentRole"
                      name="currentRole"
                      className="form-select"
                      value={travelEmployee.currentRole}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {localStorage
                        .getItem("roles")
                        ?.split(",")
                        .map((role, index) => (
                          <option key={index} value={role.trim()}>
                            {role.trim()}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Accomdation Type
                    </label>
                    <select
                      id="travelMode"
                      name="accommodationType"
                      class="form-select"
                      value={travelEmployee.accommodationType}
                      onChange={handleChange}
                    >
                      <option value="" disabled selected>
                        Select Type
                      </option>
                      {accomadationType.length > 0 &&
                        accomadationType.map((trvl) => (
                          <option key={trvl.id} value={trvl.type}>
                            {trvl.type}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Guest House
                    </label>
                    <select
                      id="travelMode"
                      name="guestHouseName"
                      class="form-select"
                      value={travelEmployee.guestHouseName}
                      onChange={handleChange}
                      disabled={
                        travelEmployee.accommodationType === "GUESTHOUSE"
                          ? false
                          : true
                      }
                    >
                      <option value="" disabled selected>
                        Select Guest House
                      </option>
                      {guestHouseDetail.length > 0 &&
                        guestHouseDetail.map((gt) => (
                          <option key={gt.id} value={gt.guesthouseName}>
                            {gt.guesthouseName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Destination Country
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="destCountry"
                      name="destCountry"
                      placeholder="destCountry"
                      value={travelEmployee.destCountry}
                      onChange={handleChange}
                      readOnly={
                        travelEmployee.accommodationType === "HOTEL"
                          ? false
                          : true
                      }
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Destination City
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="destCity"
                      name="destCity"
                      placeholder="destCity"
                      value={travelEmployee.destCity}
                      onChange={handleChange}
                      readOnly={
                        travelEmployee.accommodationType === "HOTEL"
                          ? false
                          : true
                      }
                    />
                  </div>
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Landmark
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="landMark"
                      name="landMark"
                      placeholder="landMark"
                      value={travelEmployee.landMark}
                      onChange={handleChange}
                      readOnly={
                        travelEmployee.accommodationType === "HOTEL"
                          ? false
                          : true
                      }
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div class="col-6 col-md-4">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Purpose Of Travel
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="travelPurpose"
                      name="travelPurpose"
                      placeholder="travelPurpose"
                      value={travelEmployee.travelPurpose}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-12">
                    <label
                      htmlFor="exampleFormControlInput1"
                      class="form-label required"
                    >
                      Description
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="description"
                      value={travelEmployee.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mb-3 d-flex justify-content-center">
              <button className="btn btn-danger me-3" onClick={handleReset}>
                Reset
              </button>
              <button className="btn btn-primary me-3" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </section>
      </section>
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

export default Travel_Request_Form;
