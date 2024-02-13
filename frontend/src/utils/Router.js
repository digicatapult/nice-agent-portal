import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import CompleteOnboardingPage from '../pages/CompleteOnboarding'
import SSIProfilePagePage from '../pages/SSIProfile'
import NewHomePage from '../pages/Home'
import Issue from '../pages/Issue'

export const router = createBrowserRouter([
  { path: '*', element: <NewHomePage /> },
  { path: '/sign-up', element: <Issue /> },
  { path: '/complete-onboarding', element: <CompleteOnboardingPage /> },
  { path: '/ssi-profile', element: <SSIProfilePagePage /> },
])
