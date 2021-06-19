
# ----------------------------------------------------------------------------#
# Models section
# ----------------------------------------------------------------------------#

from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from flask_migrate import Migrate

database_name = "shipment"
database_path = "postgres://{}/{}".format('localhost:5432', database_name)

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    migrate = Migrate(app, db)
    db.app = app
    db.init_app(app)
    db.create_all()

def db_drop_and_create_all():
    db.drop_all()
    db.create_all()


'''
Customer model
to store shipment's sender andreceiver
'''
class Customer(db.Model): 
    __tablename__ = 'Customer' 

    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    mobile_number = Column(String)
    email = Column(String)


    def __init__(self, first_name, last_name, mobile_number, email):
        self.first_name = first_name
        self.last_name= last_name
        self.mobile_number = mobile_number
        self.email = email
  
    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'first_name': self.first_name,
        'last_name': self.last_name,
        'mobile_number': self.mobile_number,
        'sent_shipments': self.sent_shipments,
        'received_shipments': self.received_shipments,
        'address': self.address,
        }


'''
Shipment model
to store shipment information
'''
class Shipment(db.Model):
    __tablename__ = 'Shipment'   
  
    id = Column(Integer, primary_key=True)
    number = Column(String)
    weight = Column(Float)
    type = Column(String)
    document_url = Column(String, nullable=True)
    sender_id = Column(db.Integer, db.ForeignKey('Customer.id', ondelete='CASCADE'))
    receiver_id = Column(db.Integer, db.ForeignKey('Customer.id', ondelete='CASCADE'))
    tracking = db.relationship('Status', backref='shipment')
    shipping_date = Column(DateTime)
    receiving_date = Column(DateTime, nullable=True)
    status_updated = Column(Boolean, unique=False, default=False)


    def __init__(self, number, weight, type, document_url, sender_id, receiver_id ):
        self.number = number
        self.weight = weight
        self.type= type
        self.document_url = document_url
        self.sender_id = sender_id
        self.receiver_id = receiver_id

    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'number': self.number,
        'weight': self.weight,
        'type': self.type,
        'document_url': self.document_url,
        'shipping_date': self.shipping_date,
        'sender_id': self.sender_id,
        
        }



'''
Address model
to store customer address data.
'''
class Address(db.Model):
    id = Column(Integer, primary_key=True)
    country = Column(String)
    city = Column(String)
    district  = Column(String)
    street = Column(String)
    house_number = Column(String)
    customer_id = Column(db.Integer, db.ForeignKey('Customer.id', ondelete='CASCADE'))

    def __init__(self, city, district, street,
                 house_number, customer_id, country):

        self.country = country
        self.city = city
        self.district= district
        self.street = street
        self.house_number = house_number
        self.customer_id = customer_id


    def insert(self):
        db.session.add(self)
        db.session.commit()
  
    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'city': self.city,
        'district': self.district,
        'street': self.street,
        'house_number': self.house_number,
        'customer_id': self.customer_id,
        }


'''
Status Model
Because the shipment will have diffrent status at different times.
I created a seprate model for it.
'''
class Status(db.Model):  
    id = Column(Integer, primary_key=True)
    status = Column(String)
    date  = Column(DateTime)
    shipment_id = Column(db.Integer, db.ForeignKey('Shipment.id', ondelete='CASCADE'))

    def __init__(self,  status, date, shipment_id):
        self.status = status
        self.date = date
        self.shipment_id = shipment_id

    def insert(self):
        db.session.add(self)
        db.session.commit()
  
    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'status': self.status,
        'date': self.date,
        'shipment_id': self.shipment_id,
        }

