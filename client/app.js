import React from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// React Router
import { Router, Route, Switch } from "react-router-dom";
import history from "./history"; // Import history in any component you want to use it
import { routerMiddleware } from "react-router-redux";

// Router middleware
const routing = routerMiddleware(history);

// Root reducer
import rootReducer from "./reducers/index";

// Components
import Home from "./Containers/Homepage";
import UserLog from "./Components/UserLog"
import UserAcc from "./Containers/UserAcc";
import UserPage from './Containers/UserPage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Initialize redux store and thunk middleware
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(routing)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path='/userLog' exact component={UserLog}/>
        <Route path='/account' exact component={UserAcc}/>
        <Route path='/:name' exact component={UserPage}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
