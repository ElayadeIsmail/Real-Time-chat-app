import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Homepage from "./pages/auth/Homepage";
import Home from "./pages/home/Home";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import { loadUser } from "./redux/auth/actions";
import Alert from "./components/alert/Alert";
import ChatPage from "./pages/chat/ChatPage";
import PrivateRoutes from "./utils/PrivateRoutes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <PrivateRoutes exact path='/room/:room' component={ChatPage} />
          <PrivateRoutes exact path='/rooms' component={Home} />
          <Route render={() => <Redirect to='/rooms' />} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
