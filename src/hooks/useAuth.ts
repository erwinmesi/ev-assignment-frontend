import { accessTokenKey } from '@/configs/app'
import useAuthApi from '@/hooks/useAuthApi'
import useAsync from '@/hooks/useAsync'
import useRoute from '@/hooks/useRoute'

export default () => {
  const { asyncResolve } = useAsync()
  const { routes } = useRoute()
  const { logout } = useAuthApi()

  /**
   * Clear the access token from the local storage.
   */
  const clearAccessToken = () => {
    delete localStorage[accessTokenKey]
  }

  /**
   * Set the access token in the local storage.
   */
  const setAccessToken = (token: string) => {
    localStorage[accessTokenKey] = token
  }

  /**
   * Handles the logout functionality.
   */
  const handleLogout = async () => {
    // Log out the user from the server.
    await asyncResolve(logout())

    clearAccessToken()

    // Redirect the user to the login page.
    location.href = routes.login.path
  }

  return {
    clearAccessToken,
    handleLogout,
    setAccessToken,
  }
}
