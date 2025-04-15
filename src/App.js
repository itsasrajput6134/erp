import { Route, Routes } from "react-router-dom";
import "./css/style.css";
import "./css/style-responsive.css";
import "./css/font-awesome.css";
import "./css/query.css";
import "./App.css";

import TabnavBar from "./components/TabnavBar";
import Login from "./components/login";
import { useEffect, useState } from "react";
import Enable_UserId from "./components/User_Maintainance/Enable_UserId";
import Disable_UserId from "./components/User_Maintainance/Disable_UserId";
import User_creation_common from "./components/User_Maintainance/User_creation/User_creation_common";
import { AuthorizedUser } from "./components/privateroute/PrivateRoute";
import Country from "./components/configurations/country/Country.js";
import State from "./components/configurations/state/State.js";
import OfficeName from "./components/configurations/office/OfficeName.js";
import Departments from "./components/configurations/department/DepartmentName.js";
import Project_Details from "./components/configurations/project/ProjectName.js";
import Tech_Name from "./components/configurations/technology/TechnologyName.js";
import EmployeeCreation from "./components/hr/EmployeeCreation";
import Reimbursement from "./components/configurations/Reimbursement_Type";
import EmployeeOnboarding from "./components/hr/Emp_Onboarding/Emp_Onboarding.js";
import Employee_Update from "./components/admin/Employee_Update";
import RoleName from "./components/configurations/role/RolesName.js";
import AssetsName from "./components/configurations/asset/AssetsName.js";
import Project_Client from "./components/configurations/client/ClientName.js";
import CreatePage from "./components/superAdmin/CreatePage.js";
import GiveRight from "./components/superAdmin/giveRight/RightCreationCommon.js";
import SetApprover from "./components/superAdmin/giveApprover/ApproverCreationCommon.js";
import Profile from "./components/profile/Profile.js";
import Organization_Hierarchies from "./components/configurations/hierarchy/Organization_Hierarchies.js";
import Developer_Demo1 from "./components/developer/Developer_Demo1.js";
import Developer_Demo2 from "./components/developer/Developer_Demo2.js";
import Developer_Demo3 from "./components/developer/Developer_Demo3.js";
import User_Demo1 from "./components/user/Emp_Office_Asset.js";
import User_Demo2 from "./components/user/User_Demo2.js";
import User_Demo3 from "./components/user/User_Demo3.js";
import Travel_Request_Form from "./components/travel/Travel_Request_Form.js";
import Travel_History from "./components/travel/Travel_History.js";
import Travel_Approver from "./components/travel/Travel_Approver.js";
import Expence_Claim_Form from "./components/travel/Expence_Claim_Form.js";
import Expence_Claim_History from "./components/travel/Expence_Claim_History/Expence_Claim_History.js";
import Expence_Claim_Approver from "./components/travel/Expence_Claim_Approver/Expence_Claim_Approver.js";
import Emp_Ofboarding from "./components/hr/Emp_Ofboarding.js";
import Approvers from "./components/superAdmin/addApprover/Approvers.js";
import EmpAttendance from "./components/attendance/EmpAttendance/EmpAttendance.js";
import EmpAttendanceHistory from "./components/attendance/EmpAttendance/EmpAttendanceHistory.js";
import Holiday from "./components/hr/Holiday/Holiday.js";
import EmpLeave from "./components/attendance/EmpLeave/EmpLeave.js";
import EmpLeaveHistory from "./components/attendance/EmpLeave/EmpLeaveHistory.js";
import EmpLeaveApprover from "./components/attendance/EmpLeave/EmpLeaveApprover.js";
import TicketName from "./components/admin/ticketMaintainance.js/TicketName.js";
import Travel_Report from "./components/report/Travel_Report.js";
import Expence_Report from "./components/report/Expence_Report.js";
import Ticket_Booking_Report from "./components/report/Ticket_Booking_Report.js";
import Leave_Report from "./components/report/Leave_Report.js";
import User_Report from "./components/report/User_Report.js";
import Attendance_Report from "./components/report/Attendance_Report.js";
import ChangePassword from "./components/profile/ChangePassword.js";
import ForgotPassword from "./components/profile/ForgotPassword.js";
import EmailDetails from "./components/profile/EmailDetails.js";
import ProcessName from "./components/superAdmin/process/ProcessName.js";
import Login_Logout from "./components/report/LoginLogoutReport.js";

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loginDetailsString = localStorage.getItem("loginDetails");
    const details = JSON.parse(loginDetailsString);
    const pagesFromLocalStorage = details ? details.pages : [];
    setPages(pagesFromLocalStorage);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ChangePassword />} />
        <Route path="/reset-password/username" element={<ChangePassword />} />
        <Route path="otp/forgot-password/email" element={<EmailDetails />} />
        <Route path="otp/:email" element={<ForgotPassword />} />

        <Route
          path="/login/navbar"
          element={
            <AuthorizedUser>
              <TabnavBar />
            </AuthorizedUser>
          }
        >
          <Route
            path="profile"
            element={
              <AuthorizedUser>
                <Profile />
              </AuthorizedUser>
            }
          />
          <Route
            path="attendance"
            element={
              <AuthorizedUser>
                <EmpAttendance />
              </AuthorizedUser>
            }
          />
          <Route
            path="attendanceHistory"
            element={
              <AuthorizedUser>
                <EmpAttendanceHistory />
              </AuthorizedUser>
            }
          />

          <Route path="admin">
            <Route
              path="updateEmplyee"
              element={
                <AuthorizedUser>
                  <Employee_Update />
                </AuthorizedUser>
              }
            />
            <Route
              path="ticketHistory"
              element={
                <AuthorizedUser>
                  <TicketName />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="user_maintainance">
            <Route
              path="user_creation"
              element={
                <AuthorizedUser>
                  <User_creation_common />
                </AuthorizedUser>
              }
            />
            <Route
              path="enable_userId"
              element={
                <AuthorizedUser>
                  <Enable_UserId />
                </AuthorizedUser>
              }
            />
            <Route
              path="Disable_userId"
              element={
                <AuthorizedUser>
                  <Disable_UserId />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="configuration">
            <Route
              path="country"
              element={
                <AuthorizedUser>
                  <Country />
                </AuthorizedUser>
              }
            />
            <Route
              path="state"
              element={
                <AuthorizedUser>
                  <State />
                </AuthorizedUser>
              }
            />
            <Route
              path="office"
              element={
                <AuthorizedUser>
                  <OfficeName />
                </AuthorizedUser>
              }
            />
            <Route
              path="organization_hierarchy"
              element={
                <AuthorizedUser>
                  <Organization_Hierarchies />
                </AuthorizedUser>
              }
            />
            <Route
              path="departments"
              element={
                <AuthorizedUser>
                  <Departments />
                </AuthorizedUser>
              }
            />
            <Route
              path="project_details"
              element={
                <AuthorizedUser>
                  <Project_Details />
                </AuthorizedUser>
              }
            />
            <Route
              path="tech_name"
              element={
                <AuthorizedUser>
                  <Tech_Name />
                </AuthorizedUser>
              }
            />
            <Route
              path="roleCreate"
              element={
                <AuthorizedUser>
                  <RoleName />
                </AuthorizedUser>
              }
            />
            <Route
              path="assetsCreate"
              element={
                <AuthorizedUser>
                  <AssetsName />
                </AuthorizedUser>
              }
            />
            <Route
              path="reimb_type"
              element={
                <AuthorizedUser>
                  <Reimbursement />
                </AuthorizedUser>
              }
            />
            <Route
              path="client_create"
              element={
                <AuthorizedUser>
                  <Project_Client />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="hr">
            <Route
              path="emp_creation"
              element={
                <AuthorizedUser>
                  <EmployeeCreation />
                </AuthorizedUser>
              }
            />
            <Route
              path="emp_onboard"
              element={
                <AuthorizedUser>
                  <EmployeeOnboarding />
                </AuthorizedUser>
              }
            />
            <Route
              path="emp_offboard"
              element={
                <AuthorizedUser>
                  <Emp_Ofboarding />
                </AuthorizedUser>
              }
            />
            <Route
              path="holiday"
              element={
                <AuthorizedUser>
                  <Holiday />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="superAdmin">
            <Route
              path="createPage"
              element={
                <AuthorizedUser>
                  <CreatePage />
                </AuthorizedUser>
              }
            />
            <Route
              path="giveRight"
              element={
                <AuthorizedUser>
                  <GiveRight />
                </AuthorizedUser>
              }
            />
            <Route
              path="addApprover"
              element={
                <AuthorizedUser>
                  <Approvers />
                </AuthorizedUser>
              }
            />
            <Route
              path="setApprover"
              element={
                <AuthorizedUser>
                  <SetApprover />
                </AuthorizedUser>
              }
            />
            <Route
              path="processCreate"
              element={
                <AuthorizedUser>
                  <ProcessName />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="developer">
            <Route
              path="developer_demo1"
              element={
                <AuthorizedUser>
                  <Developer_Demo1 />
                </AuthorizedUser>
              }
            />
            <Route
              path="developer_demo2"
              element={
                <AuthorizedUser>
                  <Developer_Demo2 />
                </AuthorizedUser>
              }
            />
            <Route
              path="developer_demo3"
              element={
                <AuthorizedUser>
                  <Developer_Demo3 />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="attendance">
            <Route
              path="markAttendance"
              element={
                <AuthorizedUser>
                  <EmpAttendance />
                </AuthorizedUser>
              }
            />
            <Route
              path="attendanceHistory"
              element={
                <AuthorizedUser>
                  <EmpAttendanceHistory />
                </AuthorizedUser>
              }
            />
            <Route
              path="leave"
              element={
                <AuthorizedUser>
                  <EmpLeave />
                </AuthorizedUser>
              }
            />
            <Route
              path="leaveHistory"
              element={
                <AuthorizedUser>
                  <EmpLeaveHistory />
                </AuthorizedUser>
              }
            />
            <Route
              path="leaveApprover"
              element={
                <AuthorizedUser>
                  <EmpLeaveApprover />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="user">
            <Route
              path="user_demo1"
              element={
                <AuthorizedUser>
                  <User_Demo1 />
                </AuthorizedUser>
              }
            />
            <Route
              path="user_demo2"
              element={
                <AuthorizedUser>
                  <User_Demo2 />
                </AuthorizedUser>
              }
            />
            <Route
              path="user_demo3"
              element={
                <AuthorizedUser>
                  <User_Demo3 />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="reports">
            <Route
              path="travel_report"
              element={
                <AuthorizedUser>
                  <Travel_Report />
                </AuthorizedUser>
              }
            />
            <Route
              path="expence_report"
              element={
                <AuthorizedUser>
                  <Expence_Report />
                </AuthorizedUser>
              }
            />
            <Route
              path="ticket_report"
              element={
                <AuthorizedUser>
                  <Ticket_Booking_Report />
                </AuthorizedUser>
              }
            />
            <Route
              path="leave_report"
              element={
                <AuthorizedUser>
                  <Leave_Report />
                </AuthorizedUser>
              }
            />
            <Route
              path="user_report"
              element={
                <AuthorizedUser>
                  <User_Report />
                </AuthorizedUser>
              }
            />
            <Route
              path="attendance_report"
              element={
                <AuthorizedUser>
                  <Attendance_Report />
                </AuthorizedUser>
              }
            />
            <Route
              path="login_logout"
              element={
                <AuthorizedUser>
                  <Login_Logout />
                </AuthorizedUser>
              }
            />
          </Route>

          <Route path="travel">
            <Route
              path="travel_request"
              element={
                <AuthorizedUser>
                  <Travel_Request_Form />
                </AuthorizedUser>
              }
            />
            <Route
              path="travel_history"
              element={
                <AuthorizedUser>
                  <Travel_History />
                </AuthorizedUser>
              }
            />
            <Route
              path="travel_approver"
              element={
                <AuthorizedUser>
                  <Travel_Approver />
                </AuthorizedUser>
              }
            />
            <Route
              path="expence_claim"
              element={
                <AuthorizedUser>
                  <Expence_Claim_Form />
                </AuthorizedUser>
              }
            />
            <Route
              path="expence_claim_history"
              element={
                <AuthorizedUser>
                  <Expence_Claim_History />
                </AuthorizedUser>
              }
            />
            <Route
              path="expence_claim_approver"
              element={
                <AuthorizedUser>
                  <Expence_Claim_Approver />
                </AuthorizedUser>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;