import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import endpoints from "../ApiEndpoint";
import { Menu, User } from "lucide-react";

const TabnavBar = () => {
  const navigate = useNavigate();
  const [displayLinkAdminpage, setDisplayLinkAdminpage] = useState(true);
  const [displayLinkPageCreation, setDisplayLinkPageCreation] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const [pages, setPages] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const permittedPages = localStorage.getItem("permissions");
    if (permittedPages.length > 0) {
      setPermissions(permittedPages);
    } else {
      setPermissions([]);
    } 

    const loginDetailsString = localStorage.getItem("loginDetails");
    
    if (loginDetailsString) {
      const details = JSON.parse(loginDetailsString);
      const pagesFromLocalStorage = details.pages || [];
      const rolesFromLocalStorage = details.role || [];
      setPages(pagesFromLocalStorage);
      if (
        !(
          rolesFromLocalStorage === "admin" ||
          rolesFromLocalStorage === "superadmin"
        )
      ) {
        setDisplayLinkAdminpage(false);
      }
      if (rolesFromLocalStorage === "superadmin") {
        setDisplayLinkPageCreation(true);
      }

      setLoginDetails(details);
    }
  }, []);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSubMenu = (index) => {
    setIsSubMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleLogout = () => {
  //   // Remove login details from local storage
  //   localStorage.removeItem("roles");
  //   localStorage.removeItem("username");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("permissions");
  //   toast.success("Logout Successfully!");
  //   // Redirect to login page or perform any other action
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 400);
  // };
  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };


  const handleLogout = async () => {
    const logoutTimestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const headers = {
      "Content-Type": "application/json",
      "X-Logout-Timestamp": logoutTimestamp,
      Authorization: `${localStorage.getItem("token")}`,
    };
    console.log("Headers:", headers);
    try {
      const response = await axios.post(endpoints.logoutAuth, {}, { headers, withCredentials: true });

      if (response.status === 200) {
        // Remove login details from local storage
        localStorage.removeItem("roles");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("permissions");
  
        toast.success("Logout Successfully!");
  
        // Redirect to login page or perform any other action
        setTimeout(() => {
          navigate("/login");
        }, 400);
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!");
    }                                            
  }                                              
  
  return (                                       
    <div>  
                                         
      <section
        id="container"
        className={`${isSidebarOpen ? "open-right-bar" : ""}`}
      >
        
     <header className="fixed top-2 left-10 right-10 w-auto rounded-lg bg-gradient-to-r from-blue-50 to-blue-500 shadow-md z-50">
     <div className="container mx-auto px-4 flex items-center justify-between h-16">
    {/* Left Section: Sidebar Toggle Button */}
    <div className="flex items-center">
      <button
        onClick={toggleSidebar}
        className="flex items-center gap-2 px-2 py-2 bg-white border border-gray-900 rounded-lg shadow-xl "
        aria-label="Toggle Sidebar"
      >
        <div className="relative">
      <Menu className="w-5 h-5 rounded-full border-2 border-white bg-white text-gray-700 relative" />
      </div>
      </button>
    </div>

    {/* Center Section: Logo */}
    <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
      <Link to="/login/navbar/profile" className="flex items-center">
        <img
          src={`${process.env.PUBLIC_URL}/images/logoexatoai.png`}
          alt="Exato"
          className="h-10"
        />
      </Link>
    </div>

    {/* Right Section: User Avatar and Dropdown */}
    <div className="flex items-center relative"
    onMouseEnter={()=>setIsDropdownOpen(true)}
    onMouseLeave={()=>setIsDropdownOpen(false)}
    >
      {/* Avatar Button */}
        <div
          
          className="flex items-center gap-2 px-2 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          aria-label="User Menu"
          aria-expanded={isDropdownOpen}
        >
      {/* Gradient Border for Avatar */}
      <div className="relative">
      <User className="w-5 h-5 rounded-full border-2 border-white bg-white text-gray-700 relative" />
      </div>
        </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute py-2 right-0 top-full">
        <div className=" w-36 bg-white rounded-lg shadow-xl border-2 border-gray-900 py-1 z-50">
          {/* Profile Link */}
          <Link
            to="/login/navbar/profile"
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gradient-to-r from-blue-50 to-purple-50 transition-all duration-200"
          >
            <i className="fas fa-user-circle text-base text-blue-500 mr-2"></i>
            <span className="flex-1">Profile</span>
          </Link>

          {/* Divider */}
          <hr className="my-1 border-black-100" />

          {/* Logout Button */}
          <a
           href="/login" // Replace with your logout URL or action
           onClick={handleLogout} // Handle logout functionality
           className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gradient-to-r from-red-50 to-pink-50 transition-all duration-200"
          >
          <i className="fas fa-sign-out-alt text-base text-red-500 mr-2"></i>
          <span className="flex-1">Logout</span>
          </a>
          </div>
          </div>
          
         )}
       </div>
     </div>
     </header>
     
     
      
       <aside>         
        <div
        id="sidebar"
         className={`nav-collapse ${isSidebarOpen ? "" : "hide-left-bar"} bg-gradient-to-b from-indigo-600 to-purple-600 text-white h-screen fixed w-64 transition-all duration-300 ease-in-out `}
        >
       <div className="leftside-navigation">
       
        <ul className="sidebar-menu text-lg px-3  pt-2 list-none" id="nav-accordion">
        <div className="sticky top-0 left-0 w-[280px] h-[72px] bg-[#18181b] z-50"></div>
        {(permissions.includes("Admin_Pages") ||
          permissions.includes("update_employee")) && (
          <li className="sub-menu" onClick={() => toggleSubMenu(2)}>
            <a
              className={`flex items-center p-2 rounded-lg  transition-all duration-200 ${
                isSubMenuOpen[2] ? "bg-[#b085d9]" : ""
              }`}
            >
              <i className="fa fa-tasks mr-3 text-yellow-400"></i>
              <span>Admin Pages</span>
              <i
                className={`fas fa-chevron-down  ml-auto  transition-transform duration-200 ${
                  isSubMenuOpen[2] ? "rotate-180" : ""
                } text-white`}
              ></i>
            </a>
            <ul
              className="sub pl-6 mt-2"
              style={{ display: isSubMenuOpen[2] ? "block" : "none" }}
            >
              {true && (
                <li>
                  <Link
                    to="admin/ticketHistory"
                    className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
                  >
                    <i className="fas fa-history mr-3 text-green-400"></i>
                    <span>Ticket History</span>
                  </Link>
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
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[3] ? "bg-[#b085d9]" : ""
      }`}
      >
      <i className="fa fa-wrench mr-3 text-yellow-400"></i>
      <span>ERP Configuration</span>
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[3] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[3] ? "block" : "none" }}
    >
      {permissions.includes("country") && (
        <li>
          <Link
            to="configuration/country"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-globe mr-3 text-blue-400"></i>
            <span>Country</span>
          </Link>
        </li>
      )}
      {permissions.includes("state") && (
        <li>
          <Link
            to="configuration/state"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-map-marker-alt mr-3 text-green-400"></i>
            <span>State</span>
          </Link>
        </li>
      )}
      {permissions.includes("office") && (
        <li>
          <Link
            to="configuration/office"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-building mr-3 text-indigo-400"></i>
            <span>Office</span>
          </Link>
        </li>
      )}
      {permissions.includes("department") && (
        <li>
          <Link
            to="configuration/departments"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-users-cog mr-3 text-pink-400"></i>
            <span>Departments</span>
          </Link>
        </li>
      )}
      {permissions.includes("project") && (
        <li>
          <Link
            to="configuration/project_details"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-project-diagram mr-3 text-teal-400"></i>
            <span>Project</span>
          </Link>
        </li>
      )}
      {permissions.includes("technology") && (
        <li>
          <Link
            to="configuration/tech_name"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-microchip mr-3 text-orange-400"></i>
            <span>Technology Name</span>
          </Link>
        </li>
      )}
      {permissions.includes("reimbursement_type") && (
        <li>
          <Link
            to="configuration/reimb_type"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-money-bill-wave mr-3 text-red-400"></i>
            <span>Reimbursement Type</span>
          </Link>
        </li>
      )}
      {permissions.includes("role_create") && (
        <li>
          <Link
            to="configuration/roleCreate"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-tag mr-3 text-purple-400"></i>
            <span>Role Create</span>
          </Link>
        </li>
      )}
      {permissions.includes("asset_create") && (
        <li>
          <Link
            to="configuration/assetsCreate"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-toolbox mr-3 text-yellow-400"></i>
            <span>Assets Create</span>
          </Link>
        </li>
      )}
      {permissions.includes("organization_hierarchy") && (
        <li>
          <Link
            to="configuration/organization_hierarchy"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-sitemap mr-3 text-green-400"></i>
            <span>Hierarchy</span>
          </Link>
        </li>
      )}
      {permissions.includes("client_create") && (
        <li>
          <Link
            to="configuration/client_create"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-plus mr-3 text-blue-400"></i>
            <span>Client Create</span>
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
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[4] ? "bg-[#b085d9]" : ""
      }`}
    >
      <i className="fa fa-users mr-3 text-teal-400"></i>
      <span>HR</span>
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[4] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[4] ? "block" : "none" }}
    >
      {permissions.includes("employee_onboarding") && (
        <li>
          <Link
            to="hr/emp_onboard"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-plus mr-3 text-green-400"></i>
            <span>Employee Onboarding</span>
          </Link>
        </li>
      )}
      {permissions.includes("employee_offboarding") && (
        <li>
          <Link
            to="hr/emp_offboard"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-minus mr-3 text-red-400"></i>
            <span>Employee Offboarding</span>
          </Link>
        </li>
      )}
      {permissions.includes("employee_creation") && (
        <li>
          <Link
            to="hr/emp_creation"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-edit mr-3 text-blue-400"></i>
            <span>Employee Creation</span>
          </Link>
        </li>
      )}
      <li>
        <Link
          to="hr/holiday"
          className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
        >
          <i className="fas fa-umbrella-beach mr-3 text-yellow-400"></i>
          <span>Holiday</span>
        </Link>
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
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[5] ? "bg-[#b085d9]" : ""
      }`}
    >
      <i className="fa fa-user-shield mr-3 text-indigo-400"></i>
      <span>Super Admin</span>
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[5] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[5] ? "block" : "none" }}
    >
      {permissions.includes("create_page") && (
        <li>
          <Link
            to="superAdmin/createPage"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-file-alt mr-3 text-blue-400"></i>
            <span>Create Page</span>
          </Link>
        </li>
      )}
      {permissions.includes("give_right") && (
        <li>
          <Link
            to="superAdmin/giveRight"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-handshake mr-3 text-green-400"></i>
            <span>Give Right</span>
          </Link>
        </li>
      )}
      {permissions.includes("employeecreation") && (
        <li>
          <Link
            to="superAdmin/employeeCreation"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-plus mr-3 text-yellow-400"></i>
            <span>Employee Creation</span>
          </Link>
        </li>
      )}
      <li>
        <Link
          to="superAdmin/addApprover"
          className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
        >
          <i className="fas fa-user-check mr-3 text-pink-400"></i>
          <span>Add Approver</span>
        </Link>
      </li>
      <li>
        <Link
          to="superAdmin/setApprover"
          className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
        >
          <i className="fas fa-cogs mr-3 text-teal-400"></i>
          <span>Approver Process</span>
        </Link>
      </li>
      <li>
        <Link
          to="superAdmin/processCreate"
          className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
        >
          <i className="fas fa-project-diagram mr-3 text-orange-400"></i>
          <span>Process Create</span>
        </Link>
      </li>
    </ul>
    </li>
    )}

    {/* {(permissions.includes("Developer") ||
    permissions.includes("developer_demo1") ||
    permissions.includes("developer_demo2") ||
    permissions.includes("developer_demo3")) && (
    <li className="sub-menu" onClick={() => toggleSubMenu(6)}>
    <a
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[6] ? "bg-[#b085d9]" : ""
      }`}
    >
      <i className="fa fa-code mr-3 text-teal-400"></i>
      <span>Developer</span>
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[6] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[6] ? "block" : "none" }}
    >
      {permissions.includes("developer_demo1") && (
        <li>
          <Link
            to="developer/developer_demo1"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-laptop-code mr-3 text-blue-400"></i>
            <span>Developer Demo1</span>
          </Link>
        </li>
      )}
      {permissions.includes("developer_demo2") && (
        <li>
          <Link
            to="developer/developer_demo2"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-code-branch mr-3 text-green-400"></i>
            <span>Developer Demo2</span>
          </Link>
        </li>
      )}
      {permissions.includes("developer_demo3") && (
        <li>
          <Link
            to="developer/developer_demo3"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-terminal mr-3 text-yellow-400"></i>
            <span>Developer Demo3</span>
          </Link>
        </li>
      )}
    </ul>
    </li>
    )} */}

     {(permissions.includes("User") ||
     permissions.includes("user_demo1") ||
     permissions.includes("user_demo2") ||
     permissions.includes("user_demo3")) && (
    <li className="sub-menu" onClick={() => toggleSubMenu(7)}>
    <a
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[7] ? "bg-[#b085d9]" : ""
      }`}
    >
      <i className="fa fa-user mr-3 text-pink-400"></i>
      <span>User</span>
      {/* Chevron icon moved to the right using ml-auto */}
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[7] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[7] ? "block" : "none" }}
    >
      {permissions.includes("user_demo1") && (
        <li>
          <Link
            to="user/user_demo1"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-circle mr-3 text-blue-400"></i>
            <span>Employee Office Asset</span>
          </Link>
        </li>
      )}
      {permissions.includes("user_demo2") && (
        <li>
          <Link
            to="user/user_demo2"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-friends mr-3 text-green-400"></i>
            <span>User Demo2</span>
          </Link>
        </li>
      )}
      {permissions.includes("user_demo3") && (
        <li>
          <Link
            to="user/user_demo3"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-tie mr-3 text-yellow-400"></i>
            <span>User Demo3</span>
          </Link>
        </li>
      )}
    </ul>
    </li>
    )}

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
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[8] ? "bg-[#b085d9]" : ""
      }`}
    >
      <i className="fa fa-tasks mr-3 text-white"></i>
      <span>Accommodations</span>
      {/* Chevron icon moved to the right using ml-auto */}
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[8] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[8] ? "block" : "none" }}
    >
      {permissions.includes("travel_request_form") && (
        <li>
          <Link
            to="travel/travel_request"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-plane-departure mr-3 text-blue-400"></i>
            <span>Travel Request Form</span>
          </Link>
        </li>
      )}
      {permissions.includes("travel_request_history") && (
        <li>
          <Link
            to="travel/travel_history"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-history mr-3 text-green-400"></i>
            <span>Travel Request History</span>
          </Link>
        </li>
      )}
      {permissions.includes("travel_request_approver") && (
        <li>
          <Link
            to="travel/travel_approver"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-check mr-3 text-yellow-400"></i>
            <span>Travel Request Approver</span>
          </Link>
        </li>
      )}
      {permissions.includes("expence_claim_request_form") && (
        <li>
          <Link
            to="travel/expence_claim"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-file-invoice-dollar mr-3 text-pink-400"></i>
            <span>Expense Claim Request Form</span>
          </Link>
        </li>
      )}
      {permissions.includes("expence_claim_request_history") && (
        <li>
          <Link
            to="travel/expence_claim_history"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-clock mr-3 text-indigo-400"></i>
            <span>Expense Claim Request History</span>
          </Link>
        </li>
      )}
      {permissions.includes("expence_claim_request_approver") && (
        <li>
          <Link
            to="travel/expence_claim_approver"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-shield mr-3 text-red-400"></i>
            <span>Expense Claim Request Approver</span>
          </Link>
        </li>
      )}
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
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[9] ? "bg-[#b085d9]" : ""
      }`}
    >
      <i className="fa fa-calendar-alt mr-3 text-white"></i>
      <span>Attendance and Leave</span>
      {/* Chevron icon moved to the right using ml-auto */}
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[9] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[9] ? "block" : "none" }}
    >
      {permissions.includes("emp_attendance") && (
        <li>
          <Link
            to="/login/navbar/attendance/markAttendance"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-check-circle mr-3 text-blue-400"></i>
            <span>Mark Attendance</span>
          </Link>
        </li>
      )}
      {permissions.includes("emp_attendance_history") && (
        <li>
          <Link
            to="/login/navbar/attendance/attendanceHistory"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-history mr-3 text-green-400"></i>
            <span>Attendance History</span>
          </Link>
        </li>
      )}
      {permissions.includes("emp_leave") && (
        <li>
          <Link
            to="/login/navbar/attendance/leave"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-calendar-plus mr-3 text-yellow-400"></i>
            <span>Apply Leave</span>
          </Link>
        </li>
      )}
      {permissions.includes("emp_leave_history") && (
        <li>
          <Link
            to="/login/navbar/attendance/leaveHistory"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-clock mr-3 text-pink-400"></i>
            <span>Leave History</span>
          </Link>
        </li>
      )}
      {permissions.includes("emp_leave_approver") && (
        <li>
          <Link
            to="/login/navbar/attendance/leaveApprover"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-check mr-3 text-indigo-400"></i>
            <span>Leave Approver</span>
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
      
      className={`flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 ${
        isSubMenuOpen[10] ? "bg-[#b085d9]" : ""
      }`}
    >
      <i className="fa fa-chart-bar mr-3 text-teal-400"></i>
      <span>Reports</span>
      {/* Chevron icon moved to the right using ml-auto */}
      <i
        className={`fas fa-chevron-down ml-auto transition-transform duration-200 ${
          isSubMenuOpen[10] ? "rotate-180" : ""
        } text-white`}
      ></i>
    </a>
    <ul
      className="sub pl-6 mt-2"
      style={{ display: isSubMenuOpen[10] ? "block" : "none" }}
    >
      {permissions.includes("Travel_Report") && (
        <li>
          <Link
            to="reports/travel_report"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-plane mr-3 text-blue-400"></i>
            <span>Travel Report</span>
          </Link>
        </li>
      )}
      {permissions.includes("Expence_Report") && (
        <li>
          <Link
            to="reports/expence_report"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-file-invoice-dollar mr-3 text-green-400"></i>
            <span>Expense Report</span>
          </Link>
        </li>
      )}
      {permissions.includes("Ticket_Booking_Report") && (
        <li>
          <Link
            to="reports/ticket_report"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-ticket-alt mr-3 text-yellow-400"></i>
            <span>Ticket Report</span>
          </Link>
        </li>
      )}
      {permissions.includes("User_Report") && (
        <li>
          <Link
            to="reports/user_report"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-users mr-3 text-pink-400"></i>
            <span>User Report</span>
          </Link>
        </li>
      )}
      {permissions.includes("Leave_Report") && (
        <li>
          <Link
            to="reports/leave_report"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-calendar-minus mr-3 text-indigo-400"></i>
            <span>Leave Report</span>
          </Link>
        </li>
      )}
      {permissions.includes("Attendance_Report") && (
        <li>
          <Link
            to="reports/attendance_report"
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
          >
            <i className="fas fa-user-clock mr-3 text-red-400"></i>
            <span>Attendance Report</span>
          </Link>
        </li>
      )}
      <li>
        <Link
          to="reports/login_logout"
          className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200"
        >
          <i className="fas fa-sign-in-alt mr-3 text-white"></i>
          <span>Login/Logout Report</span>
        </Link>
      </li>
    </ul>
  </li>
)}
    
        <li>
          <a
            className="flex items-center p-2 rounded-lg hover:bg-[#b085d9] transition-all duration-200 cursor-pointer"
            onClick={handleLogout}
          >
            <i className="fa fa-key mr-3 text-white"></i>
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
          <div class="fixed w-full h-[75px] bg-[#282c34] z-10 rounded-b-[30px]">
          
        </div> 
        
          <Outlet />
          
        </section>

      </section>
      <Toaster />
    </div>
  );
};

export default TabnavBar;
