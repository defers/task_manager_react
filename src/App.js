import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.component";
import React from "react";
import Home from "./components/Home/Home.component.jsx";
import Tasks from "./components/Tasks/Tasks.component";
import LoginPage from "./components/LoginPage/LoginPage.component";
import PrivateRoute from "./authentification/ProtectedRoute.component";
import AuthService from "./authentification/ServiceAuth.js";
import EditTaskPage from "./components/EditTaskPage/EditTaskPage.component";
import EditProjectPage from "./components/EditProjectPage/EditProjectPage.component";
import TasksService from "./service/TasksService";
import Projects from "./components/ProjectsPage/Projects.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <PrivateRoute>
                  <Header />
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="tasks"
              exact
              element={
                <PrivateRoute>
                  <Header />
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/task/:id"
              exact
              element={
                <PrivateRoute>
                  <Header />
                  <EditTaskPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects"
              exact
              element={
                <PrivateRoute>
                  <Header/>
                  <Projects/>
                  
                </PrivateRoute>
              }
            />
          
           <Route
              path="/projects/project/:id"
              exact
              element={
                <PrivateRoute>
                  <Header />
                  <EditProjectPage />
                </PrivateRoute>
              }
            />
            
            <Route
              path="users"
              exact
              element={
                <PrivateRoute>
                  <Header />
                  
                </PrivateRoute>
              }
            />
            if ({!this.state.isAuth}){" "}
            {<Route path="login" exact element={<LoginPage />} />}
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
