import React, { Component } from 'react'
import $, { event } from 'jquery';
import '../stylesheets/TrackShipment.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'

class TrackShipment extends Component {
    constructor(props) {
        super();
        this.state = {
            query: '',
            shipments: {},
            totalShipments: 0,

        }
    }

    getInfo = (event) => {
        event.preventDefault();
        this.submitSearch(this.state.query)
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }

    submitSearch = (searchTerm) => {
        console.log('here', searchTerm)

        $.ajax({
            url: `shipments/tracking/search`,
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ number: searchTerm }),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: (result) => {
                console.log('success', result.shipments )

                this.setState({
                    shipments: result.shipments,
                    totalShipments: result.total_shipments
                })
                return;
            },
            error: (error) => {
                this.setState({
                    totalShipments: 0
                })


                return;
            }
        })
    }

    render() {
        return (
            <div className="search-form">

                <form onSubmit={this.getInfo}>
                    <label>
                        Enter Shipment Number:
                        </label>
                    <input className="form-control serach-input"
                        placeholder="Search for a shipment..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                    <input hidden type="submit" value="Submit" className="button" />
                </form>


                <div className="serach-results">
                    {Object.keys(this.state.shipments).map(id => {
                        return (



                            <div className="shipment-info" key={id} value={id}>
                                <Card>
                                    <Card.Header as="h5">{this.state.shipments[id].number}</Card.Header>
                                    <Card.Body>

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


                                    </Card.Body>
                                </Card>
                            </div>




                        )
                    })}

                </div>



            </div>
        );
    }
}

export default TrackShipment