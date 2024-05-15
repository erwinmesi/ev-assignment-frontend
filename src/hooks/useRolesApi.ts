import { useQuery } from '@tanstack/react-query'
import { Role } from '@/types'
import useAxios from '@/hooks/useAxios'

const ENDPOINT = '/api/roles'

type CreateRolePayload = {
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
  const create = async (role: CreateRolePayload) =>
    api.post(`${ENDPOINT}`, role)

  return {
    create,
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
