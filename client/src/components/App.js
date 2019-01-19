import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import GameContainer from "./GameContainer";
import HomePage from "./HomePage";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={GameContainer} />
          <Route exact path="/race" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;