import axios from 'axios'
const env = import.meta.env.VITE_APP_BASEURL

export default function httpsClient() {
  const defaultOptions = {
    baseURL: env,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  // สร้าง Instance
  let instance = axios.create(defaultOptions)

  // สำหรับ Set Auth ที่ต้องมี Token โดยการ Get token จาก Local storage
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  return instance
}
