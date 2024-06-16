import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import Auth from "../components/Auth/Auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {

    const { token } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/account/login')  
        }
    }, [token, navigate])

    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Auth />
            <ToastContainer position="top-right" autoClose={2000}/>
        </>
    )
}

export default Root;