import { z } from 'zod'
import useZod from '@/hooks/useZod'

export default () => {
  const { requiredError } = useZod()

  /**
   * Zod Schema for the login form.
   */
  const loginSchema = z.object({
    email: z.string().trim().email().min(1, requiredError).max(255),
    password: z.string().trim().min(1, requiredError).max(255),
  })

  return {
    loginSchema,
  }
}
