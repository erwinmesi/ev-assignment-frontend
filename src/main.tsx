import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import React from 'react'
import ReactDOM from 'react-dom'

import App from '@/App'

import '@/assets/scss/main.scss'

// Initialize the `React-Query` client with `retry` disabled.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false, // Prevents the query from running on component mount.
      retry: false, // Disables the retry on query failure.
      refetchOnWindowFocus: false, // Disables the refetch on window focus.
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
