import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    Button,
} from "reactstrap";

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
                <Card color="light" className="mt-5 fs-3">
                    <CardBody>
                        <CardTitle>Details</CardTitle>
                        <CardSubtitle>
                            <CardText>Hello {name}</CardText>
                            <CardText>Your email is {email}</CardText>
                            <Button
                                color="danger"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                            >
                                Logout
                            </Button>
                        </CardSubtitle>
                    </CardBody>
                </Card>
            ) : (
                <Redirect to="/home" />
            )}
        </div>
    );
};

export default Details;
