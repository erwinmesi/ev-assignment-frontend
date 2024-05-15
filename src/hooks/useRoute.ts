import { HeroIcon } from '@/types'
import { LockClosedIcon, UsersIcon } from '@heroicons/react/24/solid'

export interface Route {
  name: string;
  label: string;
  path: string;

  // Function to generate the path based on params
  makePath?: (...params: any) => string;

  icon?: HeroIcon;
}

type RouteKeys = 'login' | 'users' | 'roles';

const routes: Record<RouteKeys, Route> = {
  login: {
    name: 'auth.login',
    label: 'Login',
    path: '/login',
  },

  users: {
    name: 'users.index',
    label: 'Users',
    path: '/',
    icon: UsersIcon,
  },

  roles: {
    name: 'roles.index',
    label: 'Roles',
    path: '/roles',
    icon: LockClosedIcon,
  },
}

const useRoute = () => {
  return {
    routes,
  }
}

export default useRoute
