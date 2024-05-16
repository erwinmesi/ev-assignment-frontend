import { useQuery } from '@tanstack/react-query'
import { User, UserPayload } from '@/types'
import useAxios from '@/hooks/useAxios'

const ENDPOINT = '/api/users'

type UserFilterParams = {
  role_id?: number;
};

export default function useUsersApi() {
  const { api } = useAxios()

  /**
   * Find all users.
   */
  const findAll = async (params: UserFilterParams | null) => {
    const config = params ? { params } : {}
    return api.get(`${ENDPOINT}`, config)
  }

  /**
   * Create a new user.
   */
  const create = async (user: UserPayload) => api.post(`${ENDPOINT}`, user)

  /**
   * Update an existing user.
   */
  const update = async (id: number, user: UserPayload) =>
    api.put(`${ENDPOINT}/${id}`, user)

  /**
   * Delete an existing user.
   */
  const remove = async (id: number) => api.delete(`${ENDPOINT}/${id}`)

  return {
    create,
    update,
    findAll,
    remove,
  }
}

export const useFindAllUsersQuery = (
  role_id: number | null,
  options: any = {}
) => {
  const { findAll } = useUsersApi()

  return useQuery<User[]>({
    queryKey: role_id ? ['users', role_id] : ['users'],
    queryFn: () =>
      findAll(role_id ? { role_id } : null).then(({ data }) => data),
    ...options,
  })
}
