import axios from "axios";
const env = import.meta.env.VITE_APP_AUTH

const defaultOptions = {
  baseURL: env,
  headers: {
    'Content-Type': 'application/json',
  },
}

let instance = axios.create(defaultOptions)

export const Login = async (schema, data) => {
  try {
    const res = await instance.post(schema, data);
    if (res?.data?.code === 200) {
      await localStorage.setItem("access_token", res?.data?.data?.access_token);
      return res;
    } else {
      await localStorage.setItem("access_token", null);
    }
  } catch (error) {
    return error.response;
  }
};

export const Logout = async (schema, data) => {
  try {
    const res = await instance.post(schema, data);
    return res;
  } catch (error) {
    return console.error(error)
  }
};

