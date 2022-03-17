import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Details from "./DetailsComponent";
import Home from "./HomeComponent";
import Login from "./LoginComponent";
import SignUp from "./SignUpComponent";

export class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/home" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/signUp" component={SignUp}></Route>
                    <Route path="/userDetails" component={Details}></Route>
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;
