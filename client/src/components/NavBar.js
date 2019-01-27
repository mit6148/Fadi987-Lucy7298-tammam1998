import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg">

                <div className = "navbar-inner collapse navbar-collapse pullUpDown nav-container">
                    <ul className="nav navbar-nav mx-auto">
                        <li className="nav-item">
                            {this.props.userInfo.name.includes('Guest') ? (
                                <a href={"/auth/google/"} className="nav-link">Profile</a>  
                            ) : (
                                <Link to={"/profile" } className="nav-link">Profile</Link>  
                            )}                       
                        </li>
                        <li className="nav-item"><Link to={"/race"} className="nav-link">Race</Link></li>
                        <li className="nav-item"><Link to={"/ranking"} className="nav-link">Leaderboard</Link></li>
                        <li className="nav-item">
                            {this.props.userInfo.name.includes("Guest") ? (
                                <a href={"/auth/google/"} className="nav-link">Login</a>  
                            ) : (
                                <a className="nav-link " href="/logout" onClick={this.props.logout}>Logout</a>  
                            )}       
                        </li>
                        {/*<Link to={"/profile/" + this.props.userInfo._id} className="nav-item nav-link">Profile</Link>*/}
                        
                        
                        {/* <Link to="/" className="nav-item nav-link">Home</Link> */
                        /* {this.props.userInfo === null ? (
                            <a className="nav-item nav-link" href="/auth/google">Login</a>
                        ) : (
                                <React.Fragment>
                                    <Link to={"/profile/" + this.props.userInfo._id} className="nav-item nav-link">Profile</Link>
                                    <a className="nav-item nav-link" href="/logout" onClick={this.props.logout}>Logout</a>
                                    <Link to={"/Race"} className="nav-item nav-link">Race</Link>
                                </React.Fragment>

                            )} */}
                    </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;