
import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/menu.css';



const MenuCard = ({image, title}) => {
    return (
 
        <div>
            <Card className="cards-menu" style={{ width: '18rem' }}>
          
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                   
                        <div>
                    <img className="card-menu-image" src={image} />
                    </div>
                   
                </Card.Body>
           
            </Card>
        </div>

    )
}


export default MenuCard

