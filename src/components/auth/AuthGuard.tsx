import { FC, ComponentType } from 'react'

import useUserStore from '@/stores/user'
import useAuth from '@/hooks/useAuth'
import useRoute from '@/hooks/useRoute'

interface AuthGuardProps {
  component: ComponentType;
}

const AuthGuard: FC<AuthGuardProps> = ({ component: Component }) => {
  const { clearAccessToken } = useAuth()
  const { routes } = useRoute()
  const userStore = useUserStore()

  if (!userStore.authenticated) {
    clearAccessToken()

    location.href = routes.login.path

    return null
  }

  return <Component />
}

export default AuthGuard
