
from flask import Flask,  session, redirect, jsonify
from flask import Flask, request, jsonify, abort
from sqlalchemy import exc
from datetime import datetime
import uuid 
import os
from os import environ as env
from flask_cors import CORS, cross_origin
from models import *

from authlib.integrations.flask_client import OAuth

from six.moves.urllib.parse import urlencode

from werkzeug.utils import secure_filename
import logging

from functools import wraps


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')   

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


cors = CORS(app, resources={'/': {'origins': '*'}})
setup_db(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin','*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods',
                         'POST,GET,PUT,DELETE,PATCH,OPTIONS')
    return response

    

@app.route('/callback')
def callback_handling():
    # Handles response from token endpoint
    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    # Store the user information in flask session.
    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture']
    }
    return redirect('/dashboard')


@app.route('/')
def login():
    return auth0.authorize_redirect(redirect_uri='http://localhost:3000/callback')


def generate_shipment_number():
    return str(uuid.uuid1())[:5]


@app.route('/shipments')
@cross_origin(headers=["Content-Type", "Authorization"])
def get_shipments():
    # list all shipments in DB
    # this endpoint should take user id from the session and bring all his shipments
    # but i faced some issues in auth with auth0 

    shipments = Shipment.query.all()

    if len(shipments) == 0:
        abort(404)
    else:
        shipments = [shipment.format() for shipment in shipments]

        for shipment in shipments:
            name = Customer.query.filter(Customer.id == shipment['sender_id']).first()
            shipment['receiver']= '{} {}'.format(name.first_name, name.last_name)
            status = Status.query.filter(Status.shipment_id == shipment['id']).first()
            shipment['status'] = status.status
        return jsonify({
            'success': True,
            'shipments':shipments 
            }), 200


@app.route("/shipments", methods=['POST'])
# this endpoint to post shipment, sender and receiver information.
def create_shipment():
    ## 1) check if sender customer exist or create a new one 
    pickup_customer_email = request.form['pickup_customer_email']
    if Customer.query.filter_by(email=pickup_customer_email).count() == 0:
        new_customer = Customer(
            first_name = request.form['pickup_customer_fname'],
            last_name = request.form['pickup_customer_lname'],
            email= request.form['pickup_customer_email'],
            mobile_number= request.form['pickup_customer_mobile'])

        new_customer.insert()
    pickup_customer = Customer.query.filter_by(email=pickup_customer_email).first()
    
        
    # 2) create a new pickup address
    pickup_address =  Address(
        country=request.form['pickup_country'],
        city=request.form['pickup_city'],
        district=request.form['pickup_district'],
        street=request.form['pickup_street'],
        customer_id = pickup_customer.id,
        house_number=request.form['pickup_house'])
    pickup_address.insert()

    # 3) check if receiver customer exist or create a new one 
    delivery_customer_email = request.form['delivery_customer_email']
    if Customer.query.filter_by(email=delivery_customer_email).count() == 0:
        new_customer = Customer(
            first_name = request.form['delivery_customer_fname'],
            last_name = request.form['delivery_customer_lname'],
            email=request.form['delivery_customer_email'],
            mobile_number=request.form['delivery_customer_mobile'])

        new_customer.insert()
    delivery_customer = Customer.query.filter_by(email=delivery_customer_email).first()


    # 4) create new delivery address
    delivery_address =  Address(
        country=request.form['delivery_country'],
        city=request.form['delivery_city'],
        district=request.form['delivery_district'],
        street=request.form['delivery_street'],
        customer_id = delivery_customer.id,
        house_number=request.form['delivery_house'])
    delivery_address.insert()

    # 5) create shipment obj 
    file = request.files['selectedFile']
    filename = secure_filename(file.filename)
  
    # create a directory if not exist for uploaded documents
    if not os.path.isdir(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)
    logger.info("upload folder is there ")
    file_url="/".join([UPLOAD_FOLDER, filename])
    file.save(file_url)


    new_shipment = Shipment(
        type=request.form['category'],
        weight=request.form['weight'],
        sender_id= pickup_customer.id,
        number=generate_shipment_number(),
        document_url=file_url,
        receiver_id = delivery_customer.id)
    new_shipment.insert()

    # 6) new status obj
    new_status = Status(
        status="Preparing",
        date=datetime.now(),
        shipment_id=new_shipment.id,
    )
    new_status.insert()


    return jsonify({
        'success': True,
        'created': new_shipment.number
        }), 200


@app.route("/shipments/tracking/search", methods=['POST'])
# search for a shipment by shipment number
def track_shipment():
    if request.get_json()['number']:
        search_term = request.get_json()['number']
        result = Shipment.query.filter(Shipment.number.ilike(f'%{search_term}%')).all()
      # here i checked if there is a result 
        if len(result) != 0:
            print(' there are result')
            shipments = [shipment.format() for shipment in result]
            total_shipments = len(shipments)
            for shipment in shipments:
                name = Customer.query.filter(Customer.id == shipment['sender_id']).first()
                shipment['receiver']= '{} {}'.format(name.first_name, name.last_name)
                status = Status.query.filter(Status.shipment_id == shipment['id']).first()
                shipment['status'] = status.status
            print(total_shipments)
            return jsonify({
                'success': True,
                'shipments': shipments,
                'total_shipments': total_shipments,
              }), 200
        else:
            return jsonify({
                'success': True,
                'shipments': [],
                'total_shipments': 0,
              }) , 200


@app.route('/')
def hello():
    return "Hello World!"


# Default port:
if __name__ == '__main__':
    app.debug = True
    app.run()

