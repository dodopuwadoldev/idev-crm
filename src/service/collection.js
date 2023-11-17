import { httpClient } from "./httpClient";
import { Logout } from "./auth";
// import { handleLogout } from "components/Menu";
export const getList = async (schema, params) => {
  try {
    const res = await httpClient.get(schema, { params });
    return { items: res.data, dataLength: res.headers["x-content-length"] };
  } catch (error) {
    if (error?.response?.status === 401) {
      checkToken();
      return error.response;
    } else {
      return error.response;
    }
  }
};

export const getById = async (schema, id) => {
  try {
    const res = await httpClient.get(`${schema}/${id}`);
    return res.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      checkToken();
      return error.response;
    } else {
      return error.response;
    }
  }
};

export const postData = async (schema, data) => {
  try {
    const res = await httpClient.post(schema, data);
    return res;
  } catch (error) {
    if (error?.response?.status === 401) {
      checkToken();
      return error.response;
    } else {
      return error.response;
    }
  }
};

export const putData = async (schema, id, data) => {
  try {
    const res = await httpClient.put(`${schema}/${id}`, data);
    return res.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      checkToken();
      return error.response;
    } else {
      return error.response;
    }
  }
};

export const deleteData = async (schema, id) => {
  try {
    const res = await httpClient.delete(`${schema}/${id}`);
    return res;
  } catch (error) {
    if (error?.response?.status === 401) {
      checkToken();
      return error.response;
    } else {
      return error.response;
    }
  }
};

export const onSearch = async (schema, params) => {
  try {
    const res = await httpClient.get(schema, params);
    return res.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      checkToken();
      return error.response;
    } else {
      return error.response;
    }
  }
};
const checkToken = () => {
  handleLogout();
};

export const handleLogout = async (type) => {
  const data = {
    Authorization: localStorage.getItem("access_token"),
  };
  const res = await Logout('/logout', data);
  if (res?.status === 204) {
    await localStorage.clear();
    // type === undefined && message.warning("Token expired!");
    setInterval(() => {
      window.location.href = "/login";
    }, 3000);
  } else {
    console.error('failed to log out')
  }
};

