import React from "react";
import "../css/game.css";

export default class GameContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

  
    render() {
        return(
            <div>
                <section className="game-container game-div">
                    <div className="left-half">
                        <article>
                            <h1>Left Half</h1>
                            <p>Weekends don't count unless you spend them doing something completely pointless.</p>
                        </article>
                    </div>
                    <div className="right-half">
                        <article>
                            <h1>Right Half</h1>
                            <p>If your knees aren't green by the end of the day, you ought to seriously re-examine your life.</p>
                        </article>
                    </div>
                </section>
            </div>
        );
    }
}