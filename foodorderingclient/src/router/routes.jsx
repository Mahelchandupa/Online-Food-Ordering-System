import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "../pages/Home/Home";
import Restaurant from "../pages/Restaurant/Restaurant";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";
import Orders from "../pages/Profile/Orders"
import Favorites from '../pages/Profile/Favorites'
import Address from '../pages/Profile/Address'
import Events from '../pages/Profile/Events'
import UserProfile from '../pages/Profile/UserProfile'
import Auth from "../components/Auth/Auth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/account/*',
                element: <Auth />
            },
            {
                path: '/restaurant/:restaurantId',
                element: <Restaurant />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/profile',
                element: <Profile />,
                children: [
                    {
                        path: '/profile',
                        element: <UserProfile />
                    },
                    {
                        path: '/profile/orders',
                        element: <Orders />
                    },
                    {
                        path: '/profile/favorites',
                        element: <Favorites />
                    },
                    {
                        path: '/profile/address',
                        element: <Address />

                    },
                    {
                        path: '/profile/payment',                     
                    },
                    {
                        path: '/profile/notification',
                    },
                    {
                        path: '/profile/events',
                        element: <Events />
                    }
                ]
            }
        ]
    }
])

export default router