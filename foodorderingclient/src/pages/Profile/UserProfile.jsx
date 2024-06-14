import { AccountCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

function UserProfile() {

  const handleLogout = () => {

  }

  return (
    <div className=' min-h-[80vh] flex flex-col justify-center items-center'>
      <div className=' flex flex-col items-center justify-center'>
          <AccountCircle sx={{ fontSize: '9rem'}}/>
          <h1 className=' py-5 text-2xl font-semibold'>Mahel Chandupa</h1>
          <p>Emaill: mahelchandupa@gmail.com</p>
          <Button variant='contained' sx={{ margin: "2rem 0rem", backgroundColor: "red", color: 'white', outline: 'none', border: 'none' }} onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}

export default UserProfile