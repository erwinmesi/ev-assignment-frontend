import { z, ZodIssue, type ZodError } from 'zod'

export default () => {
  /**
   * Translated error message for when a required value is null.
   */
  const requiredError = 'Required'

  /**
   * Translated error message for when an email is invalid.
   */
  const invalidEmailError = 'Invalid email'

  /**
   * Formats the errors from a Zod validation error object.
   */
  const formatErrors = ({ issues }: ZodError<unknown>): any => {
    const formData: Record<string, string> = {}

    /**
     *  line of code should be true if the schema is not an object
     *  This line is completely optional
     */
    if (issues.length === 1 && issues[0].path.length < 1)
      return issues[0].message

    issues.forEach(({ path, message }: ZodIssue) => {
      formData[path.join('-')] = message
    })

    return formData
  }

  /**
   * Validates the given data against the provided schema.
   */
  const validateSchema = (schema: z.ZodObject<any>, data: any) => {
    try {
      schema.parse(data)
    } catch (error: any) {
      return formatErrors(error)
    }

    return null
  }

  return {
    formatErrors,
    requiredError,
    invalidEmailError,
    validateSchema,
  }
}
