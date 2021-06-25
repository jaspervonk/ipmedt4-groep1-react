import React from 'react';
import { Link } from "react-router-dom";

import DesktopNavItem from './DesktopNavItem';
import HulpBoekenLijst from '../MobileHulp/HulpBoekenlijst';
import HulpBibliotheek from '../MobileHulp/HulpBibliotheek';
import HulpBoekenkast from '../MobileHulp/HulpBoekenkast';
import HulpWinkel from '../MobileHulp/HulpWinkel';


import '../App.css';
import './DesktopNavigatie.css'

class DesktopNav extends React.Component {

    render() {
        let backButton;

        if (this.props.link) {
            backButton = <Link className="desktopNav__backButton--link u-button" to={this.props.link}>
                <h1 className="desktopNav__backButton">
                    <i className="icon-angle-left"></i> Terug
                </h1>
            </Link>
        }
        return (
          <React.Fragment>
              <section className="desktopNav" id="css--desktopNav">
                  <figure className="desktopNav__figure">
                    <img className="desktopNav__image" src="/img/MenuLogo.png" alt="Roboek robot die de navigatie opent"/>
                  </figure>
                  <DesktopNavItem link="/boekenlijst" p="Boekenlijst"/>
                  <DesktopNavItem link="/genre" p="Bibliotheek" />
                  <DesktopNavItem link="/boekenkast" p="Boekenkast" />
                  <DesktopNavItem link="/winkel" p="Winkel" />
                  <section id="js--openModal" className="desktopNav__hulp" onClick={openModal}>
                      <p className="desktopNav__hulp__p">Hulp</p>
                  </section>
                  <section id="js--myModal" className="desktopNav__modal">
                      <section className="desktopNav__modal__content">
                          <figure className="close desktop__close">&times;</figure>
                          <section className="desktopNav__modal__content__onderdelen">
                              <section className="desktopNav__modal__content__onderdelen__onderdeel">
                                  <h2 className="hulp__section__keuze__boekenlijst__h2">Mijn Boekenlijst</h2>
                                  <HulpBoekenLijst />
                              </section>
                              <section className="desktopNav__modal__content__onderdelen__onderdeel">
                                  <h2 className="hulp__section__keuze__bibliotheek__h2">Bibliotheek</h2>
                                  <HulpBibliotheek />
                              </section>
                              <section className="desktopNav__modal__content__onderdelen__onderdeel">
                                  <h2 className="hulp__section__keuze__boekenkast__h2">Boekenkast</h2>
                                  <HulpBoekenkast />
                              </section>
                              <section className="desktopNav__modal__content__onderdelen__onderdeel">
                                  <h2 className="hulp__section__keuze__winkel__h2">Winkel</h2>
                                  <HulpWinkel />
                              </section>
                              {/* Hieronder komen de andere secties */}
                          </section>
                      </section>
                  </section>
              </section>
              {backButton}
            </React.Fragment>
        );
    }
}

const openModal = () => {
    var modal = document.getElementById("js--myModal");
    var btnModal = document.getElementById("js--openModal");
    var figure = document.getElementsByClassName("close")[0];

    btnModal && (btnModal.onclick = function () {
        modal.style.display = "block";
    });
    figure && (figure.onclick = function () {
        modal.style.display = "none";
    });
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

export default DesktopNav;
