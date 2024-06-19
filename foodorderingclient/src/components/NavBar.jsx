import { useThemeContext } from '../Theme/ThemeContext'
import { useTheme } from '@mui/material/styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../redux/slices/authSlice';

const NavBar = () => {

  const { token, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (!token && !user) {
      navigate('/account/login')
    } else {
      dispatch(userProfile())
    }
  }, [])

  return (
    <div className={` w-full h-[80px] lg:px-16 flex sticky top-0 z-50 left-0 justify-between items-center shadow-md px-5`}
      style={{ backgroundColor: theme.palette.background.nav }}
    >
      <div onClick={() => navigate("/")} className='flex justify-center lg:gap-3 gap-1 cursor-pointer'>
        <FastfoodIcon sx={{ color: theme.palette.primary.main, fontSize: '2.3rem' }} />
        <h1 className=' font-dancing text-4xl'>Foody</h1>
      </div>
      <div className=' flex items-center lg:gap-12 gap-3'>
        <div className=' lg:hidden cursor-pointer' onClick={() => setShowSearch(!showSearch)}>
          <SearchIcon sx={{ fontSize: '2.0rem'}} />
        </div>
        <div className=' lg:w-[700px] h-10 rounded-full border-b-[2px] md:hidden sm:hidden lg:block hidden' style={{ borderColor: theme.palette.primary.main }}>
          <input className=' w-full h-full rounded-full px-6 border-none' type="text" name="search" placeholder='search .........'/>
        </div>
        <div onClick={() => navigate("/cart")} className=' relative cursor-pointer'>
          <LocalMallIcon sx={{ fontSize: '2.0rem'}} />
          <div className=' w-[25px] h-[25px] rounded-full absolute -top-[7px] -right-[12px] flex items-center justify-center' style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.default }}>
            <span>1</span>
          </div>
        </div>
        <IconButton onClick={toggleTheme} >
          {
            mode === "dark" ? <LightModeIcon sx={{ fontSize: '2.0rem'}} /> : <DarkModeIcon sx={{ fontSize: '2.0rem', color: theme.palette.primary.icon }} />
          }
        </IconButton>
        { user ?
          <Avatar onClick={() => navigate("/profile")} sx={{ backgroundColor: theme.palette.primary.main, cursor: 'pointer' }}>{user?.fullName?.charAt(0).toUpperCase()}</Avatar> :
          <IconButton>
            <AccountCircleIcon onClick={() => navigate("/account/login")}  sx={{ fontSize: '3.0rem', color: theme.palette.primary.main, cursor: 'pointer' }} />
          </IconButton>  
        }
      </div>

      {/* mobile search */}
      <div className={`lg:hidden w-full h-full fixed top-0 left-0 justify-center items-center transition-transform duration-500 ${showSearch ? 'opacity-100 transform translate-y-0 flex' : 'opacity-0 transform -translate-y-full'}`}
        style={{ backgroundColor: theme.palette.background.nav, opacity: 1, zIndex: 2000 }}
      >        <input className='w-[80%] h-[50px] rounded-full px-6 border-[1px]' style={{ zIndex: 3001, color: "#000", borderColor: theme.palette.secondary.main }} type="text" name="search" placeholder='search .........' />
        <CloseIcon className=' absolute top-6 right-6 cursor-pointer' sx={{ fontSize: '2.5rem' }} onClick={() => setShowSearch(!showSearch)} />
      </div>
    </div>
  )
}

export default NavBar