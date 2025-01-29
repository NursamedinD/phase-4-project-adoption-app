from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class Parent (db.Model, SerializerMixin):
    __tablename__ = 'parents'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    children = db.relationship('ChildParents', back_populates='parent')

class Child (db.Model, SerializerMixin):
    __tablename__ = 'children'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    added_by = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable=False)

    parents = db.relationship('ChildParents', back_populates='child')

class ChildParents(db.Model, SerializerMixin):
    __tablename__= 'child_parents'
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'), nullable=False)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable=False)
    adoption_date = db.Column(db.Date, nullable=False)

    parent = db.relationship('Parent', back_populates='adoptions')
    child = db.relationship('Child', back_populates='adoptions')