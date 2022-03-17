import React, { useState, useEffect } from "react";
import Axios from "axios";

const Details = () => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        setToken({
            token: token,
        });

        fetchDetails();
    }, []);

    const fetchDetails = () => {
        Axios.post("http://localhost:3001/getDetails", {
            header: new Headers({ Authorisation: "Bearer " + token }),
        })
            .then((res) => {
                return res.json();
            })
            .then((user) => {
                console.log(user);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return <div>Details</div>;
};

export default Details;
