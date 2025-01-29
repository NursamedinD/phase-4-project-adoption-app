from app import app, db
from models import Parent, Child, ChildParents
from faker import Faker
from datetime import datetime

fake = Faker()

with app.app_context():
    db.drop_all()
    db.create_all()

    parents = []
    for _ in range (5):
        parent = Parent(
            name=fake.name(),
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password()
        )
        db.session.add(parent)
        parents.append(parent)
    
    children = []
    for _ in range (5):
        child = Child(
            name=fake.name(),
            age=fake.random_int(min=1, max=18),
            description=fake.text(),
            added_by=fake.choice(parents).id
        )
        db.session.add(child)
        children.append(parent)


    for child in children:
        adoption = ChildParents(
            parent_id=fake.random_element(parents).id,
            child_id = child.id,
            adoption_date=datetime.strptime(fake.date(), "%Y-%m-%d")
        )
        db.session.add(adoption)

    db.session.commit()