import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # This is to load your env variables from .env

app = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    ''' index '''
    return send_from_directory('./build', filename)


@socketio.on('connect')
def on_connect():
    '''When a client connects from this Socket connection, this function is run '''

    print('User connected!')


@socketio.on('disconnect')
def on_disconnect():
    ''' When a client disconnects from this Socket connection, this function is run '''
    print('User disconnected!')


def get_players():
    ''' get all players from database '''
    all_people = models.Person.query.order_by(models.Person.score.desc()).all()
    players = []
    for person in all_people:
        players.append({person.username: person.score})
    return players


def add_new_player(current_user):
    ''' helper method to add new player to database '''
    temp = models.Person.query.filter_by(username=current_user).first()
    if not temp:
        #working with databsse
        new_user = models.Person(username=current_user, score=100)
        db.session.add(new_user)
        db.session.commit()


#list of all current users: X, O, and spectators
users = {"spectators": []}


@socketio.on('login')
def on_login(
        data):  # data is whatever arg you pass in your emit call on client
    ''' This emits the 'click' event from the server to all clients except for
      the client that emmitted the event that triggered this function '''
    print(str(data))

    current_user = data["username"]
    if "X" not in users:
        users["X"] = current_user
    elif "O" not in users:
        users["O"] = current_user
    else:
        users["spectators"].append(current_user)

    print(users)

    add_new_player(current_user)
    players = get_players()
    print(players)
    socketio.emit('leaderboard', players, broadcast=True, include_self=False)
    socketio.emit('login', users, broadcast=True, include_self=False)
    
def on_login_test(
        data):  # data is whatever arg you pass in your emit call on client
    ''' This emits the 'click' event from the server to all clients except for
      the client that emmitted the event that triggered this function '''

    current_user = data["username"]
    if "X" not in users:
        users["X"] = current_user
    elif "O" not in users:
        users["O"] = current_user
    else:
        users["spectators"].append(current_user)
    return users


def update_score(winner, loser):
    '''helper method to update the score in database'''
    print(winner)
    db.session.query(
        models.Person).filter(models.Person.username == winner).update(
            {models.Person.score: models.Person.score + 1})
    db.session.query(
        models.Person).filter(models.Person.username == loser).update(
            {models.Person.score: models.Person.score - 1})
    db.session.commit() 


@socketio.on('updateScore')
def on_update_scores(
        data):  # data is whatever arg you pass in your emit call on client
    '''This emits the 'updateScore' event from the server to all clients except for
    the client that emmitted the event that triggered this function and update the score'''
    print(str(data))

    update_score(data["winner"], data["loser"])
    players = get_players()
    print(players)

    socketio.emit('updateScore', players)


@socketio.on('click')
def on_click(
        data):  # data is whatever arg you pass in your emit call on client
    '''This emits the 'click' event from the server to all clients except for
    the client that emmitted the event that triggered this function '''
    print(str(data))

    socketio.emit('click', data, broadcast=True, include_self=False)
    
def on_click_test(
        data):  # data is whatever arg you pass in your emit call on client
    '''This emits the 'click' event from the server to all clients except for
    the client that emmitted the event that triggered this function '''

    return data


@socketio.on('reset')
def on_reset(
        data):  # data is whatever arg you pass in your emit call on client
    ''' This emits the 'reset' event from the server to all clients except for
     the client that emmitted the event that triggered this function '''

    print(str(data))

    socketio.emit('reset', data, broadcast=True, include_self=False)


# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
