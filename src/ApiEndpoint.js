//  base URL
// const baseURL = "http://192.168.1.182:8082/";
// const baseURL = "http://localhost:8081/";
// const baseURL = "http://ec2-54-80-9-177.compute-1.amazonaws.com:8082/"
const baseURL = "http://54.80.9.177:8082/"
export const endpoints = {
  //Configuration Endpoint
  //Country
  getAllCountry: `${baseURL}country`,
  addCountry: `${baseURL}country/createCountry`,
  updateCountry: `${baseURL}country`,
  deleteCountry: `${baseURL}country`,

  //State
  getAllState: `${baseURL}state`,
  addState: `${baseURL}state/createState`,
  updateState: `${baseURL}state`,
  deleteState: `${baseURL}state`,
  getAllStateByCountryID: `${baseURL}state/country`,

  //Office
  getAllOffice: `${baseURL}office`,
  addOffice: `${baseURL}office/createOffice`,
  updateOffice: `${baseURL}office`,
  deleteOffice: `${baseURL}office`,
  getAllOfficeByStateID: `${baseURL}office/state`,

  //Department
  getAllDepartment: `${baseURL}department`,
  addDepartment: `${baseURL}department/createDept`,
  updateDepartment: `${baseURL}department`,
  deleteDepartment: `${baseURL}department`,
  getAllDepartmentByOfficeId: `${baseURL}department/office`,

  //Project
  getAllProject: `${baseURL}project`,
  addProject: `${baseURL}project/createProject`,
  updateProject: `${baseURL}project`,
  deleteProject: `${baseURL}project`,
  getAllProjectByDepartmentId: `${baseURL}project/department`,

  //Technology
  getAllTechnology: `${baseURL}technology`,
  addTechnology: `${baseURL}technology/createTechnology`,
  updateTechnology: `${baseURL}technology`,
  deleteTechnology: `${baseURL}technology`,

  //Reimbursement
  getAllReimbursement: `${baseURL}reimbursement`,
  addReimbursement: `${baseURL}reimbursement/createReimburesement`,
  updateReimbursement: `${baseURL}reimbursement`,
  deleteReimbursement: `${baseURL}reimbursement`,

  //Role
  getAllRoles: `${baseURL}role`,
  addRoles: `${baseURL}role/createrole`,
  updateRoles: `${baseURL}role`,
  deleteRoles: `${baseURL}role`,

  //Assets
  getAllAssets: `${baseURL}asset`,
  addAssets: `${baseURL}asset/createAsset`,
  updateAssets: `${baseURL}asset`,
  deleteAssets: `${baseURL}asset`,

  //Clients
  getAllClients: `${baseURL}client/getAllClient`,
  addClients: `${baseURL}client/createclient`,
  updateClients: `${baseURL}client`,
  deleteClients: `${baseURL}client`,

  /////////////////////////////////////////////////////////////////////////////////////////
  // Auth Endpoint
  loginAuth: `${baseURL}login`,
  logoutAuth: `${baseURL}logoutAPI`,
  changePassword: `${baseURL}forgot/sendResetPasswordLink`,
  submitChangePassword: `${baseURL}forgot/changePassword`,
  forgotPassword: `${baseURL}forgot/forgotpassword`,
  submitForgotPassword: `${baseURL}forgot/verifyOTP`,

  ////////////////////////////////////////////////////////////////////////////////////////
  // Employees Endpoint
  getAllEmployee: `${baseURL}user/getAllUser`,
  addEmployee: `${baseURL}user/createuser`,
  updateEmployee: `${baseURL}user`,
  deleteEmployee: `${baseURL}user`,
  getAllEmployeeActive: `${baseURL}user/active`,
  updateEmployeeOffboard: `${baseURL}user/offboardEmployee`,
  getProfile: `${baseURL}user/getUserByEmail/`,
  updateProfile: `${baseURL}user/employeeDetails/`,

  /////////////////////////////////////////////////////////////////////////////////////////
  // Dynamic User Module Endpoint
  getPageStructure: `${baseURL}api/json-data`,
  addPageStructure: `${baseURL}api/json-data`,

  getPermissionByRole: `${baseURL}rolePermission`,
  addPermissionByRole: `${baseURL}rolePermission/assignPermissions`,
  updatePermissionByRole: `${baseURL}rolePermission/updatePermissions`,
  deletePermissionByRole: `${baseURL}rolePermission`,
  getAllPermissionAndRoles: `${baseURL}rolePermission/all`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Travel Endpoint

  getAllTravels: `${baseURL}travelRequest`,
  getSingleTravels: `${baseURL}employee/getsingleemployee`,
  addTravels: `${baseURL}travelRequest`,
  // updateTravels: `${baseURL}travelRequest`,
  updateTravels: `${baseURL}approvalRequest`,
  deleteTravels: `${baseURL}travelRequest`,
  getAllTravelsEmployee: `${baseURL}travelRequest/employee`,
  getAllTravelsListApprover: `${baseURL}travelRequest/approvalManager`,
  // getAllTravelsListToApproverWithPendingStatus: `${baseURL}travelRequest/approvalManager`,
  getAllTravelsListToApproverWithPendingStatus: `${baseURL}approvalRequest/manager`,
  getTravellerEmployeesByStatus: `${baseURL}travelRequest/approvalStatus`,
  getTravelDetails: `${baseURL}travelRequest/gen`,
  getAllTravelMode: `${baseURL}travelModes`,
  UpdateTravelByGenId: `${baseURL}travelRequest/gen`,
  DeleteTravelByGenId: `${baseURL}travelRequest/gen`,
  getAllAccomdationType: `${baseURL}accommodationTypes`,
  bookHotelBetweenCheckinCheckout: `${baseURL}hotelDetails`,
  hotelDetailsBytravelGenId: `${baseURL}hotelDetails/details`,
  getAllGuestHouse: `${baseURL}guestHouseDetails`,
  checkGuestHouseAvailable: `${baseURL}guestHouseBookings/guestHouseBook`,
  getGuestHouseDetail: `${baseURL}guestHouseBookings/details`,
  getAllAvailableDates: `${baseURL}guestHouseBookings/bookedDates/`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Claim Type Endpoint

  getAllClaimType: `${baseURL}claimType`,
  addClaim: `${baseURL}expenseClaims`,
  getAllClaim: `${baseURL}travelRequest`,
  getClaimByStatus: `${baseURL}travelRequest`,
  getClaimByEmployeeEmail: `${baseURL}expenseClaims/employeeEmail`,
  getPendingClaimByApproverEmail: `${baseURL}expenseClaims/approver`,
  updateClaim: `${baseURL}expenseClaims`,
  getClaimByApproverEmailAndStatus: `${baseURL}expenseClaims/approver`,
  getApprovedClaimByStatus: `${baseURL}expenseClaims/expenseClaimStatus/APPROVED`,
  getExpenseClaimById: `${baseURL}expenseClaims/gen`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  //Attendance Endpoint
  markAttendance: `${baseURL}attendance/mark`,
  getAttendance: `${baseURL}attendance/getByEmail`,
  getLeaveById: `${baseURL}leave`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  //holiday
  getAllHoliday: `${baseURL}holidays/all`,
  addHoliday: `${baseURL}holidays/add`,
  updateHoliday: `${baseURL}holidays/update`,
  deleteHoliday: `${baseURL}holidays/delete`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  //Leave
  applyLeave: `${baseURL}leave/apply`,
  getAllLeavesForHistory: `${baseURL}leave/allLeaveApp`,
  getAllLeavesForApprover: `${baseURL}leave/approverStatus`,
  getAllRemainingLeavesByYear: `${baseURL}leave/balance`,
  postStatusDescription: `${baseURL}leave/update`,
  getAllApprovedLeavesForHistory: `${baseURL}leave/status`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  //Ticket
  getAllTicket: `${baseURL}travelBooking`,
  postTicket: `${baseURL}travelBooking`,
  putTicket: `${baseURL}travelBooking`,
  deleteTicket: `${baseURL}travelBooking/genId`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Download file
  downloadfile: `${baseURL}expenseClaims/downloadFile`,

  /////////////////////////////////////////////////////////////////////////////////////////////

  //Process
  getAllProcesss: `${baseURL}process/all`,
  addProcesss: `${baseURL}process/createProcess`,
  updateProcesss: `${baseURL}process/update`,
  deleteProcesss: `${baseURL}process/delete`,

  /////////////////////////////////////////////////////////////////////////////////////////////

  // Approver Flow
  getAllApproverFlow: `${baseURL}processHierarchy/getAllWithHierarchy`,
  getApproverFlow: `${baseURL}processHierarchy/getHierarchy`,
  addApproverFlow: `${baseURL}processHierarchy/createHierarchy`,
  updateApproverFlow: `${baseURL}processHierarchy/editHierarchy`,
  deleteApproverFlow: `${baseURL}processHierarchy/deleteHierarchy`,

  /////////////////////////////////////////////////////////////////////////////////////////////

  // Approver Flow
  getAllApproverFlow: `${baseURL}processHierarchy/getAllWithHierarchy`,
  getApproverFlow: `${baseURL}processHierarchy/getHierarchy`,
  addApproverFlow: `${baseURL}processHierarchy/createHierarchy`,
  updateApproverFlow: `${baseURL}processHierarchy/editHierarchy`,
  deleteApproverFlow: `${baseURL}processHierarchy/deleteHierarchy`,

  /////////////////////////////////////////////////////////////////////////////////////////////
  // Reports
  getTravelReportData: `${baseURL}travelRequest/travelReport`,
  getExpenceReportData: `${baseURL}expenseClaims/expenseReport`,
  getTicketReportData: `${baseURL}travelBooking/travelBookingReport`,
  getUserReportData: `${baseURL}user/userReport`,
  getLeaveReportData: `${baseURL}leave/leaveReport`,
  getAttendanceReportData: `${baseURL}attendance/attendanceReport`,
  getLoginLogoutReportData: `${baseURL}user/listLoginLogout`,
};

// Export the endpoints object
export default endpoints;
