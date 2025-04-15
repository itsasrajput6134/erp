import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthorizedUser = ({ children, fallbackUI }) => {
  const token = localStorage.getItem("token");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (!token) {
      timeoutId = setTimeout(() => {
        setRedirectToLogin(true);
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token]);

  if (redirectToLogin) {
    return <Navigate to="/" replace={true} />;
  }

  if (!token) {
    return (
      fallbackUI || (
        <div className="d-flex justify-content-center align-items-center">
          <p>You are not authorized. Please login First</p>
        </div>
      )
    );
  }

  // If there is a token, render the children
  return children;
};
