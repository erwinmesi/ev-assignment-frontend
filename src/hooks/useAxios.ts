import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios'
import { apiUrl } from '@/configs/app'
import { InternalAxiosRequestConfig } from 'axios'

let api: AxiosInstance

export default () => {
  // This makes sure we only create the axios instance once
  if (!api) {
    api = axios.create({
      baseURL: apiUrl,
    })
  }

  api.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
    // On every request, set the Authorization header to axios' default Authorization header
    config.headers.Authorization = axios.defaults.headers.common.Authorization
    return config
  })

  api.interceptors.response.use(
    (response: AxiosResponse) => Promise.resolve(response),
    async (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  return {
    api: api as AxiosInstance,
  }
}
