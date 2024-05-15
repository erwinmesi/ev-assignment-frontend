import { FormError, Role, User, UserPayload } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import SlideOver from '@/components/forms/SlideOver'
import InputError from '@/components/forms/InputError'

import useAsync from '@/hooks/useAsync'
import useUsersApi from '@/hooks/useUsersApi'
import useUserSchema from '@/hooks/useUserSchema'
import useRoute from '@/hooks/useRoute'
import useZod from '@/hooks/useZod'

interface UserFormProps {
  open: boolean;
  instance: User | null;
  onClose: () => void;
  onSuccess: () => void;
  roles: Role[];
}

type UserFormState = {
  firstname?: string;
  lastname?: string;
  email?: string;
  role_ids?: number[];
};

function UserForm({
  open,
  onClose,
  onSuccess,
  instance,
  roles,
}: UserFormProps) {
  const { userSchema } = useUserSchema()
  const { validateSchema } = useZod()
  const { asyncResolve } = useAsync()
  const { routes } = useRoute()
  const usersApi = useUsersApi()

  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<UserFormState>({})
  const [errors, setErrors] = useState<FormError | null>(null)

  // Set the form values when visibility changes
  useEffect(() => {
    const role_ids = instance?.roles?.map((role) => role.id) || []
    setForm({ ...instance, role_ids } || {})
  }, [open])

  /**
   * Handle the form submission.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setErrors(null)

    // Validate the form
    const validationErrors = validateSchema(userSchema, form)
    if (validationErrors) {
      setLoading(false)
      return setErrors(validationErrors)
    }

    // Trigger the API request
    const request = instance?.id
      ? usersApi.update(instance.id, form as UserPayload)
      : usersApi.create(form as UserPayload)

    const { error }: any = await asyncResolve(request)
    setLoading(false)

    if (error) {
      return setErrors(error?.errors)
    }

    toast(`User ${instance?.id ? 'updated' : 'created'} successfully!`)

    handleSuccess()
  }

  /**
   * Reset the form and call the onSuccess callback.
   */
  const handleSuccess = () => {
    setForm({})
    onSuccess()
  }

  /**
   * Handle the role change event.
   */
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected role id
    const selectedId = +e.currentTarget.value

    // Copy the current role ids
    const role_ids = form.role_ids || []

    // Toggle the role id from the current `role_ids`
    setForm({
      ...form,
      role_ids: role_ids?.includes(selectedId)
        ? role_ids.filter((id) => id !== selectedId)
        : [...role_ids, selectedId],
    })
  }

  return (
    <SlideOver
      title={instance ? 'Update User' : 'Create New User'}
      open={open}
      onClose={onClose}
    >
      <form className="space-y-6" noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname" className="app-label">
            Firstname
          </label>
          <div className="mt-2">
            <input
              id="firstname"
              type="text"
              className="app-input"
              placeholder="Firstname"
              value={form?.firstname || ''}
              onInput={(e) =>
                setForm({ ...form, firstname: e.currentTarget.value })
              }
            />
          </div>
          <InputError error={errors?.firstname} />
        </div>

        <div>
          <label htmlFor="lastname" className="app-label">
            Lastname
          </label>
          <div className="mt-2">
            <input
              className="app-input"
              id="lastname"
              type="text"
              placeholder="Lastname"
              value={form?.lastname || ''}
              onInput={(e) =>
                setForm({ ...form, lastname: e.currentTarget.value })
              }
            />
            <InputError error={errors?.lastname} />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="app-label">
            E-mail address
          </label>
          <div className="mt-2">
            <input
              className="app-input"
              id="email"
              placeholder="E-mail address"
              type="text"
              value={form?.email || ''}
              onInput={(e) =>
                setForm({ ...form, email: e.currentTarget.value })
              }
            />
            <InputError error={errors?.email} />
          </div>
        </div>

        <div>
          <label className="app-label">Roles</label>
          <div className="mt-2 space-y-2">
            {!roles?.length ? (
              <p className="text-sm text-gray-500">
                No roles available.{' '}
                <Link
                  to={routes.roles.path}
                  className="action-primary hover:underline"
                >
                  Add one first.
                </Link>
              </p>
            ) : (
              roles.map((role) => (
                <div
                  className="relative flex items-start"
                  key={`role-${role.id}`}
                >
                  <div className="flex h-6 items-center">
                    <input
                      checked={!!form.role_ids?.includes(role.id)}
                      id={`role-${role.id}`}
                      value={role.id}
                      name="roles"
                      type="checkbox"
                      className="app-checkbox"
                      onChange={handleRoleChange}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor={`role-${role.id}`}
                      className="font-medium text-gray-900"
                    >
                      {role.name}
                    </label>
                    <p className="text-gray-500">{role.description}</p>
                  </div>
                </div>
              ))
            )}
            <InputError error={errors?.role_ids} />
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

export default UserForm
