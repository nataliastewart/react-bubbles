import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import UpdateColor from "./components/UpdateColor";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* <li>
            <Link to="/bubble-page">Bubble Page</Link>
          </li> */}
        </ul>
        {/*         
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated  */}

        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/bubble-page" component={BubblePage} />
          <Route path="/update-color/:id" component={UpdateColor} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
