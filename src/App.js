import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.component';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <>
      <BrowserRouter>
      <Header/>
        <Routes>
          {/* <Route path="/" element={<Home/>}/>
          <Route path="tasks" element={<Tasks/>}/> */}
        </Routes>
      </BrowserRouter>
      </>
    );
  }
  
}

export default App;
