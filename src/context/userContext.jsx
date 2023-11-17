import { createContext } from "react";
import { useState } from "react";
import PropTypes from 'prop-types'
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: '', auth: true });

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
      name: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}


export default UserProvider


UserProvider.propTypes = {
  children: PropTypes.elementType
}


