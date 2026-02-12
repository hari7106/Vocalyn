'use client'
import React from 'react'
import {useUser} from '../../provider'


function Welcome() {
const {user}= useUser()
  return (
    <div>
        <h2>WELCOME BACK , {user?.name}</h2>
    </div>
  )
}

export default Welcome