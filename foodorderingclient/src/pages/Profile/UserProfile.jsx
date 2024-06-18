import { AccountCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserProfile() {

  const dispatch = useDispatch()
  const { user, token } = useSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      toast.success("Logged out successfully")
      setTimeout(() => {
        navigate('/account/login'); 
      }, 2000);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className=' min-h-[80vh] flex flex-col justify-center items-center'>
      <div className=' flex flex-col items-center justify-center'>
          <AccountCircle sx={{ fontSize: '9rem'}}/>
          <h1 className=' py-5 text-2xl font-semibold'>{user?.userName}</h1>
          <p>Emaill: {user?.email}</p>
          <Button variant='contained' sx={{ margin: "2rem 0rem", backgroundColor: "red", color: 'white', outline: 'none', border: 'none' }} onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
}

export default UserProfile