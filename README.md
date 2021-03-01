# Project 2
A public Tic Tac Toe Web game Application with more client-server interaction where multiple users can login and enter from differnt browser tabs and view the same live game!
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
- Multiple users can have same username. I would fix this by not letting any player to login with same username that are currently logged in.

### Additional Features that I might implement
- Make my web application reponsive so that the web application automatically adjust and adapt to any screen size. I would to implementing that in the css file using a media query to add breakpoints for diffrent screen sizes.
- If a current player logout, spectators are able to join the game and start to play. I would implement that by adding a logout button. On click of the logout button, first spectator to join the games becomes a player. 

  
### Technical Difficulties
- A technical Difficulties that i faced while working on this project was when i ran `pip freeze > requirnment.txt` command to add all the requiremts for the heoku deployment of the web app, it did not add all the required libraries. I solved this problem by adding the requirments manually in the requirnment.txt file
- Another technical diffrently i faced was just in general to to learn javascript and react. Reading the documentation and research alot on internet helped. Along with some video me which includes {% youtube https://www.youtube.com/watch?v=hdI2bqOjy3c %}
- Using react state hook was alos a challenging part for me and this article helped. https://reactjs.org/docs/hooks-state.html


