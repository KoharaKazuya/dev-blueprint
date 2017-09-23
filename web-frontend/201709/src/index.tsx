import { h, render } from "preact";
import { Provider } from "preact-redux";
import { createStore, applyMiddleware, compose } from "redux";
import * as promiseMiddleware from "redux-promise";

import reducer from "./modules";
import { App } from "./components/App";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      promiseMiddleware,
    ),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f,
  ),
);

render((
  <Provider store={ store }>
    <App />
  </Provider>
), document.querySelector("#app"));
