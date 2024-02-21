import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import CompleteOnboardingPage from '../pages/CompleteOnboarding'
import SSIProfilePagePage from '../pages/SSIProfile'
import NewHomePage from '../pages/Home'
import Issue from '../pages/Issue'
import InviteCompany from '../pages/Invite/AddCompany'
import InviteThemToNice from '../pages/Invite/InviteThemToNice'
import ScanTheirNiceId from '../pages/Invite/ScanTheirNiceId'
import ShareNiceId from '../pages/Invite/ShareNiceId'
import ViewConnections from '../pages/View/ViewConnections'

export const router = createBrowserRouter([
  { path: '*', element: <NewHomePage /> },
  { path: '/sign-up', element: <Issue /> },
  { path: '/complete-onboarding', element: <CompleteOnboardingPage /> },
  {
    path: '/ssi-profile',
    element: <SSIProfilePagePage />,
  },

  { path: '/ssi-profile/add', element: <InviteCompany /> },
  { path: '/ssi-profile/add/invite-to-nice', element: <InviteThemToNice /> },
  { path: '/ssi-profile/add/scan-nice-id', element: <ScanTheirNiceId /> },
  { path: '/ssi-profile/add/share-nice-id', element: <ShareNiceId /> },
  { path: '/ssi-profile/view-connections', element: <ViewConnections /> },
])
