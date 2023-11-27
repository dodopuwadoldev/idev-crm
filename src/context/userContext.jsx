import { createContext } from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMe } from "../service/collection";
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: "", auth: true });

  useEffect(() => {
    handleGetMe();
  }, []);

  const handleGetMe = async () => {
    const response = await getMe("/me");
    setUser({ auth: true, name: response.data });
    console.log("response", response);
  };

  // Login updates the user data with a name parameter
  const login = (name) => {
    setUser((user) => ({
      name: name,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.elementType,
};
