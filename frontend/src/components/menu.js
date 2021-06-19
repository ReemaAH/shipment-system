import React, { Component } from 'react';

import '../stylesheets/App.css';
import MenuCard from './MenuCard'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import ShipmentsList from './ShipmentsList';
import NewShipment from './NewShipment';
import TrackShipment from './TrackShipment';


const Menu = () => {
  return (
    <BrowserRouter>

    <ul >
       <li>
       <Link to="/ShipmentsList"> 
   <MenuCard image='/folder.png' title='Shipment List'/>
   </Link>
   </li>
    <li>
    <Link to="/NewShipment">
    <MenuCard image='/box.png' title='Create a shipment' />
    </Link>
   </li>

   <li>
   <Link to="/TrackShipment">
   <MenuCard image='/tracking.png' title='Track Your Shipment'/>
   </Link>    
   </li>
  
    </ul>
    
      </BrowserRouter>
 
  );
}


export default Menu

  // componentDidMount() {
  //   this.getQuestions();
  // }

  // getQuestions = () => {
  //   $.ajax({
  //     url: `/questions?page=${this.state.page}`, //TODO: update request URL
  //     type: "GET",
  //     success: (result) => {
  //       this.setState({
  //         questions: result.questions,
  //         totalQuestions: result.total_questions,
  //         categories: result.categories,
  //         currentCategory: result.current_category })
  //       return;
  //     },
  //     error: (error) => {
  //       alert('Unable to load questions. Please try your request again')
  //       return;
  //     }
  //   })
  // }

  // selectPage(num) {
  //   this.setState({page: num}, () => this.getQuestions());
  // }

  // createPagination(){
  //   let pageNumbers = [];
  //   let maxPage = Math.ceil(this.state.totalQuestions / 10)
  //   for (let i = 1; i <= maxPage; i++) {
  //     pageNumbers.push(
  //       <span
  //         key={i}
  //         className={`page-num ${i === this.state.page ? 'active' : ''}`}
  //         onClick={() => {this.selectPage(i)}}>{i}
  //       </span>)
  //   }
  //   return pageNumbers;
  // }

  // getByCategory= (id) => {
  //   $.ajax({
  //     url: `/categories/${id}/questions`, //TODO: update request URL
  //     type: "GET",
  //     success: (result) => {
  //       this.setState({
  //         questions: result.questions,
  //         totalQuestions: result.total_questions,
  //         currentCategory: result.current_category })
  //       return;
  //     },
  //     error: (error) => {
  //       alert('Unable to load questions. Please try your request again')
  //       return;
  //     }
  //   })
  // }

  // submitSearch = (searchTerm) => {
  //   $.ajax({
  //     url: `/questions/search`, //: update request URL
  //     type: "POST",
  //     dataType: 'json',
  //     contentType: 'application/json',
  //     data: JSON.stringify({searchTerm: searchTerm}),
  //     xhrFields: {
  //       withCredentials: true
  //     },
  //     crossDomain: true,
  //     success: (result) => {
  //       this.setState({
  //         questions: result.questions,
  //         totalQuestions: result.total_questions,
  //         currentCategory: result.current_category })
  //       return;
  //     },
  //     error: (error) => {
  //       alert('Unable to load questions. Please try your request again')
  //       return;
  //     }
  //   })
  // }

  // questionAction = (id) => (action) => {
  //   if(action === 'DELETE') {
  //     if(window.confirm('are you sure you want to delete the question?')) {
  //       $.ajax({
  //         url: `/questions/${id}`, //TODO: update request URL
  //         type: "DELETE",
  //         success: (result) => {
  //           this.getQuestions();
  //         },
  //         error: (error) => {
  //           alert('Unable to load questions. Please try your request again')
  //           return;
  //         }
  //       })
  //     }
  //   }
  // }

