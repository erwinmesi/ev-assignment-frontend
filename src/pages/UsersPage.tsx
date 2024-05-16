import { SelectMenuOption, User } from '@/types'
import { toast } from 'react-toastify'
import { useMemo, useState } from 'react'

import UserForm from '@/components/users/UserForm'
import ConfirmDialog from '@/components/forms/ConfirmDialog'
import SelectMenu from '@/components/forms/SelectMenu'

import useUsersApi, { useFindAllUsersQuery } from '@/hooks/useUsersApi'
import { useFindAllRolesQuery } from '@/hooks/useRolesApi'

export default function UsersPage() {
  const usersApi = useUsersApi()

  const [openSlideOver, toggleSlideOver] = useState(false)
  const [current, setCurrent] = useState<User | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const [roleId, setRoleId] = useState<number | null>(null)

  const {
    data: users,
    isLoading,
    refetch,
  } = useFindAllUsersQuery(roleId, { enabled: true })

  const { data: roles } = useFindAllRolesQuery({ enabled: true })

  // Map the roles as SelectMenu options
  const roleOptions: SelectMenuOption[] = useMemo(
    () =>
      roles?.map((role) => ({
        key: role.id.toString(),
        label: role.name,
        description: role.description,
      })) || [],
    [roles]
  )

  /**
   * Refetch the users and close the slide over.
   */
  const handleFormSuccess = () => {
    setCurrent(null)
    refetch()
    toggleSlideOver(false)
  }

  /**
   * Opens the slide over with the user data.
   */
  const handleEditClick = (user: User) => {
    setCurrent(user)
    toggleSlideOver(true)
  }

  /**
   * Clear the current user and close the slide over.
   */
  const handleClose = () => {
    setCurrent(null)
    toggleSlideOver(false)
  }

  /**
   * Opens the slide over with the user data.
   */
  const handleDeleteClick = (user: User) => {
    setCurrent(user)
    setShowConfirm(true)
  }

  /**
   * Delete the selected user.
   */
  const confirmDelete = async () => {
    // Set the confirming state to true
    setConfirming(true)

    // Trigger the delete request
    await usersApi.remove((current as User).id)

    toast(`User deleted successfully!`)

    // Hide the confirm dialog
    setConfirming(false)
    setShowConfirm(false)

    // Reset the current user and refetch the data
    setCurrent(null)
    refetch()
  }

  /**
   * Handle the role selection. Update the roleId state.
   */
  const handeRoleSelect = (option: SelectMenuOption | null) => {
    option?.key ? setRoleId(+option?.key) : setRoleId(null)
  }

  return (
    <>
      <main className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="page-title">Users</h1>
            <p className="section-description">
              Manage the users in your application.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-3">
            <div>
              <SelectMenu
                title="Filter by role"
                onSelect={handeRoleSelect}
                options={roleOptions}
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => toggleSlideOver(true)}
              >
                Add user
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root p-4 bg-white border rounded">
          <div className="app-table">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="main">Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {isLoading && (
                    <tr>
                      <td colSpan={4} className="text-center">
                        Fetching roles...
                      </td>
                    </tr>
                  )}
                  {!isLoading && !users?.length ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users?.map((user: User) => (
                      <tr key={user.id} className="even:bg-gray-50">
                        <td className="main">{user.fullname}</td>
                        <td>
                          <a
                            className="text-indigi-600 hover:underline"
                            href={`mailto:${user.email}`}
                          >
                            {user.email}
                          </a>
                        </td>
                        <td>{user.roles.map(({ name }) => name).join(', ')}</td>
                        <td className="flex justify-end gap-5">
                          <span
                            className="action-primary"
                            onClick={() => handleEditClick(user)}
                          >
                            Edit
                          </span>
                          <span
                            className="action-danger"
                            onClick={() => handleDeleteClick(user)}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <UserForm
        roles={roles || []}
        open={openSlideOver}
        onClose={handleClose}
        onSuccess={handleFormSuccess}
        instance={current}
      />
      <ConfirmDialog
        loading={confirming}
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
