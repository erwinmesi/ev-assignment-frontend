import { FormError, Role } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import SlideOver from '@/components/forms/SlideOver'
import InputError from '@/components/forms/InputError'

import useAsync from '@/hooks/useAsync'
import useRolesApi from '@/hooks/useRolesApi'
import useRoleSchema from '@/hooks/useRoleSchema'
import useZod from '@/hooks/useZod'

interface RoleFormProps {
  open: boolean;
  instance: Role | null;
  onClose: () => void;
  onSuccess: () => void;
}

function RoleForm({ open, onClose, onSuccess, instance }: RoleFormProps) {
  const { roleSchema } = useRoleSchema()
  const { validateSchema } = useZod()
  const { asyncResolve } = useAsync()
  const rolesApi = useRolesApi()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<FormError | null>(null)

  // Set the form values when visibility changes
  useEffect(() => {
    setName(instance?.name || '')
    setDescription(instance?.description || '')
  }, [open])

  /**
   * Handle the form submission.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setErrors(null)

    const form = { name, description }

    // Validate the form
    const validationErrors = validateSchema(roleSchema, form)
    if (validationErrors) {
      setLoading(false)
      return setErrors(validationErrors)
    }

    // Trigger the API request
    const request = instance?.id
      ? rolesApi.update(instance.id, form)
      : rolesApi.create(form)

    const { error }: any = await asyncResolve(request)
    setLoading(false)

    if (error) {
      return setErrors(error?.errors)
    }

    toast(`Role ${instance?.id ? 'updated' : 'created'} successfully!`)

    handleSuccess()
  }

  /**
   * Reset the form and call the onSuccess callback.
   */
  const handleSuccess = () => {
    setName('')
    setDescription('')
    onSuccess()
  }

  return (
    <SlideOver
      title={instance ? 'Update Role' : 'Create New Role'}
      open={open}
      onClose={onClose}
    >
      <form className="space-y-6" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="app-label">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              type="text"
              className="app-input"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <InputError error={errors?.name} />
        </div>

        <div>
          <label htmlFor="description" className="app-label">
            Description
          </label>
          <div className="mt-2">
            <input
              className="app-input"
              id="description"
              type="text"
              value={description}
              onInput={(e) => setDescription(e.currentTarget.value)}
            />
            <InputError error={errors?.description} />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </SlideOver>
  )
}

export default RoleForm
