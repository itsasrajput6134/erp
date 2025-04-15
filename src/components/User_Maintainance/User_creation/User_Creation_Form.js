import React, { useEffect, useState } from "react";

const countryStateOfficeData = {
  USA: {
    California: ["Los Angeles", "San Francisco", "San Diego"],
    Texas: ["Houston", "Dallas", "Austin"],
    New_York: ["New York City", "Buffalo", "Rochester"],
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa", "Mississauga"],
    Quebec: ["Montreal", "Quebec City", "Laval"],
    British_Columbia: ["Vancouver", "Victoria", "Surrey"],
  },
  India: {
    Delhi: ["New Delhi", "Delhi"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Hubli"],
    UP:["Noida", "Gurugram"]
  },
};

const User_Creation_Form = ({
  handleRightButtonClickForm,
  pagesData,
  handleToggleRefreshTable,
  showToast,
}) => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [officeLocation, setOfficeLocation] = useState("");
  const [officeLocations, setOfficeLocations] = useState([]);

  useEffect(() => {
    if (country) {
      setStates(Object.keys(countryStateOfficeData[country]));
    } else {
      setStates([]);
    }
    setState("");
    setOfficeLocations([]);
    setOfficeLocation("");
  }, [country]);

  useEffect(() => {
    if (country && state) {
      setOfficeLocations(countryStateOfficeData[country][state]);
    } else {
      setOfficeLocations([]);
    }
    setOfficeLocation("");
  }, [state, country]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    pages: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData, "67890");
  };

  const handleSubmit = async () => {
    try {
      const { pages = [], ...otherData } = formData;
      const loginDetailsString = localStorage.getItem("loginDetails");
      const loginDetails = JSON.parse(loginDetailsString);
      const email = loginDetails.email;

      const updatedPages = pagesData;

      const requestBody = {
        ...otherData,
        pages: updatedPages,
        createdBy: email,
      };

      console.log(JSON.stringify(requestBody));

      const response = await fetch("http://localhost:7000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      showToast("Data Saved Successfully");
      console.log("API Response:", data);

      handleToggleRefreshTable();
    } catch (error) {
      console.error("Error:", error);
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <section class="common-section contact-section text-white" id="contact">
      <div class="container text-center common-title fw-bold">
        <h2 class="common-heading text-white">User Creation</h2>
        <hr class="w-25 mx-auto" />
      </div>

      <div class="container">
        <div class="form-section d-flex justify-content-center w-100">
          <div>
            <div className="container">
              <div class="row mb-3">
                <div class="col-6 col-md-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    class="form-select"
                  >
                    <option value="" selected>Select Country</option>
                    {Object.keys(countryStateOfficeData).map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {states.length > 0 && (
                  <div class="col-6 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                      class="form-select"
                    >
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {officeLocations.length > 0 && (
                  <div class="col-6 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Office Address & Pincode
                    </label>
                    <select
                      id="officeLocation"
                      name="officeLocation"
                      onChange={(e) => setOfficeLocation(e.target.value)}
                      value={officeLocation}
                      class="form-select"
                    >
                      {officeLocations.map((office) => (
                        <option key={office} value={office}>
                          {office}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div class="row mb-3">
                <div class="col-6 col-md-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Employee Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-6 col-md-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Employee Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Employee Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-6 col-md-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Employee Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Employee Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-6 col-md-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Employee Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-md-6">
                  <label for="exampleFormControlInput1" class="form-label">
                    Employee Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter Employee Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label htmlFor="roleDropdown" className="form-label">
                    Employee Role
                  </label>
                  <select
                    id="roleDropdown"
                    name="role"
                    onChange={handleChange}
                    value={formData.role}
                    class="form-select"
                  >
                    <option selected>Choose...</option>
                    <option value="superadmin">SuperAdmin</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="developer">Developer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="text-center mb-3 d-flex justify-content-center">
                <button
                  class="btn btn-primary me-3"
                  onClick={handleSubmit}
                  disabled={pagesData.length === 0}
                >
                  Submit
                </button>
                <button
                  class="btn btn-danger"
                  onClick={handleRightButtonClickForm}
                >
                  Right
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User_Creation_Form;
