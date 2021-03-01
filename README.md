# Project 1
This demo explains how to call the Spotify API and Genius API using the Python requests libary and parse its JSON data on cloud9 services on aws

---

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup

1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/''


## Deploy to Heroku
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

---
## Notes
### Known Problem
- Multiple users can have same username. If a user is spectator but has same username, that user is able to make moves. I would fix this have not having any player login with same username currently logged in

### Additional Features that I might implement
- Make my web application reponsive so that the web application automatically adjust and adapt to any screen size. I would to implementing that in the css file using a media query to add a breakpoint from diffrent screen sizes.
- If a current player logout, spectators are able to join the game and start to play. I would implement that by adding a logout button, and when the current player logout, spectator has option to join in the order they logged in.

  
### Technical Difficulties
- A technical Difficulties that i faced while working on this project was when i ran `pip freeze > requirnment.txt` command to add all the requiremts for the heoku deployment of the web app, it did not add all the required libraries. I solved this problem by adding the requirments manually in the requirnment.txt file
- Another technical diffrently i faced was just in general to to learn javascript and react. Reading the documentation and research alot on internet helped. Along with some video me which includes {% youtube hdI2bqOjy3c %}
- Using react state hook was alos a challenging part for me and this article helped. https://reactjs.org/docs/hooks-state.html


