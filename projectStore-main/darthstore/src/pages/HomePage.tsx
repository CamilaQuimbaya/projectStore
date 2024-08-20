import React from "react";
import MainComponent from "./swapi/Main";
import "../styles/pages/home.css";
import LandingPage from "./LandingPage";
import { useAuthStore } from "../store/auth";



const HomePage: React.FC = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    return (
        <div>
            {isAuth ? <div>
                <h1 className="homeTittle">Admin view</h1>
            </div> : <LandingPage />}
            <h1 className="homeTittle">Welcome</h1>
            <MainComponent />

        </div>
    )
}

export default HomePage;