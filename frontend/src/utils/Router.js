import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { NewHomePage } from '../pages/home'
import { SignUpPage } from '../pages/sign-up'
import { CompleteOnboardingPage } from '../pages/complete-onboarding'
import { SSIProfilePage } from '../pages/ssi-profile'

export const router = createBrowserRouter([
  { path: '*', element: <>hello</> },
  { path: '/home', element: <NewHomePage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/complete-onboarding', element: <CompleteOnboardingPage /> },
  { path: '/ssi-profile', element: <SSIProfilePage /> },
])
