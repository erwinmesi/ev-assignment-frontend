interface InputErrorProps {
  error?: string | undefined;
}

/**
 * Component for displaying input errors.
 */
function InputError({ error }: InputErrorProps) {
  return error ? (
    <small className="text-red-500">{error}</small>
  ) : null
}

export default InputError
