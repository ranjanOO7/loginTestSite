import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import LoadingScreen from "react-loading-screen";

const Home = () => {
    const [token, setToken] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        setToken({
            token: token,
        });
        setLoading({
            isLoading: false,
        });
    }, []);

    return (
        <div>
            {/* {isLoading ? (
                <>
                    <LoadingScreen
                        loading={true}
                        bgColor="#f1f1f1"
                        spinnerColor="#9ee5f8"
                        textColor="#676767"
                        // logoSrc="/logo.png"
                        text="Loading"
                    />
                </>
            ) : ( */}
            <>
                {token ? (
                    <Redirect to="/login"></Redirect>
                ) : (
                    <Redirect to="/userDetails"></Redirect>
                )}
            </>
        </div>
    );
};

export default Home;
