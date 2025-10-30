import React from 'react'
import Login from '../../components/Login.jsx'

export default function LoginPage({ setCurrentUser, setIsAdmin }) {
  return (
    <Login setCurrentUser={setCurrentUser} setIsAdmin={setIsAdmin} />
  )
}
