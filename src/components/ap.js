<div>                                        
<section
  id="container"
  className={`${isSidebarOpen ? "open-right-bar" : ""}`}
>
<header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
 <div className="container mx-auto px-4 flex items-center justify-between h-16">
{/* Left Section: Sidebar Toggle Button */}
 <div className="flex items-center">
<button
  onClick={toggleSidebar}
  className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
  aria-label="Toggle Sidebar"
>
  <i className="fas fa-bars text-xl"></i>
</button>
 </div>

{/* Center Section: Logo */}
<div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
<Link to="/" className="flex items-center">
  <img
    src={`${process.env.PUBLIC_URL}/images/logoexatoai.png`}
    alt="Exato"
    className="h-10"
  />
</Link>
</div>

{/* Right Section: User Avatar and Dropdown */}
<div className="flex items-center relative">
{/* Avatar Button */}
<button
  onClick={toggleDropdown}
  className="flex items-center gap-2 focus:outline-none"
  aria-label="User Menu"
>
 <User className="w-10 h-10 rounded-full border-4 border-gradient-to-r from-purple-400 to-pink-500 shadow-lg text-gray-700" />
</button>

{/* Dropdown Menu */}
{isDropdownOpen && (
  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
    {/* Profile Link */}
    <Link
      to="/login/navbar/profile"
      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-200"
    >
      <i className="fas fa-user-circle text-base text-blue-500 mr-2"></i>
      <span className="flex-1">Profile</span>
      <i className="fas fa-chevron-right text-xs text-gray-400"></i>
    </Link>

    {/* Divider */}
    <hr className="my-1 border-gray-100" />

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gradient-to-r from-red-50 to-pink-50 transition-all duration-200"
    >
      <i className="fas fa-sign-out-alt text-base text-red-500 mr-2"></i>
      <span className="flex-1">Logout</span>
      <i className="fas fa-chevron-right text-xs text-gray-400"></i>
    </button>
  </div>
)}
</div>
 </div>
</header>

  <aside>
    <div
      id="sidebar"
      className={`nav-collapse ${isSidebarOpen ? "" : "hide-left-bar"}`}
    >
      <div className="leftside-navigation">
        <ul className="sidebar-menu" id="nav-accordion">
          {(permissions.includes("Admin_Pages") ||
            permissions.includes("update_employee")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(2)}>
                <a
                  href=""
                  className={
                    isSubMenuOpen[2] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-tasks"></i>
                  <span>Admin Pages</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[2] ? "block" : "none" }}
                >
                  {/* {permissions.includes("update_employee") && (
                  <li>
                    <Link to="admin/updateEmplyee">Update Employee</Link>
                  </li>
                )} */}
                  {true && (
                    <li>
                      <Link to="admin/ticketHistory">Ticket History</Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

          {(permissions.includes("Erp_Configuration") ||
            permissions.includes("country") ||
            permissions.includes("state") ||
            permissions.includes("office") ||
            permissions.includes("department") ||
            permissions.includes("project") ||
            permissions.includes("technology") ||
            permissions.includes("reimbursement_type") ||
            permissions.includes("role_create") ||
            permissions.includes("asset_create") ||
            permissions.includes("organization_hierarchy") ||
            permissions.includes("client_create")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(3)}>
                <a
                  className={
                    isSubMenuOpen[3] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-wrench"></i>
                  <span>ERP Configurations </span>
                  {/* <span>Configurations </span> */}

                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[3] ? "block" : "none" }}
                >
                  {permissions.includes("country") && (
                    <li>
                      <Link to="configuration/country">Country</Link>
                    </li>
                  )}
                  {permissions.includes("state") && (
                    <li>
                      <Link to="configuration/state">State</Link>
                    </li>
                  )}
                  {permissions.includes("office") && (
                    <li>
                      <Link to="configuration/office">Office</Link>
                    </li>
                  )}
                  {permissions.includes("department") && (
                    <li>
                      <Link to="configuration/departments">
                        Departments
                      </Link>
                    </li>
                  )}
                  {permissions.includes("project") && (
                    <li>
                      <Link to="configuration/project_details">
                        Project
                      </Link>
                    </li>
                  )}
                  {permissions.includes("technology") && (
                    <li>
                      <Link to="configuration/tech_name">
                        Technology Name
                      </Link>
                    </li>
                  )}
                  {permissions.includes("reimbursement_type") && (
                    <li>
                      <Link to="configuration/reimb_type">
                        Reimbursement Type
                      </Link>
                    </li>
                  )}
                  {permissions.includes("role_create") && (
                    <li>
                      <Link to="configuration/roleCreate">Role Create</Link>
                    </li>
                  )}
                  {permissions.includes("asset_create") && (
                    <li>
                      <Link to="configuration/assetsCreate">
                        Assets Create
                      </Link>
                    </li>
                  )}
                  {permissions.includes("organization_hierarchy") && (
                    <li>
                      <Link to="configuration/organization_hierarchy">
                        Hierarchy
                      </Link>
                    </li>
                  )}
                  {permissions.includes("client_create") && (
                    <li>
                      <Link to="configuration/client_create">
                        Client Create
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

          {(permissions.includes("Hr_Pages") ||
            permissions.includes("employee_onboarding") ||
            permissions.includes("employee_offboarding") ||
            permissions.includes("employee_creation")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(4)}>
                <a
                  href=""
                  className={
                    isSubMenuOpen[4] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-wrench"></i>
                  <span>HR</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[4] ? "block" : "none" }}
                >
                  {permissions.includes("employee_onboarding") && (
                    <li>
                      <Link to="hr/emp_onboard">Employee Onboarding</Link>
                    </li>
                  )}
                  {permissions.includes("employee_offboarding") && (
                    <li>
                      <Link to="hr/emp_offboard">Employee Offboarding</Link>
                    </li>
                  )}
                  {permissions.includes("employee_creation") && (
                    <li>
                      <Link to="hr/emp_creation">Employee Creation</Link>
                    </li>
                  )}
                  <li>
                    <Link to="hr/holiday">Holiday</Link>
                  </li>
                </ul>
              </li>
            )}

          {(permissions.includes("Super_Admin") ||
            permissions.includes("create_page") ||
            permissions.includes("give_right") ||
            permissions.includes("employeecreation")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(5)}>
                <a
                  className={
                    isSubMenuOpen[5] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-wrench"></i>
                  <span>Super Admin</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[5] ? "block" : "none" }}
                >
                  {permissions.includes("create_page") && (
                    <li>
                      <Link to="superAdmin/createPage">Create Page</Link>
                    </li>
                  )}
                  {permissions.includes("give_right") && (
                    <li>
                      <Link to="superAdmin/giveRight">Give Right</Link>
                    </li>
                  )}
                  {permissions.includes("employeecreation") && (
                    <li>
                      <Link to="superAdmin/employeeCreation">
                        Employee Creation
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="superAdmin/addApprover">Add Approver</Link>
                  </li>
                  <li>
                    <Link to="superAdmin/setApprover">Approver Process</Link>
                  </li>
                  <li><Link to="superAdmin/processCreate">
                    Process Create
                  </Link></li>
                </ul>
              </li>
            )}

          {/* {(permissions.includes("Developer") ||
            permissions.includes("developer_demo1") ||
            permissions.includes("developer_demo2") ||
            permissions.includes("developer_demo3")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(6)}>
                <a
                  className={
                    isSubMenuOpen[6] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-wrench"></i>
                  <span>Developer</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[6] ? "block" : "none" }}
                >
                  {permissions.includes("developer_demo1") && (
                    <li>
                      <Link to="developer/developer_demo1">
                        Developer Demo1
                      </Link>
                    </li>
                  )}
                  {permissions.includes("developer_demo2") && (
                    <li>
                      <Link to="developer/developer_demo2">
                        Developer Demo2
                      </Link>
                    </li>
                  )}
                  {permissions.includes("developer_demo3") && (
                    <li>
                      <Link to="developer/developer_demo3">
                        Developer Demo3
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )} */}

          {/* {(permissions.includes("User") ||
            permissions.includes("user_demo1") ||
            permissions.includes("user_demo2") ||
            permissions.includes("user_demo3")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(7)}>
                <a
                  className={
                    isSubMenuOpen[7] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-wrench"></i>
                  <span>User</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[7] ? "block" : "none" }}
                >
                  {permissions.includes("user_demo1") && (
                    <li>
                      <Link to="user/user_demo1">User Demo1</Link>
                    </li>
                  )}
                  {permissions.includes("user_demo2") && (
                    <li>
                      <Link to="user/user_demo2">User Demo2</Link>
                    </li>
                  )}
                  {permissions.includes("user_demo3") && (
                    <li>
                      <Link to="user/user_demo3">User Demo3</Link>
                    </li>
                  )}
                </ul>
              </li>
            )} */}

          {(permissions.includes("Claim_And_Accommodation") ||
            permissions.includes("travel_request_form") ||
            permissions.includes("travel_request_history") ||
            permissions.includes("travel_request_approver") ||
            permissions.includes("travel_approved_request") ||
            permissions.includes("expence_claim_request_form") ||
            permissions.includes("expence_claim_request_history") ||
            permissions.includes("expence_claim_request_approver") ||
            permissions.includes("expence_claim_approved_request")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(8)}>
                <a
                  className={
                    isSubMenuOpen[8] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-tasks"></i>
                  <span>Claims And Accommodations</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[8] ? "block" : "none" }}
                >
                  {permissions.includes("travel_request_form") && (
                    <li>
                      <Link to="travel/travel_request">
                        Travel Request Form
                      </Link>
                    </li>
                  )}
                  {permissions.includes("travel_request_history") && (
                    <li>
                      <Link to="travel/travel_history">
                        Travel Request History
                      </Link>
                    </li>
                  )}
                  {permissions.includes("travel_request_approver") && (
                    <li>
                      <Link to="travel/travel_approver">
                        Travel Request Approver
                      </Link>
                    </li>
                  )}
                  {/* {permissions.includes("travel_approved_request") && (
                    <li>
                      <Link to="travel/accomdation_request">
                        Travel Approved Request
                      </Link>
                    </li>
                  )} */}
                  {permissions.includes("expence_claim_request_form") && (
                    <li>
                      <Link to="travel/expence_claim">
                        Expence Claim Request Form
                      </Link>
                    </li>
                  )}
                  {permissions.includes(
                    "expence_claim_request_history"
                  ) && (
                      <li>
                        <Link to="travel/expence_claim_history">
                          Expence Claim Request History
                        </Link>
                      </li>
                    )}
                  {permissions.includes(
                    "expence_claim_request_approver"
                  ) && (
                      <li>
                        <Link to="travel/expence_claim_approver">
                          Expence Claim Request Approver
                        </Link>
                      </li>
                    )}
                  {/* {permissions.includes(
                    "expence_claim_approved_request"
                  ) && (
                      <li>
                        <Link to="travel/expence_claim_approved_request">
                          Expence Claim Approved Request
                        </Link>
                      </li>
                    )} */}
                </ul>
              </li>
            )}

          {(permissions.includes("Attendance_And_Leave") ||
            permissions.includes("emp_attendance") ||
            permissions.includes("emp_attendance_history") ||
            permissions.includes("emp_leave") ||
            permissions.includes("emp_leave_history") ||
            permissions.includes("emp_leave_approver")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(9)}>
                <a
                  className={
                    isSubMenuOpen[9] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-tasks"></i>
                  <span>Attendance and Leave</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[9] ? "block" : "none" }}
                >
                  {permissions.includes("emp_attendance") && (
                    <li>
                      <Link to="/login/navbar/attendance/markAttendance">
                        Mark Attendance
                      </Link>
                    </li>
                  )}
                  {permissions.includes("emp_attendance_history") && (
                    <li>
                      <Link to="/login/navbar/attendance/attendanceHistory">
                        Attendance History
                      </Link>
                    </li>
                  )}
                  {permissions.includes("emp_leave") && (
                    <li>
                      <Link to="/login/navbar/attendance/leave">
                        Apply Leave
                      </Link>
                    </li>
                  )}
                  {permissions.includes("emp_leave_history") && (
                    <li>
                      <Link to="/login/navbar/attendance/leaveHistory">
                        Leave History
                      </Link>
                    </li>
                  )}
                  {permissions.includes("emp_leave_approver") && (
                    <li>
                      <Link to="/login/navbar/attendance/leaveApprover">
                        Leave Approver
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

          {(permissions.includes("Reports") ||
            permissions.includes("Attendance_Report") ||
            permissions.includes("Expence_Report") ||
            permissions.includes("Leave_Report") ||
            permissions.includes("Ticket_Booking_Report") ||
            permissions.includes("Travel_Report") ||
            permissions.includes("User_Report")) && (
              <li className="sub-menu" onClick={() => toggleSubMenu(10)}>
                <a
                  className={
                    isSubMenuOpen[10] ? "dcjq-parent active" : "dcjq-parent"
                  }
                >
                  <i className="fa fa-wrench"></i>
                  <span>Reports</span>
                  <span className="dcjq-icon"></span>
                </a>
                <ul
                  className="sub"
                  style={{ display: isSubMenuOpen[10] ? "block" : "none" }}
                >
                  {permissions.includes("Travel_Report") && (
                    <li>
                      <Link to="reports/travel_report">Travel Report</Link>
                    </li>
                  )}
                  {permissions.includes("Expence_Report") && (
                    <li>
                      <Link to="reports/expence_report">
                        Expence Report
                      </Link>
                    </li>
                  )}
                  {permissions.includes("Ticket_Booking_Report") && (
                    <li>
                      <Link to="reports/ticket_report">Ticket Report</Link>
                    </li>
                  )}
                  {permissions.includes("User_Report") && (
                    <li>
                      <Link to="reports/user_report">User Report</Link>
                    </li>
                  )}
                  {permissions.includes("Leave_Report") && (
                    <li>
                      <Link to="reports/leave_report">Leave Report</Link>
                    </li>
                  )}
                  {permissions.includes("Attendance_Report") && (
                    <li>
                      <Link to="reports/attendance_report">
                        Attendance Report
                      </Link>
                    </li>
                  )}
                  <li>
                      <Link to="reports/login_logout">
                        Login/Logout Report
                      </Link>
                    </li>
                </ul>
              </li>
            )}

          <li>
            <a
              className="active"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-key"></i>
              <span>Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
  <section
    id="main-content"
    className={isSidebarOpen ? "" : "merge-left"}
  >
    <Outlet />
    <div class="footer">
      <div class="wthree-copyright">
        <p>© 2024 Exato Technologies. All rights reserved.</p>
      </div>
    </div>
  </section>
</section>
<Toaster />
</div>