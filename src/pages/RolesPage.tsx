import { Role } from '@/types'
import { useState } from 'react'
import { useFindAllRolesQuery } from '@/hooks/useRolesApi'
import RoleForm from '@/components/roles/RoleForm'

export default function RolesPage() {
  const [openSlideOver, toggleSlideOver] = useState(false)
  const [current, setCurrent] = useState<Role | null>(null)

  const {
    data: roles,
    isLoading,
    refetch,
  } = useFindAllRolesQuery({ enabled: true })

  /**
   * Refetch the roles and close the slide over.
   */
  const handleFormSuccess = () => {
    setCurrent(null)
    refetch()
    toggleSlideOver(false)
  }

  /**
   * Opens the slide over with the role data.
   */
  const handleEditClick = (role: Role) => {
    setCurrent(role)
    toggleSlideOver(true)
  }

  /**
   * Clear the current role and close the slide over.
   */
  const handleClose = () => {
    setCurrent(null)
    toggleSlideOver(false)
  }

  return (
    <>
      <main className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="page-title">Roles {isLoading}</h1>
            <p className="section-description">
              List of roles available in the system.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => toggleSlideOver(true)}
            >
              Add role
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root p-4 bg-white border rounded">
          <div className="app-table">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="main">Name</th>
                    <th>Description</th>
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
                  {roles?.map((role: Role) => (
                    <tr key={role.id} className="even:bg-gray-50">
                      <td className="main">{role.name}</td>
                      <td>{role.description}</td>
                      <td className="flex justify-end gap-5">
                        <span
                          className="action-primary"
                          onClick={() => handleEditClick(role)}
                        >
                          Edit
                        </span>
                        <span className="action-danger">Delete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <RoleForm
        open={openSlideOver}
        onClose={handleClose}
        onSuccess={handleFormSuccess}
        instance={current}
      />
    </>
  )
}
