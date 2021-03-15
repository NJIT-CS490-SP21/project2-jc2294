''' this class creates a person model for database '''

from app import db

class Person(db.Model):
    '''this class creates db users'''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    score = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        ''' this function return person'''
        return '<Person %r>' % self.username
