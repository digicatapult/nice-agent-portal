import React from 'react'
import { SmallThinText } from './shared'

const OwnCredential = ({ title, value }) => {
  return (
    <div style={{ display: 'flex' }}>
      <b style={{ marginRight: '10px' }}>{title}:</b>
      <SmallThinText>{value}</SmallThinText>
    </div>
  )
}
export default OwnCredential
