import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthGuard from '@/components/auth/AuthGuard'

import AppLayout from '@/components/layout/AppLayout'
import useRoute from '@/hooks/useRoute'

import LoginPage from '@/pages/LoginPage'
import UsersPage from '@/pages/UsersPage'
import RolesPage from '@/pages/RolesPage'

const AppRoutes = () => {
  const { routes } = useRoute()
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path={routes.login.path} element={<LoginPage />} />

          <Route element={<AuthGuard component={AppLayout} />}>
            <Route path={routes.users.path} element={<UsersPage />} />
            <Route path={routes.roles.path} element={<RolesPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
