import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import ShipmentsList from './components/ShipmentsList';
import NewShipment from './components/NewShipment';
import TrackShipment from './components/TrackShipment';
import Menu from './components/menu';
require('dotenv').config()

ReactDOM.render(

    <BrowserRouter>
        <Auth0ProviderWithHistory>
            <App />


            <Switch>
                <Route exact path='/' component={Menu} />
                <Route exact path='/ShipmentsList' component={ShipmentsList} />
                <Route exact path='/NewShipment' component={NewShipment} />
                <Route exact path='/TrackShipment' component={TrackShipment} />
            </Switch>
        </Auth0ProviderWithHistory>
    
    </BrowserRouter>

    ,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


 //"start": "HOST='127.0.0.1' PORT='5000' react-scripts start",
