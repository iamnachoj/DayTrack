# DayTrack

## Welcome to DayTrack! 

Day Track is a to Do List built with Node, Express and EJS templating. The App is hosted on Heroku, and it's served by a Mongo Atlas database.

It has been built using purely minimalistic methodologies of design and user experience. You can see a demo <a href="https://serene-harbor-77615.herokuapp.com/">here! </a>

## Tools 

- Node
- Express framework
- Mongoose
- MongoDB
- Body-parser
- Lodash

## Getting Started
The easiest way to get started is to clone the repository:

 1. Clone the repository ``Git clone https://github.com/iamnachoj/DayTrack``
 2. Change directory ``cd DayTrack``
 3. Install NPM dependencies ``npm install``
 4. Start the server ``npm run start`` Note: It is recommended to install nodemon for live reloading - It watches for any changes in your node.js app and automatically restarts the server

## Deployment
### Deployment to Heroku
Download and install Heroku CLI

In a terminal, run heroku login and enter your Heroku credentials

From your app directory run ``heroku create``

Use the command ``heroku config:set KEY=val`` to set the different environment variables (KEY=val) for your application (i.e. heroku config:set BASE_URL=[heroku App Name].herokuapp.com etc.)

Do ``git add .``

Do ``git commit -m " reason for commit"``

Lastly, do ``git push heroku master``.

Please note that you may also use the Heroku Dashboard to set or modify the configurations for your application.

### view live demo: <a href="https://serene-harbor-77615.herokuapp.com/">Link here! </a>

I used the express framework to create custom routes. You can always set /anyroute and create a brand new list. It will all be stored in the DB. 

Note that the DB might have to be deleted as this is used for practice purposes. Therefore it can't be yet your favourite todo list :) 

