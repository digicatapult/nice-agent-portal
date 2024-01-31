import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from './utils/Router'

export default function App() {
  return <RouterProvider router={router} />
}
