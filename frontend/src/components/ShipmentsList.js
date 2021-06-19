import React, { Component } from 'react';
import $, { event } from 'jquery';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/ShipmentsList.css';
import generatePDFLebel from "./generatePDFLebel";
import generatePDFLabels from "./generatePDFLebels";


class ShipmentsList extends Component {
  constructor(props) {
    super();
    this.state = {
      shipments: {}

    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: `/shipments`,
      type: "GET",
      success: (result) => {
        this.setState({ shipments: result.shipments })

        return;
      },
      error: (error) => {
        alert('Unable to load shipments. Please try your request again')
        return;
      }
    })
  }




  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClick = (event) => {
    const elemnt_name = event.target.name
    if (elemnt_name === "all-print-button") {
      generatePDFLabels(this.state.shipments)

    }
    else {
      console.log('clciked ', event.target.id)
      const id = event.target.id
      const shipment = {
        "number": this.state.shipments[id].number,
        "category": this.state.shipments[id].type,
        "weight": this.state.shipments[id].weight,
        "shipping_date": this.state.shipments[id].shipping_date,
        "receiver": this.state.shipments[id].receiver,
        "status": this.state.shipments[id].status,
      }
      generatePDFLebel(shipment)

    }
  }

  render() {
    return (
      <div >

        <div className="shipment-info" >
          <button className=" btn btn-primary all-button" name="all-print-button" onClick={this.handleClick} >
            Print all shippment labels
                              </button>


        </div>

        {Object.keys(this.state.shipments).map(id => {
          return (

            <div className="shipment-info" key={id} value={id}>
              <Card>
                <Card.Header as="h5">{this.state.shipments[id].number}</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <span style={{ fontWeight: "bold" }}> Category:  </span>
                    {this.state.shipments[id].type}

                  </Card.Text>
                  <Card.Text>
                    <span style={{ fontWeight: "bold" }}> Weight: </span>
                    {this.state.shipments[id].weight} KG

                            </Card.Text>
                  <Card.Text>
                    <span style={{ fontWeight: "bold" }}> Shipping date: </span>
                    {this.state.shipments[id].shipping_date}

                  </Card.Text>

                  <Card.Text>
                    <span style={{ fontWeight: "bold" }}> Sent to: </span>
                    {this.state.shipments[id].receiver}

                  </Card.Text>

                  <Card.Text>
                    <span style={{ fontWeight: "bold" }}> Status: </span>
                    {this.state.shipments[id].status}

                  </Card.Text>
                  <button className="btn btn-primary" name="print-button" id={id} onClick={this.handleClick} >
                    Print Shipping Label
                              </button>

                </Card.Body>
              </Card>
            </div>


          )
        })}

      </div>
    );
  }
}

export default ShipmentsList;
