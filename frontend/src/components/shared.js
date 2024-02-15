import styled from 'styled-components'

export const Button = styled('button')`
  height: 40px;
  border-radius: 8px;
  border: 1px solid #000;
  padding: 0px 15px;
  background: #fff;
  margin-right: 3px;
  box-shadow: 0px 2px 0px 0px #000;
  max-width: 200px;
`

export const Input = styled('input')`
  border-radius: 3px;
  width: 100%;
  height: 3em;
  font-size: 1em;
  margin: 5px 0px 10px 0px;
  text-align: center;
  border: 2px solid var(--black, #000);
  background: var(--white, #fff);
`

export const SmallText = styled.p`
  margin: 0px;
  font-weight: bold;
`
export const HeadingText = styled.h1`
  margin: 10px 0px 50px 0px;
  text-align: center;
`

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Roboto, sans-serif;
`

export const SmallItallicisedText = styled.p`
  margin: 0px;
  padding: 4px;
  font-style: italic;
  font-family: 'Roboto Thin', sans-serif;
  color: black;
  font-size: 14px;
`

export const SmallThinText = styled.p`
  margin: 0px;
  font-weight: regular;
  font-size: 14px;
  font-family: 'Roboto Thin', sans-serif;
  font-weight: normal;
`
export const SmallCenteredThinText = styled.p`
  margin: 0px;
  font-weight: regular;
  font-size: 14px;
  font-family: 'Roboto Thin', sans-serif;
  font-weight: normal;
  text-align: center;
`
