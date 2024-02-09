import React from 'react'
import styled from 'styled-components'

import Spinner from '../../components/Spinner'
import CompanyDetailsForm from './CompanyDetailsForm'
import Summary from './Summary'
import ThankYouPage from './ThankYou'

const Content = styled('Grid')`
  padding: 20px 0px;
`

export default function Issue() {
  const [inputs, setInputs] = React.useState({})
  const [stage, setStage] = React.useState(0)
  const [fetching, isFetching] = React.useState(false)

  React.useEffect(() => {
    new Promise((r) => setTimeout(r, 1000)).then(() => {
      isFetching(false)
    })
  }, [inputs])

  const handleSubmit = (e, isFinal = false) => {
    e.preventDefault()
    isFetching(true)

    if (isFinal) return setStage(0)
    const { checks, ...data } = Object.fromEntries(new FormData(e.target))

    setInputs((prev) => ({
      ...prev,
      ...data,
      checks: checks ? JSON.parse(checks) : undefined,
    }))
    setStage((prev) => prev + 1)
  }
  const handleBackToHomepage = () => {
    window.location.href = `/home`
  }

  const sharedProps = { setStage, inputs, handleSubmit, handleBackToHomepage }
  if (fetching) return <Spinner />

  return (
    <Content>
      {stage === 0 && <CompanyDetailsForm {...sharedProps} />}
      {stage === 1 && <Summary {...sharedProps} />}
      {stage === 2 && <ThankYouPage {...sharedProps} />}
    </Content>
  )
}
