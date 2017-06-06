import React from 'react';
import ReactDOM from 'react-dom';
import App1 from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let numbers = [1,2,3,4,5];

ReactDOM.render(
    <App1 />,
    document.querySelector('#root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
