import React from "react";

const TicketTable = ({
  ticketLoading,
  tickets,
  handleUpdate,
  handleDelete,
}) => {                                            
  console.log(tickets);                            
  
  return (
    <div>
      {/* Office Table */}
      <div class="mx-5 mb-5 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg">
        <div class="p-4 overflow-x-auto border border-gray-800 rounded-lg">
          <div class="w-full text-center font-semibold text-black mb-4 bg-gradient-to-r from-purple-500 to-blue-50 p-4">Ticket Detail</div>
          <div class="table-responsive">
            <table className="w-full text-lg text-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Travel Id</th>
                  <th className="px-4 py-2 text-left">Travel Mode</th>
                  <th className="px-4 py-2 text-left">Booking Date</th>
                  <th className="px-4 py-2 text-left">Travel Date</th>
                  <th className="px-4 py-2 text-left">Departure Location</th>
                  <th className="px-4 py-2 text-left">Arrival Location</th>
                  <th className="px-4 py-2 text-left">Passenger Name</th>
                  <th className="px-4 py-2 text-left">Seat Number</th>
                  <th className="px-4 py-2 text-left">Ticket Price</th>
                  <th className="px-4 py-2 text-left">BookingId/PNR</th>
                  <th className="px-4 py-2 text-left">Cancellation Price</th>
                  <th className="px-4 py-2 text-left">Is Cancelled</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {ticketLoading ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : tickets.length > 0 ? (
                  tickets.map((item) => (
                    <tr key={item.travelGenId} className="hover:bg-gray-800 transition">
                      <td className="px-4 py-2">{item.travelGenId}</td>
                      <td className="px-4 py-2">{item.travelMode}</td>
                      <td className="px-4 py-2">{item.bookingDate}</td>
                      <td className="px-4 py-2">{item.travelDate}</td>
                      <td className="px-4 py-2">{item.departureLocation}</td>         
                      <td className="px-4 py-2">{item.arrivalLocation}</td>
                      <td className="px-4 py-2">{item.passengerName}</td>
                      <td className="px-4 py-2">{item.seatNumber}</td>
                      <td className="px-4 py-2">{item.ticketPrice}</td>           
                      <td className="px-4 py-2">{item.bookingId}</td>
                      <td className="px-4 py-2">{item.cancellationPrice}</td>
                      <td className="px-4 py-2">{item.isCancelled === false? "False":"True"}</td>
                      <td className="px-4 py-2">
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
                    <td colSpan="10" className="text-center py-4">
                      No Ticket found                  
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );                                              
};

export default TicketTable;