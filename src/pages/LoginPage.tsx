import { FormError } from '@/types'
import { useState } from 'react'
import { toast } from 'react-toastify'
import InputError from '@/components/forms/InputError'
import useAsync from '@/hooks/useAsync'
import useAuthSchema from '@/hooks/useAuthSchema'
import useZod from '@/hooks/useZod'
import useAuthApi from '@/hooks/useAuthApi'
import useRoute from '@/hooks/useRoute'
import useAuth from '@/hooks/useAuth'

export default function LoginPage() {
  const { routes } = useRoute()
  const { setAccessToken } = useAuth()
  const { loginSchema } = useAuthSchema()
  const { asyncResolve } = useAsync()
  const { validateSchema } = useZod()
  const authApi = useAuthApi()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<FormError | null>({})
  const [loading, setLoading] = useState(false)

  /**
   * Handles the login form submission.
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setErrors(null)

    const form = { email, password }

    const validationErrors = validateSchema(loginSchema, form)
    if (validationErrors) {
      setLoading(false)
      return setErrors(validationErrors)
    }

    const { response, error }: any = await asyncResolve(authApi.login(form))
    setLoading(false)

    if (error) {
      return setErrors(error?.errors)
    }

    // On success, store the access token in the local storage
    setAccessToken(response?.data?.access_token)

    toast('Logged in successfully!')

    // Redirect to the users page after 1sec.
    setTimeout(() => {
      window.location.href = routes.users.path
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" noValidate onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="app-label">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                className="app-input"
                value={email}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <InputError error={errors?.email} />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="app-label">
                Password
              </label>
              <div className="text-sm">
                <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </span>
              </div>
            </div>
            <div className="mt-2">
              <input
                className="app-input"
                id="password"
                type="password"
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
              />
              <InputError error={errors?.password} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register here
          </span>
        </p>
      </div>
    </div>
  )
}
