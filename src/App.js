import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import {fetchDailyData,fetchSomeData} from "./Utils/fetchData";
import {Provider} from "react-redux";
import store from './store'
function App() {

  return (
      <div className="App justify-content-center align-items-center align-content-center text-center">
      <Provider store={store}>

      <Home/>

      </Provider>
      </div>
  );
}

export default App;
