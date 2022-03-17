import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const Details = () => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setToken({
            token: token,
        });

        fetchDetails(token);
    }, []);

    const fetchDetails = (token) => {
        Axios.post(
            "http://localhost:3001/getDetails",
            {},
            {
                headers: { authorization: `Bearer ${token}` },
            }
        )
            .then((user) => {
                setName(user.data.name);
                setEmail(user.data.email);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        console.log("Local storage cleared");
        setLoggedOut({
            loggedOut: true,
        });
        return;
    };

    return (
        <div>
            {!loggedOut ? (
                <>
                    Details
                    <div>
                        <h1>Hello {name}</h1>
                        <h2>Your email is {email}</h2>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <Redirect to="/home" />
            )}
        </div>
    );
};

export default Details;
