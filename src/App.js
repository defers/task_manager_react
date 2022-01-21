import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.component";
import React from "react";
import Home from "./components/Home/Home.component.jsx";
import Tasks from "./components/Tasks/Tasks.component";
import { getTasks } from "./dao/GetData.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const tasks = getTasks();
    this.setState({ tasks: tasks });
 
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="tasks" element={<Tasks tasks={this.state.tasks}/>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
