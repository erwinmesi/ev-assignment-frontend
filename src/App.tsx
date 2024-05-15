import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'

import AppRoutes from '@/AppRoutes'

import { accessTokenKey } from '@/configs/app'
import useAsync from '@/hooks/useAsync'
import useAuthApi from '@/hooks/useAuthApi'

import useUserStore from '@/stores/user'

import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  const { asyncResolve } = useAsync()

  const authApi = useAuthApi()

  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    verifyAuth()
  }, [])

  /**
   * Verifies the authentication status
   */
  const verifyAuth = async () => {
    // Get the access token from the local storage.
    const token = localStorage.getItem(accessTokenKey)

    // If the token is available...
    if (token) {
      // Set the Axios authorization header with the access token.
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      // Fetch the user details from the API.
      const { response }: any = await asyncResolve(authApi.getAuthUser())

      const authUser = response?.data

      // Update auth state depending on the user details
      useUserStore.setState({ authUser, authenticated: !!authUser })
    }

    setInitializing(false)
  }

  // Show loader while the app is initializing
  if (initializing) {
    return (
      <div className="text-sm text-slate-500 p-2">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <AppRoutes />

      {/* Container for displaying `react-toastify` toasts */}
      <ToastContainer icon={false} limit={3} />
    </>
  )
}

export default App
