import { useQuery } from '@tanstack/react-query'
import { Role } from '@/types'
import useAxios from '@/hooks/useAxios'

const ENDPOINT = '/api/roles'

type RolePayload = {
  name: string;
  description: string;
};

export default function useRolesApi() {
  const { api } = useAxios()

  /**
   * Fetch all roles.
   */
  const findAll = async () => api.get(`${ENDPOINT}`)

  /**
   * Create a new role.
   */
  const create = async (role: RolePayload) => api.post(`${ENDPOINT}`, role)

  /**
   * Update an existing role.
   */
  const update = async (id: number, role: RolePayload) =>
    api.put(`${ENDPOINT}/${id}`, role)

  return {
    create,
    update,
    findAll,
  }
}

/**
 * React Query hook to trigger `findAll`
 */
export const useFindAllRolesQuery = (options: any = {}) => {
  const { findAll } = useRolesApi()

  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: () => findAll().then(({ data }) => data),
    ...options,
  })
}
