import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            token: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        Axios.post("http://localhost:3001/api/loginUser", {
            email: this.state.email,
            password: this.state.password,
        })
            .then((data) => {
                this.setState({
                    token: data.data.token,
                });
                localStorage.setItem("jwtToken", this.state.token);
                if (this.state.token != null) {
                    <Redirect to="/userDetails" />;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
                {this.state.token ? (
                    <Redirect to="/userDetails" />
                ) : (
                    <form>
                        <label>
                            Email:
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={(e) => {
                                    this.setState({
                                        email: e.target.value,
                                    });
                                }}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={(e) => {
                                    this.setState({
                                        password: e.target.value,
                                    });
                                }}
                            />
                        </label>
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                this.handleSubmit();
                            }}
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        );
    }
}
