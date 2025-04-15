"use client"

import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import endpoints from "../ApiEndpoint"
import toast, { Toaster } from "react-hot-toast"

const Login = () => {
  const navigate = useNavigate()
  const [logindetails, setLoginDetails] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!logindetails.email || !logindetails.password) {
      toast.error("All Fields required")
      
      return
      
    }

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const loginTimestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

        const headers = {
          "Content-Type": "application/json",
          "X-Latitude": latitude,
          "X-Longitude": longitude,
          "X-Login-Timestamp": loginTimestamp,
        }

        try {
          const response = await axios.post(endpoints.loginAuth, logindetails, {
            headers,
            withCredentials: true,
          })

          if (response.status === 200) {
            const data = await response.data
            const token = data.token
            localStorage.setItem("token", token)
            localStorage.setItem("roles", data.roles)
            localStorage.setItem("username", data.username)
            localStorage.setItem("permissions", JSON.stringify(data.permissions))
            localStorage.setItem("latitude",latitude);  
            localStorage.setItem("longitude",longitude);

            toast.success("Login Successful!");

            setTimeout(() => {
              navigate("/login/navbar/profile")
            }, 300)
          } else {
            toast.error("No token found")
          }
        } catch (error) {
          // toast.error(error.response?.data?.message || "Login failed")
          setErrors(error.response?.data?.message || "Login failed")
        }
      },
      (error) => {
        toast.error("Unable to retrieve location.")
        console.error("Geolocation error:", error)
      },
    )
  }

  return (
    <>
    <Toaster position="top-center" />
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
       {/* removed to-[#a065d7bd] */}
    <div className="bg-gradient-to-b from-white to-gray-800 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <div className="w-1/2 flex justify-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/logoexatoai.png`}
              alt="ExatoAI Logo"
              className="h-32 w-auto"
            />
          </div>
  
          {/* Login form on the right */}
          <div className="w-1/2 flex justify-center">
            <div className="w-full max-w-md space-y-8">
              <div className="mt-8 bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 Tilt-inner">
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      User ID
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        value={logindetails.email}
                        onChange={handleChange}
                        placeholder="Enter ID"
                        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl 
                        bg-white text-gray-900 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-200 sm:text-sm"
                      />
                    </div>
                  </div>
  
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 text-left"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={logindetails.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl 
                        bg-white text-gray-900 placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-200 sm:text-sm"
                      />
                      {errors && (
                        <p className="mt-1 text-sm mx-2 text-red-600">{errors}</p>
                      )}
                    </div>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember Me
                      </label>
                    </div>
  
                    <div className="text-sm">
                      <Link
                        to="/otp/forgot-password/email"
                        className="font-medium text-purple-600 hover:text-purple-500"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white 
                      bg-[#955bccbd] hover:bg-[#8958b8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
                      transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Login