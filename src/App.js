import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.component";
import React from "react";
import Home from "./components/Home/Home.component.jsx";
import Tasks from "./components/Tasks/Tasks.component";
import { getTasks } from "./dao/GetData.js";
import LoginPage from "./components/LoginPage/LoginPage.component";
import PrivateRoute from "./authentification/ProtectedRoute.component";
import { isAuthenticated } from "./authentification/ServiceAuth.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const tasks = getTasks();
    this.setState({ tasks: tasks });

    const isAuth = isAuthenticated();
    this.setState({ isAuth: isAuth });
  }

  render() {
    return (
      <>
        <BrowserRouter>
          
          <Routes>
            {console.log(this.state.isAuth)}
            <Route
              path="/"
              element={
                <PrivateRoute isauth={this.state.isAuth}>
                  <Header />
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="tasks"
              element={
                <PrivateRoute isauth={this.state.isAuth}>
                  <Header />
                  <Tasks tasks={this.state.tasks}/> 
                </PrivateRoute>
              }
            />
            <Route path="login" element={<LoginPage/>} />

          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
