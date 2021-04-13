import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import WebPageLayout from "../components/WebPageLayout";

import Home from "./home";
import SignIn from "./signIn";
import SignUp from "./signUp";
import MyPosts from "./myposts";
import NewPost from "./newpost";
import EditPost from "./editpost";
import Post from "./post";

import ProtectedGeneralRoute from './ProtectedGeneralRoute';
import ProtectedRouteForEdition from './ProtectedRouteForEdition';

const Pages = () => {
  return (
    <Router>
      <WebPageLayout>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/myposts" component={MyPosts} />
        <ProtectedGeneralRoute path="/newpost" component={NewPost} />
        <ProtectedRouteForEdition path="/editpost" component={EditPost} />
        <Route path="/post/:id" component={Post} />
      </WebPageLayout>
    </Router>
  );
};

export default Pages;
