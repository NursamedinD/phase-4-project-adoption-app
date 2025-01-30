from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_restful import Api

from models import db, Parent, Child, ChildParents

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app)


@app.route("/parents", methods=["POST"])
def create_parent():
    data = request.get_json()
    new_parent = Parent(
        name=data["name"],
        username=data["username"],
        email=data["email"],
        password=data["password"],
    )
    db.session.add(new_parent)
    db.session.commit()
    return jsonify(new_parent.to_dict()), 201


@app.route("/children", methods=["POST"])
def create_child():
    data = request.get_json()
    new_child = Child(
        name=data["name"], 
        age=data["age"], 
        description=data["description"]
    )
    db.session.add(new_child)
    db.session.commit()
    return jsonify(new_child.to_dict()), 201

@app.route("/adoptions", methods=["POST"])
def create_adoption():
    data = request.get_json()
    new_adoption = ChildParents(
        parent_id=data['parent_id'],
        child_id=data['child_id'],
        adoption_date=data['adoption_date'],
        status=data['status']
    )
    db.session.add(new_adoption)
    db.session.commit()
    return jsonify(new_adoption.to_dict()), 201

@app.route("/adoptions/<int:id>", methods=["DELETE"])
def delete_adoption():
    adoption = ChildParents.query.get(id)
    if adoption:
        db.session.delete(adoption)
        db.session.commit()
        return jsonify ({"message": "Adoption deleted"}), 200
    return jsonify({"message": "Adoption not found"}), 404

if __name__ == "__main__":
    app.run(port=5555, debug=True)