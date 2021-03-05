import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv()) # This is to load your env variables from .env

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

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)
    
#list of users
users = {
    "spectators":[]
}


@socketio.on('login')
def on_login(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'click' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    currentUser = data["username"]
    if "X" not in users:
        users["X"] = currentUser
    elif "O" not in users:
        users["O"] = currentUser
    else:
        users["spectators"].append(currentUser)

    print(users)
    
    
    temp = models.Person.query.filter_by(username=currentUser).first()
    if not temp:
        #working with databsse
        new_user = models.Person(username=data['username'], score=100)
        db.session.add(new_user)
        db.session.commit()
        
    all_people = models.Person.query.all()
        
    userss = {}
    for person in all_people:
        userss[person.username] = person.score
    
    print(userss)
    socketio.emit('leaderboard', userss, broadcast=True, include_self=False)
    socketio.emit('login', users, broadcast=True, include_self=False)
    
def updateScore(winner, loser):
    print(winner)
    db.session.query(models.Person).filter(models.Person.unsername == winner).update({models.Person.score: models.Person.unsername + 1})
    db.session.query(models.Person).filter(models.Person.username == loser).update({models.Person.score: models.Person.score -1})



@socketio.on('updateScore')
def on_updateScores(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'click' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    
    
    updateScore(data["winner"], data["loser"])
    
    all_people = models.Person.query.all()
    userss = {}
    for person in all_people:
        userss[person.username] = person.score

    print(userss)
    
    socketio.emit('updateScore', userss, broadcast=True, include_self=False)
    
    
@socketio.on('click')
def on_click(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'click' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('click',  data, broadcast=True, include_self=False)
    
@socketio.on('reset')
def on_reset(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'click' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('reset',  data, broadcast=True, include_self=False)
    

# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )