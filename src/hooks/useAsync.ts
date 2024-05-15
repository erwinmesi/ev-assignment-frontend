import { to } from 'await-to-js'
import { AxiosError, type AxiosResponse } from 'axios'

const useAsync = () => {
  /**
   * Resolves a promise asynchronously and returns the error and response.
   * If the promise throws an AxiosError, the error will be set to the response data.
   *
   * @param request - The promise to resolve.
   * @returns An object containing the error and response.
   */
  const asyncResolve = async (request: Promise<AxiosResponse>) => {
    // eslint-disable-next-line prefer-const
    let [error, response] = await to(request)

    if (error instanceof AxiosError) {
      error = error?.response?.data
    }

    return {
      error,
      response,
    }
  }

  return {
    asyncResolve,
  }
}

export default useAsync
