import React, { Component } from 'react';

import './stylesheets/App.css';
import Header from './components/Header';
import { useAuth0 } from "@auth0/auth0-react";


const App = () => {
const { isAuthenticated } = useAuth0();

return isAuthenticated ?   <div className="App"><Header/> </div>  :<div className="App"> <Header/> </div>;
};

export default App;


