import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Home from "../pages/Home/Home";
import Restaurant from "../pages/Restaurant/Restaurant";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";

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
                        path: '/orders',
                    },
                    {
                        path: '/favorites'
                    },
                    {
                        path: '/address'
                    },
                    {
                        path: '/payment'
                    },
                    {
                        path: '/notification'
                    },
                    {
                        path: '/event'
                    }
                ]
            }
        ]
    }
])

export default router