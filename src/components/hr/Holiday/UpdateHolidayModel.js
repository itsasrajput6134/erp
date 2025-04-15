import React from 'react';

const UpdateHolidayModel = ({
  isOpen,
  isClose,
  updateHoliday,
  handleChangeUpdate,
  handlUpdateSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mx-auto">
            UPDATE HOLIDAY
          </h2>
          <button
            onClick={isClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                id="date"
                name="date"
                value={updateHoliday.date}
                onChange={handleChangeUpdate}
                placeholder="Enter Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Holiday Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                id="name"
                name="name"
                value={updateHoliday.name}
                onChange={handleChangeUpdate}
                placeholder="Enter Holiday Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              id="description"
              name="description"
              rows="3"
              value={updateHoliday.description}
              onChange={handleChangeUpdate}
              placeholder="Enter Description"
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={isClose}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handlUpdateSubmit}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateHolidayModel;