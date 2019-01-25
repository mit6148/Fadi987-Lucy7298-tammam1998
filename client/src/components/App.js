import React from "react";
import "../css/app.css";
import GameContainer from "./GameContainer";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Ranking from "./Ranking";
import UserProfile from "./UserProfile"; 
import  "../css/newspaper.css"

import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null
    };
  }

  componentDidMount() {
    this.getUser();
  }

  logout = () => {
    this.setState({
      userInfo: null
    })
  };

  getUser = () => {
    fetch('/api/whoami')
      .then(res => res.json())
      .then(
        userObj => {
          console.log(userObj)
          if (userObj._id !== undefined) {
            this.setState({
              userInfo: userObj
            });
          } else {
            this.setState({
              userInfo: null
            });
          }
        }
      );
  }
  render() {
    /*if (this.state.userInfo === null) {
      return(
      <div>
        <HomePage userInfo= {this.state.userInfo}
          logout= {this.logout} />
      </div>
      );
    } else{*/
    return (
      <div>
        <div className="head">
           <div className="headerobjectswrapper">
                  <header>News Racer</header>
            </div>
        
      </div>
          <div>
            <NavBar userInfo={this.state.userInfo}
                    logout={this.logout}/>
          </div>
  
        <Switch>
            <Route exact path='/' render={(props) => <HomePage {...props} userInfo={this.state.userInfo} logout= {this.logout} />}/>
            <Route exact path='/profile/:user' render={(props) => <UserProfile {...props} userInfo={this.state.userInfo}/>} />
            <Route exact path='/race' component={GameContainer} />
            <Route exact path='/ranking' component={Ranking} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);