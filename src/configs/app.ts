/**
 * The backend API URL.
 */
export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:6060'

/**
 * Key we use to store the access token in the local storage.
 */
export const accessTokenKey =
  import.meta.env.VITE_ACCESS_TOKEN_KEY || 'accessToken'
