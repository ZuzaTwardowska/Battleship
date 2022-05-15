import React from 'react'
import { css } from '@emotion/react'
import RingLoader from 'react-spinners/RingLoader'

export const LoadingComponent = () => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: rgb(110, 168, 189);
    position: absolute;
    left: 48%;
    top: 40%;
  `

  return (
    <RingLoader color={'rgb(110, 168, 189)'} loading={true} css={override} size={50} />
  )
}
