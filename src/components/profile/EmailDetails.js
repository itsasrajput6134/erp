import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../../ApiEndpoint";
import toast, { Toaster } from "react-hot-toast";
import { Mail } from "lucide-react";

const EmailDetails = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordDetails, setPasswordDetails] = useState({
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        // Validation
        const { email } = passwordDetails;
        if (!email) {
            toast.error("Email fields are required");
            return;
        }
        console.log(email, endpoints.forgotPassword);
        setIsSubmitting(true);
        try {
            const response = await axios.post(
                endpoints.forgotPassword,
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.status === 200) {
                toast.success(response?.data?.message || "Reset link send to your email");
                setTimeout(() => {
                    navigate("/login");
                }, 300);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to send reset link"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Mail className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Reset Password
          </h2>
          
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={passwordDetails.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 
                ${isSubmitting 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          
        </div>
      </div>
      <Toaster />
    </div>
        // <div className="log-w3">
        //     <div className="w3layouts-main">
        //         <h2>Enter Email</h2>
        //         <form onSubmit={handleChangePassword}>
        //             <input
        //                 className="ggg"
        //                 type="email"
        //                 name="email"
        //                 placeholder="Enter Email"
        //                 required
        //                 value={passwordDetails.email}
        //                 onChange={handleChange}
        //             />
        //             <div className="clearfix"></div>
        //             <input type="submit" value={isSubmitting ? "Submitting..." : "Submit"} name="changePassword" disabled={isSubmitting} />
        //         </form>
        //     </div>
        //     <Toaster />
        // </div>
    );
};

export default EmailDetails;