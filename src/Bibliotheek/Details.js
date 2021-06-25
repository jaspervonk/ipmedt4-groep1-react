import React from 'react';
import axios from "axios";

import { Link } from "react-router-dom";
import './Details.css';



class Details extends React.Component{
    state = {
        gekozen_boeken: [],
        persons: [],
        boek_id: '',
        buttonText: "",
        popup: "none",
        popupText: "",
        audio: ""
      }
      updateButton = (props) =>{
        const id = this.state.boek_id;
        const gekozen = this.state.gekozen_boeken;
        if(gekozen.includes(id) === true){
          this.setState({buttonText: "Dit boek niet meer lezen"});
        }else{
          this.setState({buttonText: "Dit boek lezen"});
        }
      }

      componentDidMount = (props) => {
        let idReq = window.location.pathname.split('/')[2];
        axios.get(`https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/details/` + idReq)
          .then(res => {
            const boeken = res.data;
            this.setState({ persons: boeken.boeken });
            this.setState({ gekozen_boeken: boeken.gekozen, audio: res.data.boeken[0].audio })
            const id = boeken.boeken[0].id;
            console.log(res.data.boeken[0].audio);
            if(boeken.gekozen.includes(id) === true){
              this.setState({buttonText: "Dit boek niet meer lezen"});
            }else{
              this.setState({buttonText: "Dit boek lezen"});
            }
          });

      }

    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      if(this.state.buttonText === "Dit boek lezen"){
        axios.post('https://warm-escarpment-39872.herokuapp.com/api/boekenlijst/add/' + this.state.boek_id, {"id": this.state.boek_id}).then(res => {
          const boeken = res.data;
          const id = boeken.boeken[0].id;
          if(boeken.gekozen.includes(id) === true){
            this.setState({popup: "block"});
          }else{
            this.setState({buttonText: "Dit boek lezen", popup: "none"});
          }
        });
      }else{
        axios.delete('https://warm-escarpment-39872.herokuapp.com/api/boekenlijst/delete/' + this.state.boek_id, {"id": this.state.boek_id}).then(res => {
          const boeken = res.data;
          const id = boeken.boeken[0].id;
          if(boeken.gekozen.includes(id) === true){
            this.setState({popup: "block"});
          }else{
            this.setState({buttonText: "Dit boek lezen", popup: "none"});
          }
        });
      }

    };
//onClick={() => this.handleClick()}
    render(){
      const setButtonState = () => {
        this.setState({buttonText: "Dit boek niet meer lezen"});
      }

      const closePopup = () => {
        this.setState({popup: "none"});
      }

      // const showPopup = () => {
      //   this.setState({popup: "block"});
      // }

      let addButton;
      let popup;
      let overlay;

      if(this.state.buttonText === "Dit boek lezen"){
        addButton = <button className="u-button" onClick={() => this.handleClick()}>{this.state.buttonText}</button>;
        overlay = <div className="u-overlay" style={{display: this.state.popup}}></div>;
        popup = <section className="bibliotheek__popup" style={{display: this.state.popup}}>
          <button className="u-button--close bibliotheek__popup__close-button" onClick={() =>{setButtonState(); closePopup()}}>X</button>
          <h2 className="bibliotheek__popup__title">Het boek is toegevoegd aan je boekenlijst.</h2>
          <section className="bibliotheek__popup__buttonsection">
            <Link className="u-button bibliotheek__popup__buttonsection__button" onClick={() => setButtonState()} to="/boekenlijst">Bekijk boekenlijst</Link>
          </section>
        </section>;
      }else{
        addButton = <button className="u-button" onClick={() =>this.setState({ popup: "block" }) }>{this.state.buttonText}</button>;
        overlay = <div className="u-overlay" style={{display: this.state.popup}}></div>;
        popup = <section className="bibliotheek__popup" style={{display: this.state.popup}}>;
          <h2 className="bibliotheek__popup__title">Weet je zeker dat je boek niet meer wilt lezen?</h2>
          <section className="bibliotheek__popup__buttonsection">
            <button className="u-button bibliotheek__popup__buttonsection__button" onClick={this.handleClick}>{this.state.buttonText}</button>
            <button className="u-button bibliotheek__popup__buttonsection__button" onClick={() =>this.setState({ popup: "none" }) }>Toch wel!</button>
          </section>
        </section>;
      }

      const audio = new Audio("/bibliotheek/" + this.state.audio);

      const start = () => {
        audio.play();
        console.log(this.state.audio);
      }

      return (
      <section>
        {overlay}
        {popup}
        {this.state.persons.map(boek => <div>
          <article className="bookcard--details u-grid--bookcard" onLoad={() =>this.setState({ boek_id: boek.id }) }>
                <div className="u-grid--bookcard__genre genre">
                  <p data-genre={boek.genre_naam} className="genre__naam">{boek.genre_naam}</p>
                </div>
                <img className="u-grid--bookcard__cover bookcard__cover--details" src={"/bibliotheek/" + boek.image} alt="cover {boek.titel}"/>
                <h2 className="u-grid--bookcard__title bookcard--details__title">{boek.titel}</h2>
                <p className="u-grid--bookcard__author bookcard--details__author">{boek.auteur}</p>
              <section className="u-grid--bookcard__description bookcard__description">
                <h3 className="bookcard__description__title">Waar gaat het boek over?</h3>
                <p className="bookcard__description__text">{boek.beschrijving}</p>
              </section>
              <section className="u-grid--bookcard__button">
                {addButton}
              </section>
          </article>
          <article className="bookExtra">
            <section className="u-grid--bookExtra__video bookExtra__video">
              <h2 className="bookExtra__video__title">Bekijk deze video over {boek.hoofdpersoon}!</h2>
              <iframe className="bookExtra__video__frame" width="380" height="200" src={boek.videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </section>
            <section className="u-grid--bookExtra__mainchar bookExtra__mainchar">
              <h2 className="bookExtra__mainchar__title">Wie is {boek.hoofdpersoon}?</h2>
              <img className="bookExtra__mainchar__image" src={"/bibliotheek/" + boek.hoofdpersoon_image} alt={"Plaatje van " + boek.hoofdpersoon} onClick={start}></img>
              <p className="bookExtra__mainchar__description">
                {boek.hoofdpersoon_beschrijving}
              </p>
            </section>
          </article>
        </div>)}
      </section>
    );
    }
}
export default Details;
