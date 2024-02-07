import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import CompleteOnboardingPage from '../pages/complete-onboarding'
import SignUpPage from '../pages/sign-up'
import SSIProfilePagePage from '../pages/ssi-profile'
import NewHomePage from '../pages/home'

export const router = createBrowserRouter([
  { path: '*', element: <>hello</> },
  { path: '/home', element: <NewHomePage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/complete-onboarding', element: <CompleteOnboardingPage /> },
  { path: '/ssi-profile', element: <SSIProfilePagePage /> },
])
