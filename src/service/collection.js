import { Logout } from "./auth";
import axios from "axios";

const env = import.meta.env.VITE_APP_BASEURL;
const envAuth = import.meta.env.VITE_APP_AUTH;
const defaultOptions = {
  baseURL: env,
  headers: {
    "Content-Type": "application/json",
  },
};
const defaultOptionsAuth = {
  baseURL: envAuth,
  headers: {
    "Content-Type": "application/json",
  },
};
let httpClient = axios.create(defaultOptions);
let httpClientAuth = axios.create(defaultOptionsAuth);

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

export const getMe = async (schema) => {
  try {
    httpClientAuth.defaults.headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const res = await httpClientAuth.get(schema);
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
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
  await localStorage.removeItem("access_token");
  const res = await httpClientAuth.post("/logout", data);
  setInterval(() => {
    window.location.href = "/login";
  }, 2000);
  if (res?.status === 200) {
    setInterval(() => {
      window.location.href = "/login";
    }, 2000);
  } else {
    console.error("failed to log out");
    window.location.href = "/login";
  }
};
