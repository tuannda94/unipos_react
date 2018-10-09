import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'Components/pop-up/App';
import registerServiceWorker from './registerServiceWorker';

// function run() {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
// }

// const loadedStates = ['complete', 'loaded', 'interactive'];

// if (loadedStates.includes(document.readyState) && document.body) {
//     run();
// } else {
//     window.addEventListener('DOMContentLoaded', run, false);
// }
