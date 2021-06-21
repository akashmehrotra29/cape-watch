import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  accountService,
  loginService,
  signupService,
} from "../services/user-services";

const AuthContext = createContext();

const setAuthHeaderforServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authentication"];
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("authToken"))
  );

  let decodedToken;
  try {
    decodedToken = jwt_decode(token);
  } catch (error) {
    console.log("error in decoding token", error);
  }
  // const decodedToken = token && jwt_decode(token);
  const [user, setUser] = useState(decodedToken);

  useEffect(() => {
    setUser(decodedToken);
  }, [token]);

  console.log({ user });

  if (token) {
    setAuthHeaderforServiceCalls(token);
  }

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.data.message === "Invalid Token"
      ) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const loginUserWithCredentials = async (email, password) => {
    try {
      const {
        data: { token, success, message },
      } = await loginService(email, password);

      if (success) {
        setToken(token);
        setAuthHeaderforServiceCalls(token);
        localStorage?.setItem("authToken", JSON.stringify(token));
      }

      return { success, message };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  };

  const createUserWithCredentials = async (name, email, password) => {
    try {
      const {
        data: { token, success, message },
      } = await signupService(name, email, password);

      if (success) {
        setToken(token);
        setAuthHeaderforServiceCalls(token);
        localStorage?.setItem("authToken", JSON.stringify(token));
      }

      return { success, message };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  };

  const updateAccountDetails = async (id, name, email, password) => {
    try {
      const {
        data: { success, message },
      } = await accountService(id, name, email, password);

      //   if (success) {
      //     logoutUser();
      //   }
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  };

  const logoutUser = async () => {
    setToken(null);
    setAuthHeaderforServiceCalls(null);
    localStorage?.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        createUserWithCredentials,
        loginUserWithCredentials,
        updateAccountDetails,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
