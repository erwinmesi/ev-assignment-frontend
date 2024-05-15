import { User } from '@/types'
import { create } from 'zustand'

interface UserStore {
  authUser: User | null;
  authenticated: boolean;
}

const useUserStore = create<UserStore>(() => ({
  authUser: null,
  authenticated: false,
}))

export default useUserStore
