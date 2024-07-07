/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]); 
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    console.log("Storing token in localStorage:", serverToken);
    localStorage.setItem("token", serverToken);
    setToken(serverToken); // Update state as well
  };

  const isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn);

  // Tackling the logout functionality
  const LogoutUser = () => {
    console.log("Logging out, removing token...");
    setToken("");
    localStorage.removeItem("token");
  };

  // JWT_Authentication - to get the currently user data
  const userAuthentication = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user Data", data.userData);
        setUser(data.userData);
      } else {
        console.log("Invalid token, logging out...");
        LogoutUser();
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  // to fetch the data from the database
  const getServiceData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched services data:", data);
        setServices(data.msg); // Assuming the API response structure has a `msg` field containing the services
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
  };

  useEffect(() => {
    getServiceData();
    userAuthentication();
  }, [token]); // Adding token as a dependency to call userAuthentication when token changes

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
