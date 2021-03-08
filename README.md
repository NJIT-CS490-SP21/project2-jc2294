# Project 2
A public Tic Tac Toe Web game Application with more client-server interaction where multiple users can login and enter from differnt browser tabs and view the same live game!
---

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`
3. `pip install flask-socketio` to Socket.io with Flask and ReactJS
4. `npm install socket.io-client --save`
4. `pip install flask-cors`
3. `pip install Flask-SQLAlchemy==2.1` to use SQL in Phython
4. `pip install Flask-SQLAlchemy==2.1`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
2. Setup Database
    1. Install PostGreSQL: sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs Enter yes to all prompts.
    2. Initialize PSQL database: sudo service postgresql initdb
    3. Start PSQL: sudo service postgresql start
    4. Make a new superuser: sudo -u postgres createuser --superuser $USER If you get an error saying "could not change directory", that's okay! It worked!
    5. Make a new database: sudo -u postgres createdb $USER If you get an error saying "could not change directory", that's okay! It worked!
    6. Make sure your user shows up:
        a) psql
        b) \du look for ec2-user as a user (take a screenshot)
        c) \l look for ec2-user as a database (take a screenshot)
    7. Make a new user:
        a) psql (if you already quit out of psql)
        b) Type this with your username and password (DONT JUST COPY PASTE): create user some_username_here superuser password 'some_unique_new_password_here'; e.g. create user namanaman superuser password 'mysecretpassword123';
        c) \q to quit out of sql
        Save your username and password in a sql.env file with the format SQL_USER= and SQL_PASSWORD=.
    8. To use SQL in Python: pip install psycopg2-binary
    9. pip install Flask-SQLAlchemy==2.1


## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/''


## Deploy to Heroku
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. heroku config (check your env vars)
3. Add a Database: `heroku addons:create heroku-postgresql:hobby-dev (add a DB)`
4. Create a .env file and add set our var DATABASE_URL. Run `touch .env && echo "DATABASE_URL='copy-paste-database-url-here'" > .env`
3. Push to Heroku: `git push heroku main`

---
## Notes
### Known Problem
- Multiple users can have same username. I would fix this by not letting any player to login with same username that are currently logged in.

### Additional Features that I might implement
- Make my web application reponsive so that the web application automatically adjust and adapt to any screen size. I would to implementing that in the css file using a media query to add breakpoints for diffrent screen sizes.
- If a current player logout, spectators are able to join the game and start to play. I would implement that by adding a logout button. On click of the logout button, first spectator to join the games becomes a player. 

  
### Technical Difficulties
- A technical difficulties that I faceed was as error that I was getting: "OSError: [Errno 98] Address already." I was getting that error there was another process listening on that post and by mistake I had closeed that terminal. I solved this problem by first running this command `lsof -i @localhost:8080` to find out the PID and then I used this command to kill `kill -9 <<PID>>`


