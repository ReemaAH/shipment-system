import React, { Component } from 'react';
import '../stylesheets/Header.css';
import AuthNav from "./auth-nav";

const Header = () => {
  return (
    <div className="App-header">
      <h1 onClick={() => { this.navTo('') }}>Shipment System</h1>
      <AuthNav />

    </div>
  );
};
export default Header;
