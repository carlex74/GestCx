import React from 'react'
import {LoadingContent} from '../styled/nav'

export default function Loading() {
  return (
    <LoadingContent>
        <h1>GestCX</h1> 
        <div className="spinner">
          <div className="outer">
            <div className="inner tl"></div>
            <div className="inner tr"></div>
            <div className="inner br"></div>
            <div className="inner bl"></div>
          </div>
        </div>
        
    </LoadingContent>
  )
}
