import { z } from 'zod'
import useZod from '@/hooks/useZod'

export default () => {
  const { requiredError, nonEmptyListError } = useZod()

  /**
   * Zod Schema for the user form.
   */
  const userSchema = z.object({
    firstname: z.string().trim().min(1, requiredError).max(255),
    lastname: z.string().trim().min(1, requiredError).max(255),
    email: z.string().trim().email().min(1, requiredError).max(255),
    role_ids: z.array(z.number()).nonempty(nonEmptyListError),
  })

  return {
    userSchema,
  }
}
