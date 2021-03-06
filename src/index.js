import React from 'react';
import ReactDOM from 'react-dom';
import './generall.css';
import App from './mainTodo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('reactRoot'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
