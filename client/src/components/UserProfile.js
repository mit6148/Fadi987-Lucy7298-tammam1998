import React from "react";
import "../css/profile.css";
import "../css/newspaper.css";
import Animal from "./userpage/animal"; 
import GameRecord from "./userpage/gamerecord"
import { Collection } from "mongoose";

export default class UserProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          rank: null, 
          GameArray: null, 
      };

    console.log(this.props.userInfo);
    console.log('hihihi');
    this.mounted = true
    this.getRank = this.getRank.bind(this); 
    this.predicateBy = this.predicateBy.bind(this); 
    this.getRank(); 
    }

    predicateBy(prop){
        return function(a,b){
           if( a[prop] < b[prop]){
               return 1;
           }else if( a[prop] > b[prop] ){
               return -1;
           }
           return 0;
        }
     }

    getRank () {
        fetch('/api/all')
            .then((response) => {
                response.clone().json()
                    .then ((users) => {
                        console.log('here');  
                        users.sort(this.predicateBy("best_score"));
                        console.log(users);
                        return users
                    })
                    .then ((sortedusers) => {
                        for (let i = 0; i < sortedusers.length; i ++) {
                            if (sortedusers[i].name === this.props.userInfo.name) {
                                console.log(i);
                                if (this.mounted){
                                    this.setState({rank: i + 1});
                                    this.setState({GameArray: sortedusers[i].all_games});
                                    console.log("meow meow"); 
                                    console.log(this.state.rank); 
                                    console.log(this.state.GameArray);   
                                } 
                            }
                        }
                    })
            })

    }


    componentDidMount(){
        this.mounted = true;
        this.getRank(); 
    }

    componentWillUnmount(){
        this.mounted = false;
      }
  
    render() {

        let a = []
        if (this.state.GameArray === null){
            a = null
        } else {

            for (const game of this.state.GameArray) {
                a.push(<GameRecord
                    key={1}
                    time = {game.time_stamp.toString().substring(0, 10)}
                    score={game.score}
                    />)
            }
        }
        return(
            <div>
                <Animal userInfo = {this.props.userInfo}/>

                <div class="flexcontainer">
                    <div className = "flexcontains"><h2 className = "stattext">Your highest score: </h2><h1 className = "stattext">{this.props.userInfo.best_score}</h1></div>
                    <div className = "flexcontains"><h2 className = "stattext">Your ranking: </h2><h1 className = "stattext">{this.state.rank}</h1></div>
                </div>

                <div className = "subheaderdiv"><h1 class = "profileheader">Games You've Played</h1></div>

                <div className = "topgamewords">
                    <span className = "gamespans"> <h2> Day </h2></span>
                    <span className = "gamespans"> <h2>Score</h2></span>
                </div>
                {a}



            </div>

        );
                

            
            
    }
}