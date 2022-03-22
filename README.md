## Description

Small web app for rendering a google maps with a predefined route for an electric vehicle, showing the relevant charging stations along the way ⚡

What the app does:
- Renders a Map with the Departure marker, Arrival marker and best route from Lisbon Airport to the Autódromo Internacional do Algarve. 
- Renders the relevant Charging Stations along the way (With a distance of 2kms from route)
- Has controls for the user to select only the Fast Charging Stations
- The user is able to visualize the Charging Station information - Address, socket type and number of sockets 🔌

<img src="https://i.postimg.cc/3wZCrXJF/preview.png" width="850">

## Technologies used

- HTML, CSS, JS
- React, Sass

## Requirements to run the project

To run this project, a Google Maps API key is needed with certain permissions.\
[Google Maps Platform](https://developers.google.com/maps)

Steps:
- Create Google Maps API Key
- Activate permissions for the 'Maps Javascript API' and 'Directions API'
- On project root folder open the file '.env.template'
- Copy API key and paste on top of field 'PASTE GOOGLE MAPS API KEY HERE'
- Rename the file to '.env' and save

## Setting up the app

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!