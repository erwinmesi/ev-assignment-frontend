import { z } from 'zod'
import useZod from '@/hooks/useZod'

export default () => {
  const { requiredError } = useZod()

  /**
   * Zod Schema for the role form.
   */
  const roleSchema = z.object({
    name: z.string().trim().min(1, requiredError).max(255),
    description: z.string().trim().min(1, requiredError).max(255),
  })

  return {
    roleSchema,
  }
}
