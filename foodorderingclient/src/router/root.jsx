import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const Root = () => {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Root;