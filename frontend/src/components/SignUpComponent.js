import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        Axios.post("http://localhost:3001/api/addUser", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        })
            .then((data) => {
                console.log(data);
                if (data.statusText === "Ok") {
                    <Redirect to="/login" />;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    render() {
        return (
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        placeholder="Enter your Name"
                        value={this.state.name}
                        onChange={(e) => {
                            this.setState({
                                name: e.target.value,
                            });
                        }}
                    />
                </label>
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
        );
    }
}
