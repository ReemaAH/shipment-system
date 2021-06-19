import React, { Component } from 'react';
import $ from 'jquery';
import '../stylesheets/NewShipment.css';
import { Message, Form } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

class NewShipment extends Component {
  constructor(props) {
    super();
    this.state = {
      form_submitted: false,
      pickup_country: "",
      pickup_city: "",
      pickup_district: "",
      pickup_street: "",
      pickup_house: "",
      pickup_customer_fname: "",
      pickup_customer_lname: "",
      pickup_customer_mobile: "",
      pickup_customer_email: "",
      delivery_country: "",
      delivery_city: "",
      delivery_district: "",
      delivery_street: "",
      delivery_house: "",
      delivery_customer_fname: "",
      delivery_customer_lname: "",
      delivery_customer_mobile: "",
      delivery_customer_email: "",
      category: "",
      weight:"",
      selectedFile:" " ,
      selectedFileName: "Choose file...",
    }
  }



  submitShipment = (event) => {
    event.preventDefault();
    var  data = new FormData();
    data.append('pickup_country', this.state.pickup_country)
    data.append('pickup_city', this.state.pickup_city)
    data.append('pickup_district', this.state.pickup_district)
    data.append('pickup_street', this.state.pickup_street)
    data.append('pickup_house',this.state.pickup_house)
    data.append('pickup_customer_fname', this.state.pickup_customer_fname)
    data.append('pickup_customer_lname', this.state.pickup_customer_lname)
    data.append('pickup_customer_mobile', this.state.pickup_customer_mobile)
    data.append('pickup_customer_email',this.state.pickup_customer_email)
    data.append('delivery_country', this.state.delivery_country)
    data.append('delivery_city', this.state.delivery_city)
    data.append('delivery_district', this.state.delivery_district)
    data.append('delivery_street', this.state.delivery_street)
    data.append('delivery_house', this.state.delivery_house)
    data.append('delivery_customer_fname', this.state.delivery_customer_fname)
    data.append('delivery_customer_lname', this.state.delivery_customer_lname)
    data.append('delivery_customer_mobile', this.state.delivery_customer_mobile)
    data.append('delivery_customer_email', this.state.delivery_customer_email)
    data.append('category', this.state.category)
    data.append('weight', this.state.weight)
    data.append('selectedFile', this.state.selectedFile);
   
    $.ajax({
      url: '/shipments', //TODO: update request URL
      type: "POST",
      processData: false,
      contentType: false,
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("add-shipment-form").reset();
        this.setState({ form_submitted: true })
        return;
      },
      error: (error) => {
        alert('Unable to add shipment. Please try your request again')
        return;
      }
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleselectedFile = event => {
    this.setState({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
}

  render() {
    return (
      <>
            {this.state.form_submitted ? 
            <Message className="success-message"
              positive
              header="Your Shipment created successful"
              content="we will come to soon to pick it up! "
            />
           : 
      

      <form  id="add-shipment-form" onSubmit={this.submitShipment}>
      <div>
      <h2> Pickup Address:</h2>
        <div className="add-form">
        <div className="row">
        <div className="form-group col-md-6">
              <label >Country</label>
              <select className="form-control" name="pickup_country" onChange={this.handleChange} >
                <option value="Saudi Arabia">Saudi Arabia </option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Bahrain">Bahrain</option>
                <option value="kuwait">kuwait</option>
                <option value="Oman">Oman</option>
              </select>
              </div>
              <div className="form-group col-md-6">
              <label >City</label>
            <input type="text" className="form-control" name="pickup_city" onChange={this.handleChange} />
            </div>
            </div>
            <div className="row">
            <div className="form-group col-md-6"> 
            <label >District</label>
            <input type="text" className="form-control" name="pickup_district" onChange={this.handleChange} />
            </div>
            <div className="form-group col-md-6"> 
            <label>street</label>
            <input type="text" className="form-control" name="pickup_street" onChange={this.handleChange}/></div>
            </div>

            <div className="form-group">
            <label >House number </label>
            <input type="text" className="form-control" name="pickup_house" onChange={this.handleChange} />
            </div>

            <div className="row">
            <div className="form-group col-md-6"> 
            <label >First name </label>
            <input type="text" className="form-control" name="pickup_customer_fname" onChange={this.handleChange} />
            </div>
            <div className="form-group col-md-6"> 
            <label >Last name </label>
            <input type="text" className="form-control" name="pickup_customer_lname" onChange={this.handleChange} />
            </div>
           </div>

           <div className="row">
            <div className="form-group col-md-6"> 
            <label >Mobile number </label>
            <input type="text" className="form-control" name="pickup_customer_mobile" onChange={this.handleChange} />
            </div>

            <div className="form-group col-md-6"> 
            <label >Email </label>
            <input type="email" className="form-control" placeholder="Email" name="pickup_customer_email" onChange={this.handleChange} />
          
            </div>
            
            </div>
 

            </div>
            </div>

            <div>
      <h2> Delivery Address:</h2>
        <div className="add-form">
        <div className="row">
        <div className="form-group col-md-6">
              <label >Country</label>
              <select className="form-control" name="delivery_country" onChange={this.handleChange} >
              <option value="Saudi Arabia">Saudi Arabia </option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Bahrain">Bahrain</option>
                <option value="kuwait">kuwait</option>
                <option value="Oman">Oman</option>
              </select>
              </div>
              <div className="form-group col-md-6">
              <label >City</label>
            <input type="text" className="form-control" name="delivery_city" onChange={this.handleChange} />
            </div>
            </div>
            <div className="row">
            <div className="form-group col-md-6"> 
            <label >District</label>
            <input type="text" className="form-control" name="delivery_district" onChange={this.handleChange}/>
            </div>
            <div className="form-group col-md-6"> 
            <label >street</label>
            <input type="text" className="form-control"  name="delivery_street" onChange={this.handleChange}/></div>
            </div>

            <div className="form-group">
            <label >House number </label>
            <input type="text" className="form-control" name="delivery_house" onChange={this.handleChange} />
            </div>


            <div className="row">
            <div className="form-group col-md-6"> 
            <label >First name </label>
            <input type="text" className="form-control" name="delivery_customer_fname" onChange={this.handleChange} />
            </div>
            <div className="form-group col-md-6"> 
            <label >Last name </label>
            <input type="text" className="form-control" name="delivery_customer_lname" onChange={this.handleChange} />
            </div>
           </div>

           <div className="row">
            <div className="form-group col-md-6"> 
            <label >Mobile number </label>
            <input type="text" className="form-control" name="delivery_customer_mobile" onChange={this.handleChange} />
            </div>

            <div className="form-group col-md-6"> 
            <label >Email </label>
            <input type="email" className="form-control" placeholder="Email" name="delivery_customer_email" onChange={this.handleChange} />
            </div>
            </div>

            </div>
            </div>


            <h2> Shipment info:</h2>
        <div className="add-form">
        <div className="row">
        <div className="form-group col-md-6">
              <label >Category</label>
              <select className="form-control" name="category" onChange={this.handleChange} >
              <option value="furniture">furniture</option>
              <option value="books">books</option>
              <option value="clothes">clothes </option>
              <option value="Medicines">Medicines</option>
              <option value="Others"></option>
              </select>
              </div>
              <div className="form-group col-md-6">
              <label >Weight</label>
            <input type="text" className="form-control" name="weight" onChange={this.handleChange} />
            </div>
            </div>

        <div className="custom-file">
    <input type="file" className="custom-file-input" name="selectedFile"  onChange={this.handleselectedFile} />
    <label className="custom-file-label" >{this.state.selectedFileName}</label>
    <div className="invalid-feedback">Example invalid custom file feedback</div>
  </div>
  
            </div>
        <div className="submit-button-div">

 
            <button type="submit" className=" submit-button btn btn-primary">Submit</button>
            </div>
            
</form>
  }
      </>
    );
  }
}

export default NewShipment;