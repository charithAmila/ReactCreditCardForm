import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware ,compose } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const enhance = compose( window.devToolsExtension ? window.devToolsExtension() : f => f);
export const store = createStore(rootReducer,enhance,applyMiddleware(reduxThunk));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, 
document.getElementById('root'));
registerServiceWorker();
