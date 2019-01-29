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
          name: "",
          rank: null, 
          GameArray: null, 
          best_score: null, 
      };

    console.log("hi"); 

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
                        users.sort(this.predicateBy("best_score"));
                        return users
                    })
                    .then ((sortedusers) => {
                        for (let i = 0; i < sortedusers.length; i ++) {
                            if (sortedusers[i]._id === this.props.match.params.id) {
                                this.setState({rank: i + 1});
                                console.log("this"); 
                                console.log(sortedusers[i]); 
                                this.setState({GameArray: sortedusers[i].all_games});
                                this.setState({best_score: sortedusers[i].best_score}); 
                                this.setState({name: sortedusers[i].name}); 
                            }
                        }
                    })
            })

    }


    componentDidMount(){
        this.getRank(); 
    }
  
    render() {

        let a = []
        if (this.state.GameArray === null){
            a = null
        } else {

            for (const game of this.state.GameArray) {
                a.push(<GameRecord
                    key={game.time_stamp.toString()}
                    time = {game.time_stamp.toString().substring(0, 10)}
                    score={game.score}
                    />)
            }
        }
        return(
            <div>
                <Animal best_score = {this.state.best_score} name = {this.state.name}/>


                <div className="flexcontainer">
                    <div className = "flexcontains"><h2 className = "stattext">Your highest score: </h2><h1 className = "stattext">{this.state.best_score}</h1></div>
                    <div className = "flexcontains"><h2 className = "stattext">Your ranking: </h2><h1 className = "stattext">{this.state.rank}</h1></div>
                </div>

                <div className = "subheaderdiv"><h1 className = "profileheader">Games You've Played</h1></div>

                <div className = "topgamewords">
                    <span className = "gamespans"> <h2> Day </h2></span>
                    <span className = "gamespans"> <h2>Score</h2></span>
                </div>
                {a}



            </div>

        );
                

            
            
    }
}