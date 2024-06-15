import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Auth from "../components/Auth/Auth";

const Root = () => {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Auth />
        </>
    )
}

export default Root;