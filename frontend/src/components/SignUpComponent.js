import React, { Component } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    ButtonGroup,
} from "reactstrap";
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
            <Form className="mt-5">
                <FormGroup row>
                    <Label sm={2} className="fs-3">
                        Name:
                    </Label>
                    <Col sm={6}>
                        <Input
                            required
                            bsSize="lg"
                            type="text"
                            placeholder="Enter your Name"
                            value={this.state.name}
                            onChange={(e) => {
                                this.setState({
                                    name: e.target.value,
                                });
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} className="fs-3">
                        Email:
                    </Label>
                    <Col sm={6}>
                        <Input
                            required
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
                            required
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
                            to="/login"
                            className="text-light text-decoration-none"
                        >
                            Login
                        </Link>
                    </Button>
                    <Button
                        color="primary"
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
        );
    }
}
