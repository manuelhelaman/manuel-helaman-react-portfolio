import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import SobreMi from "./pages/sobre-mi";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";


export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInstatus: "NOT_LOGGED_IN"
    };

    this.handleSuccesfulLogin=this.handleSuccesfulLogin.bind(this);
    this.handleUnSuccesfulLogin=this.handleUnSuccesfulLogin.bind(this);
    this.handleSuccesfulLogout=this.handleSuccesfulLogout.bind(this);
  }

  handleSuccesfulLogin() {
    this.setState({
      loggedInstatus: "LOGGED_IN"
    })
  }

  handleUnSuccesfulLogin() {
    this.setState({
      loggedInstatus: "NOT_LOGGED_IN"
    })
  }
  
  handleSuccesfulLogout() {
    this.setState({
      loggedInstatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios
    .get("https://avi.devcamp.space/logged_in", { 
      withCredentials: true 
    }).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInstatus = this.state.loggedInstatus;

      // If loggedIn and status is LOGGED_IN => return data
      // If loggedIn status NOT_LOGGED_IN => update state
      // If not loggedIn and status LOGGED_IN => update state

      if(loggedIn && loggedInstatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInstatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInstatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInstatus === "LOGGED_IN") {
        this.setState({
          loggedInstatus: "NOT_LOGGED_IN"
        });
      }  
    })
    .catch(error => {
      console.log("An error occured", error)
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />
    ];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer 
              loggedInstatus={this.state.loggedInstatus}
              handleSuccesfulLogout={this.handleSuccesfulLogout} 
            />

            <Switch>
              <Route exact path="/" component={Home} />

              <Route 
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccesfulLogin={this.handleSuccesfulLogin}
                    handleUnSuccesfulLogin={this.handleUnSuccesfulLogin}
                  />  
                )
                } 
              />

              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/sobre-mi" component={SobreMi} />
              <Route path="/blog" 
                render={props => (
                  <Blog {...props} loggedInstatus = {this.state.loggedInstatus} />
                )}
              />

              <Route 
                path="/b/:slug"
                render={props => (
                  <BlogDetail {...props} loggedInstatus={this.state.loggedInstatus} />
                )}  
              />
              {this.state.loggedInstatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route
                exact path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}