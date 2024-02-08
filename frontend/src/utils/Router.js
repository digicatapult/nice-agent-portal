import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import CompleteOnboardingPage from '../pages/CompleteOnboarding'
import SignUpPage from '../pages/SignUp'
import SSIProfilePagePage from '../pages/SSIProfile'
import NewHomePage from '../pages/Home'

export const router = createBrowserRouter([
  { path: '*', element: <NewHomePage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/complete-onboarding', element: <CompleteOnboardingPage /> },
  { path: '/ssi-profile', element: <SSIProfilePagePage /> },
])
