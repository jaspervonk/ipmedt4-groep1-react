import React from 'react';
import "../App.css";
import "./Gefeliciteerd.css";
import axios from "axios";
import Confetti from 'react-dom-confetti';

//voor de confetti
const config = {
  angle: 270,
  spread: 180,
  startVelocity: 20,
  elementCount: 300,
  dragFriction: .1,
  duration: 10000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "100%",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};





class Gefeliciteerd extends React.Component{
  state= {
    muntjes: 0,
    medaille: 0,
    medaille_naam: ""
  }

  componentDidMount() {
      //haalt de puzzel op en daarbij het aantal muntjes die je kan verdienen
    const BASE_URL = 'https://warm-escarpment-39872.herokuapp.com/api/puzzel/'
      let puzzelId = window.location.pathname.split('/')[2];
      if(puzzelId === ""){
        window.location.replace("/");
      } else {
        axios.get(BASE_URL+ puzzelId)
          .then(res => {
            if(res.data){
              this.setState({
                muntjes: res.data.beloning
              })
              if(res.data.medaille_id){
                this.setState({
                  medaille: res.data.medaille_id
                })
                //haalt de medaille op die je bij deze puzzel eventueel kan verdienen
                const MEDAILLE_URL = 'https://warm-escarpment-39872.herokuapp.com/api/medaille/' + this.state.medaille
                axios.get(MEDAILLE_URL)
                  .then(res => {
                    //als er een medaille is gevonden bij de uitdaging, laat dan de melding zien dat de gebruiker deze heeft gekregen
                    if(res.data){
                      this.setState({
                        medaille_naam: res.data.naam
                      })
                      document.getElementById("js--medaille").style.display = "block";
                    }
                  })
              } else {
                document.getElementById("js--medaille").style.display = "none";
              }
            } else {
              window.location.replace("/");
            }
          })
      }
  }

  //redirect als gebruiker op knop drukt en voegt de muntjes toe aan gebruiker en geeft eventuele medailles
  redirect = () => {
    if(this.state.medaille){
      var VERDIEN_URL = 'https://warm-escarpment-39872.herokuapp.com/api/verdienmedaille/' + this.props.user_id + "/" + this.state.medaille_id
      axios.post(VERDIEN_URL);
    }
    var URL = 'https://warm-escarpment-39872.herokuapp.com/api/puzzelklaar/' + this.props.user_id + "/" + this.state.muntjes;
    axios.patch(URL)
    window.location.replace("/");
  }

  //rendert alle html
  render(){
    return(
      <article className="gefeliciteerd">
        <Confetti className="confetti" active={ this.state.muntjes } config={ config }/>
        <h1 className="gefeliciteerd_h1">Gefeliciteerd!</h1>
        <p className="gefeliciteerd_p">De uitdaging is gelukt. <br /> Je hebt {this.state.muntjes} muntjes verdiend! </p>
        <p className="gefeliciteerd_p" id="js--medaille">Je hebt ook de [{this.state.medaille_naam}] medaille verdiend!</p>
        <button className="gefeliciteerd__button button_green" onClick={this.redirect}>Ga verder</button>
      </article>
    )}
}


export default Gefeliciteerd;
