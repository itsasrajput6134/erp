import React, { useEffect, useState } from 'react';

const OfficialDetails = ({ profile }) => {
    console.log(profile);

    const [formData, setFormData] = useState({
        officialEmail: '',
        employeeID: '',
        designation: '',
        department: '',
        reportingManager: '',
        reportingManagerEmail: '',
        officeLocation: '',
        officeContact: '',
        joiningDate: '',
    });

    // Populate formData from profile when the component mounts
    useEffect(() => {
        if (profile) {
            setFormData({
                officialEmail: profile.email || '',
                employeeID: profile.employeeId || '',
                designation: profile.designation || '',
                department: profile.department || '',
                reportingManager: profile.reportingManagerName || '',
                reportingManagerEmail: profile.reportingManager || '',
                officeLocation: `${profile.office || ''}, ${profile.state || ''}, ${profile.country || ''}`.trim() || '',
                officeContact: profile.phoneNo || '',
                joiningDate: profile.employeeOnBoardDate || '',
            });
        }
    }, [profile]);

    return (
        <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Official Details</h2>

            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300">Official Email Address</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.officialEmail || ' '}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Employee ID</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.employeeID || ' '}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Designation</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.designation || ' '}
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300">Department</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.department || ' '}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Reporting Manager</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.reportingManager || " - "}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Reporting Manager Mail</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.reportingManagerEmail || ' - '}
                    </div>
                </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-purple-300">Office Location</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.officeLocation || ' '}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Office Contact</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.officeContact || ' '}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-purple-300">Joining Date</label>
                    <div className="mt-1 p-2 bg-gray-800 text-gray-200 rounded-full shadow-sm">
                        {formData.joiningDate || ' '}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfficialDetails;