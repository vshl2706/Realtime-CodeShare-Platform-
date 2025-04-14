# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)






npx create@latest

yarn -g install
npm install -g yarn
yarn install
yarn start --> To start your project
yarn add react-router-dom
<!-- Now we will create a unique room id  -->
yarn add uuid
Now we have to set new Id in input. 
<!-- onChange={(e) => setRoomId(e.target.value)}:
The onChange event is triggered whenever the user types into the input field.
e represents the event object.
e.target.value retrieves the current value of the input field.
setRoomId(e.target.value) updates the state variable roomId with the new input value.
value={roomId}:
This binds the input field to the state variable roomId.
It ensures that the input field always displays the latest value of roomId. -->
yarn add react-hot-toast
yarn add react-avatar  
yarn add @codemirror/state @codemirror/view @codemirror/basic-setup
yarn add @codemirror/lang-javascript
yarn add @codemirror/theme-one-dark
yarn add @codemirror/state @codemirror/view @codemirror/basic-setup @codemirror/lang-javascript @codemirror/theme-one-dark
yarn add @codemirror/lint, @codemirror/view, @codemirror/state, @codemirror/search, @codemirror/commands, @codemirror/language, @codemirror/autocomplete
yarn add @lezer/highlight @codemirror/language
yarn add @codemirror/lang-html
yarn add -D nodemon
yarn add express socket.io socket.io-client
yarn add react-icons

<!-- We are adding avatar dependencies to add avatar. -->

<!-- Some Good CSS classes

    .homePageWrapper {
  display: flex;  
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 100vh;
}

.formWrapper {
  background: #434242;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
}
footer {
  position: fixed;
  bottom: 0;
  color: black;
  font-size: 25px;
}

footer a{
  color:#f6ff00;
  transition: all 0.1s ease-in-out;
}
.inputGroup {
  display: flex;
  flex-direction: column;
}
.mainLabel{
  margin-bottom: 20px;
  margin-top: 0;
}

.homePageLogo{
  height: 80px;
  margin-bottom: 30px;
}
.inputBox {
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  margin-bottom: 14px;
  background: #eee;
  font-size: 16px;
  font-weight: bold;
}
.btn{
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
/* From Uiverse.io by shah1345 */ 
.joinBtn {
  display: inline-block;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: #090909;
  font-weight: bold;
  padding: 0.7em 1.7em;
  cursor: pointer;
  font-size: 18px;
  border-radius: 0.5em;
  background: #4aee88;
  border: 1px solid #e8e8e8;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.joinBtn:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.joinBtn:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.joinBtn:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #bf52c5;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.joinBtn:hover {
  color: #ffffff;
  border: 1px solid #009087;
}

.joinBtn:hover:before {
  top: -35%;
  background-color: #009087;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.joinBtn:hover:after {
  top: -45%;
  background-color: #009087;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.createInfo {
  margin: 0 auto;
  margin-top: 20px;
}
.createNewBtn {
  color: #4aed88;
  text-decoration: none;
  border-bottom: 1px solid #4aed88;
  transition: all 0.1s ease-in-out;
}
.createNewBtn:hover, footer a:hover {
  color: #368654;
  border-color: #368654;
}

 -->