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
- Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory
- Setup Database
    1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs` Enter yes to all prompts.
    2. Initialize PSQL database: `sudo service postgresql initdb`
    3. Start PSQL: `sudo service postgresql start`
    4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` 
    5. Make a new database: `sudo -u postgres createdb $USER`
    6. Make sure your user shows up:
        1. `psql`
        2. `\du` look for ec2-user as a user (take a screenshot)
        3. `\l` look for ec2-user as a database (take a screenshot)
    7. Make a new user:
        1. `psql` (if you already quit out of psql)
        2. Type this with your username and password (DONT JUST COPY PASTE): `create user some_username_here superuser password 'some_unique_new_password_here'`;
        3. `\q` to quit out of sql
    8. Save your username and password in a sql.env file with the format `SQL_USER= and SQL_PASSWORD=`.


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

### Additional Features that I might implement
- I would like have another score feild that display scores for the session for the users currently playing. I would implement this by storing the scores into useState list. 
- I would like to create a more interactive leaderboard where the user is able to serch player's name. I would implement this by adding a input feild which takes in user input and search the database for that user and display the information.

  
### Technical Difficulties
- A technical difficulties that I faceed was as error that I was getting: "OSError: [Errno 98] Address already." I was getting that error there because another process was listening on that post and by mistake I had closed that terminal. I solved this problem by first running this command `lsof -i @localhost:8080` to find out the PID and then I used this command to kill `kill -9 <<PID>>`
- I had difficultie while deplying it to heroku. Upon reading the herok build log error message, I found out that I was missing a css file. So I creted the css file again and made sure to save and push it to Githib
