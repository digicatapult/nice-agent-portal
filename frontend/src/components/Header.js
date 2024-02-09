import React from 'react'
import { AppBar } from '@digicatapult/ui-component-library'

export default function Header({ location }) {
  return (
    <AppBar
      shadow={false}
      theme={{
        primary: '#000',
        accent: '#FFF',
      }}
    >
      <AppBar.Item active={location === '/home'} href="/home">
        HOME
      </AppBar.Item>
      <AppBar.Item active={location === '/issue'} href="/issue">
        ISSUE CREDENTIAL
      </AppBar.Item>
    </AppBar>
  )
}
