import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import AccounBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import EventIcon from '@mui/icons-material/Event'
import LogOutIcon from '@mui/icons-material/Logout'
import { Divider, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ProfileNavigation({ open, handleClose }) {

    const theme = useTheme();
    const navigate = useNavigate()
    const location = useLocation();
    const [path, setPath] = useState('')

    const { pathname } = location


    useEffect(() => {
        getPath()
    }, [pathname])

    const getPath = () => {
        const path = pathname.split('/')[2]
        setPath(path)
    }

    console.log(path)

    const menu = [
        {
            title: 'Orders',
            icon: <ShoppingBagIcon />
        },
        {
            title: 'Favorites',
            icon: <FavoriteIcon />
        },
        {
            title: 'Address',
            icon: <HomeIcon />
        },
        {
            title: 'Payments',
            icon: <AccounBalanceWalletIcon />
        },
        {
            title: 'Notification',
            icon: <NotificationsActiveIcon />
        },
        {
            title: 'Events',
            icon: <EventIcon />
        },
        {
            title: 'Logout',
            icon: <LogOutIcon />
        },
    ]

    const isSmallScreen = useMediaQuery("(max-width: 900px)")

    const handleNavigate = (title) => {
        navigate(`/profile/${title.toLowerCase()}`)
    }

    return (
        <div>
            <Drawer open={open} onClose={handleClose} variant={isSmallScreen ? 'temporary' : 'permanent'} anchor='left' sx={{ zIndex: 300}}>
                <div className='w-[50vw] lg:w-[20vw] h-full flex flex-col justify-center text-xl gap-8 pt-16' style={{backgroundColor: theme.palette.background.nav}}>
                    {
                        menu.map((item, index) => (
                            <>
                                <div onClick={() => handleNavigate(item?.title)} className=' px-5 flex items-center space-x-5 cursor-pointer' style={path === item?.title?.toLocaleLowerCase() ? { color: 'orange' } : {}}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>
                                {
                                    index !== menu.length - 1 && <Divider />
                                }
                            </>
                        ))
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default ProfileNavigation