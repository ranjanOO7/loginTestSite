import React, { Component } from "react";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
} from "reactstrap";

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
                    <Form className="mt-5">
                        <FormGroup row>
                            <Label sm={2} className="fs-3">
                                Email:
                            </Label>
                            <Col sm={6}>
                                <Input
                                    bsSize="lg"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={this.state.email}
                                    onChange={(e) => {
                                        this.setState({
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} className="fs-3">
                                Password:
                            </Label>
                            <Col sm={6}>
                                <Input
                                    bsSize="lg"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(e) => {
                                        this.setState({
                                            password: e.target.value,
                                        });
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <ButtonGroup>
                            <Button color="danger" className="me-1">
                                <Link
                                    to="/signUp"
                                    className="text-light text-decoration-none"
                                >
                                    Sign Up
                                </Link>
                            </Button>
                            <Button
                                className="bg-primary"
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.handleSubmit();
                                }}
                            >
                                Submit
                            </Button>
                        </ButtonGroup>
                    </Form>
                )}
            </div>
        );
    }
}
