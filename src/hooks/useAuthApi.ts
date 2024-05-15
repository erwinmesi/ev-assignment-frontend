import useAxios from '@/hooks/useAxios'

const ENDPOINT = '/api/auth'

const useAuthApi = () => {
  const { api } = useAxios()

  /**
   * Logs in the user.
   */
  const login = async (payload: any) => api.post(`${ENDPOINT}/login`, payload)

  /**
   * Retrieves the authenticated user details.
   */
  const getAuthUser = async () => api.get(`${ENDPOINT}/me`)

  /**
   * Logs out the authenticated user.
   */
  const logout = async () => api.delete(`${ENDPOINT}/logout`)

  return {
    login,
    getAuthUser,
    logout,
  }
}

export default useAuthApi
