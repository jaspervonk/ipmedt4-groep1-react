import React from "react";

import WelkomPagina from "./WelkomPagina/WelkomPagina"

import './App.css';
import Winkel from './Winkel/Winkel';
import Boekenlijst from "./boekenlijst/Boekenlijst";
import BoekDetail from "./boekenlijst/BoekDetail";
import Genre from "./Bibliotheek/Genre";
import Bibliotheek from "./Bibliotheek/Bibliotheek";
import BibliotheekDesktop from './Bibliotheek/BibliotheekDesktop';
import Details from "./Bibliotheek/Details";
import Woordzoeker from "./Woordzoeker/Woordzoeker";
import Gefeliciteerd from "./Gefeliciteerd/Gefeliciteerd";
import Boekenkast from "./Boekenkast/Boekenkast";
import Navigatie from "./Navigatie/Navigatie";
import Header from "./UniverseelComponents/MobileHeader";
import DesktopNav from "./Navigatie/DesktopNavigatie";

import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";

//state = groep variabelen die van waarde kan veranderen.
class App extends React.Component{
    render() {
      return (
        <Router>
          <Switch>
            <Route path="/genre">
              <Navigatie titel="Genre" link="/"/>
              <Genre />
            </Route>
            <Route path="/bibliotheek/">
              <Navigatie titel="Bibliotheek" link="/genre"/>
              <Bibliotheek />
            </Route>
            <Route path="/details/">
              <Navigatie titel="Details" link="/genre"/>
              <Details />
            </Route>
            <Route path="/boekenlijst/detail/woordzoeker">
              <Navigatie titel="Woordzoeker" link="/boekenlijst"/>
              <Woordzoeker/>
            </Route>
            <Route path="/gefeliciteerd">
              <Navigatie titel="Uitdaging" />
              <Gefeliciteerd user_id='1' />
            </Route>
            <Route path="/boekenkast">
              <Navigatie titel="Mijn Boekenkast" />
              <Boekenkast user_id='1'/>
            </Route>
            <Route path="/boekenlijst/detail/">
              <Navigatie titel="Boekenlijst" link="/boekenlijst"/>
              <BoekDetail  user_id='1'/>
            </Route>
            <Route path="/boekenlijst/">
              <Navigatie titel="Boekenlijst" />
              <Boekenlijst user_id='1'/>
            </Route>
            <Route path="/winkel/">
              <Navigatie titel="Winkel"/>
              <Winkel user_id='1'/>
            </Route>
            <Route path="/">
              <WelkomPagina />
            </Route>
          </Switch>
        </Router>
      )
    }
}
export default App;
