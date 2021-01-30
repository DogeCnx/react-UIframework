import { createStore } from "redux";
import { Provider } from "react-redux";
import timeState from "./Reducer/timeState";
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = createStore(
    timeState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  ReactDOM.render(<Provider store={store}><App /></Provider>, div)
})
