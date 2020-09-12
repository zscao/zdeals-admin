// ref https://codepen.io/snak3/pen/QOOqGW

import React from 'react'
import './LoadingBar.scss'

export default function LoadingBar({loading}) {
  return (
    <div className="loader">
      {loading && <div className="loaderBar"></div>} 
    </div>
  )
}