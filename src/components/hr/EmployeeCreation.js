import React from "react";

const EmployeeCreation = () => {
  return (
    <>
      <section class="wrapper">
        <section class="common-section contact-section text-white" id="Country">
          <div class="container text-center common-title fw-bold">
            <h2 class="common-heading text-white">Employee Details</h2>
            <hr class="w-25 mx-auto" />
          </div>

          <div class="container">
            <div class="form-section d-flex justify-content-start w-100">
              <div className="container">
                <div class="row mb-3">
                  <div class="col-12 col-md-4">
                    <label htmlFor="exampleFormControlInput1" class="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      placeholder="Hello"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      placeholder="Enter State Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="dob" class="form-label">
                      Date Of Birth
                    </label>

                    <div>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 col-md-6">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Current Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="current_address"
                      name="current_address"
                      placeholder="Enter project Name"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <label for="exampleFormControlInput1" class="form-label">
                      Employee Permanant Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="permanent_address"
                      name="permanent_address"
                      placeholder="Enter project Name"
                    />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Office Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Office State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="personalemail"
                      name="personalemail"
                      placeholder="Enter State Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="dob" class="form-label">
                      Office Location and Pincode
                    </label>
                    <div>
                      <input
                        type="text"
                        id="officialemail"
                        name="officialemail"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Personal Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="personalemail"
                      name="personalemail"
                      placeholder="Enter State Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="dob" class="form-label">
                      Official Email Address
                    </label>

                    <div>
                      <input
                        type="text"
                        id="officialemail"
                        name="officialemail"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Father Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="personalemail"
                      name="personalemail"
                      placeholder="Enter State Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="dob" class="form-label">
                      Parents Mobile Number
                    </label>
                    <div>
                      <input
                        type="text"
                        id="officialemail"
                        name="officialemail"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter mobile Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="exampleFormControlInput1" class="form-label">
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="personalemail"
                      name="personalemail"
                      placeholder="Enter State Name"
                    />
                  </div>
                  <div class="col-12 col-md-4">
                    <label for="dob" class="form-label">
                      Salary
                    </label>
                    <div>
                      <input
                        type="text"
                        id="officialemail"
                        name="officialemail"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mb-3 d-flex justify-content-center">
              <button class="btn btn-primary me-3">Submit</button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default EmployeeCreation;
