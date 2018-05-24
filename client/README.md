This project uses [Create React App](https://github.com/facebookincubator/create-react-app) in addition to
[Mobx](https://github.com/mobxjs/mobx) for state management, [React Router v4](https://github.com/ReactTraining/react-router) for routing and [Material-UI](http://www.material-ui.com/#/) for styled components.
Mobx was added without ejecting the app via the [React App Rewired](https://github.com/timarney/react-app-rewired) package. We use [Auth0](https://auth0.com/) for authenticating users.

## Get Started

1.) `$ git clone https://github.com/ctti-clinicaltrials/PROPHETIC.git`

2.) `$ cd MyApp/client`

3.) Custom React Scripts allows you to define a `.env` file in the root and add env vars for development.
 Custom React Scripts has preset vars to allow CSS modules, Stylus, Sass etc. You can find more info [here](https://www.npmjs.com/package/custom-react-scripts).
 You can also define your own custom env vars using this format `REACT_APP_*`.

 If you choose to use Auth0 for authentication, you can define `REACT_APP_CLIENT_ID` and add your Auth0 client ID in `.env` for local development.
 Be careful not to check this information into a public repository.
 ``

4.) `$ yarn start`

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

## More Info

For more info see the main [README.md file](https://github.com/ctti-clinicaltrials/PROPHETIC/blob/master/README.md) in the root of the project

