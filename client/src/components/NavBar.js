import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand href="/"></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <div className="navbar-inner pullUpDown nav-container borderXwidth">
                            <ul className="nav navbar-nav mx-auto">
                                <li className="nav-item">
                                    {this.props.userInfo.name.includes('Guest') ? (
                                        ""
                                    ) : (
                                            <Link to={"/profile/" + this.props.userInfo._id} className="nav-link nav-link-pullupdown">Profile</Link>
                                        )}
                                </li>
                                <li>
                                    <UncontrolledDropdown nav inNavbar>
                                     
                                        <DropdownToggle nav caret>
                                            <span className = "nav-link-pullupdown">
                                            Race
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                <Link to={"/race"} className="nav-link nav-drop" >Multiplayer</Link>
                                                
                                            </DropdownItem>
                                            <DropdownItem>
                                                <Link to={"/solorace"} className="nav-link nav-drop">Solo</Link>
                                            </DropdownItem>
                                           {/*<DropdownItem divider />
                                            <DropdownItem>
                                                Reset
                                         </DropdownItem>*/}
                                           </DropdownMenu>
                                        
                                    </UncontrolledDropdown>

                                    </li>
                                <li className="nav-item"><Link to={"/ranking"} className="nav-link nav-link-pullupdown">Leaderboard</Link></li>
                                <li className="nav-item">
                                    {this.props.userInfo.name.includes("Guest") ? (
                                        <a href={"/auth/google/"} className="nav-link nav-link-pullupdown">Login</a>
                                    ) : (
                                            <a className="nav-link nav-link-pullupdown" href="/logout" onClick={this.props.logout}>Logout</a>
                                        )}
                                </li>
                            </ul>
                        </div>
                    </Collapse>
                </Navbar>
            </div>



        );
    }
}

export default NavBar;