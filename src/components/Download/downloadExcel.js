// downloadExcel.js
import * as XLSX from "xlsx";

export const downloadExcel = (data) => {
  if (!data || data.length === 0) {
    console.warn("No data available to download.");
    return;
  }
  
  // Format the data into a structured array
  const formattedData = data.map((item) => ({
    "Approver Email": item.approverEmail,
    "Claim Date": new Date(item.claimDate)
      .toISOString()
      .slice(0, 16)
      .replace("T", " "),
    "Employee Email": item.employeeEmail,
    "Expense Claim ID": item.expenseClaimGenId,
    "Total Amount": item.totalAmount,
    "Claim Status": item.expenseClaimStatus,
  }));

  // Create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Report");

  // Generate the Excel file and trigger download
  XLSX.writeFile(workbook, "Expense_Report.xlsx");
};

// export const downloadExcel = (data) => {
//   if (!data || data.length === 0) {
//     console.warn("No data available to download.");
//     return;
//   }

//   // Format the data safely
//   const formattedData = data.map((item) => {
//     let formattedClaimDate = "Invalid Date"; // Default fallback

//     if (item.claimDate) {
//       const dateObj = new Date(item.claimDate);

//       if (!isNaN(dateObj.getTime())) {
//         formattedClaimDate = dateObj.toISOString().slice(0, 16).replace("T", " ");
//       }
//     }

//     return {
//       "Approver Email": item.approverEmail || "N/A",
//       "Claim Date": formattedClaimDate,
//       "Employee Email": item.employeeEmail || "N/A",
//       "Expense Claim ID": item.expenseClaimGenId || "N/A",
//       "Total Amount": item.totalAmount ?? "N/A", // Handles null/undefined
//       "Claim Status": item.expenseClaimStatus || "N/A",
//     };
//   });

//   // Create Excel file
//   const worksheet = XLSX.utils.json_to_sheet(formattedData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Report");
  
//   // Download file
//   XLSX.writeFile(workbook, "Expense_Report.xlsx");
// };
