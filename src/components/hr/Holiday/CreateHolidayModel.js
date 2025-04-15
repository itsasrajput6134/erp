import React from "react";

const CreateHolidayModel = ({
  isOpen,
  isClose,
  addHoliday,
  handleChangeAdd,
  handleAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-800 rounded-2xl shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-200">ADD HOLIDAY</h2>
          <button
            onClick={isClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>
        <form onSubmit={handleAdd}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={addHoliday.date}
                onChange={handleChangeAdd}
                className="w-full p-2 bg-slate-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Holiday Name</label>
              <input
                type="text"
                name="name"
                value={addHoliday.name}
                onChange={handleChangeAdd}
                className="w-full p-2 bg-slate-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter Holiday Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={addHoliday.description}
                onChange={handleChangeAdd}
                rows="3"
                className="w-full p-2 bg-slate-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter Description"
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={isClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHolidayModel;