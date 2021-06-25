import React from "react";
import axios from "axios";
import './Boekenkast.css';

import BoekenkastMedailles from "./Components/BoekenkastMedailles";
import BoekenkastItems from "./Components/BoekenkastItems";
import BoekenkastProfiel from "./Components/BoekenkastProfiel";

class Boekenkast extends React.Component{
  state = {
    aanzicht: 2,
    buttonTextLeft: "Medailles",
    buttonTextRight: "Profiel",
    boekenkast: [],
    eigenaar: [],
    boekenkast_medailles: [],
    boekenkast_items: [],
    behaalde_medailles: [],
    behaalde_items: [],
  }

  componentDidMount() {
    const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/boekenkast/";
    axios.get(BASE_URL + this.props.user_id).then(res => {
      this.setState({
        boekenkast: res.data.boekenkast,
        eigenaar: res.data.eigenaar,
        boekenkast_medailles: res.data.boekenkast_medailles,
        boekenkast_items: res.data.boekenkast_items,
        behaalde_medailles: res.data.behaalde_medailles,
        behaalde_items: res.data.behaalde_items,
      });
    })
  }

  refreshBoekenkast = () => {
    const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/boekenkast/";
    axios.get(BASE_URL + this.props.user_id).then(res => {
      this.setState({
        boekenkast: res.data.boekenkast,
        eigenaar: res.data.eigenaar,
        boekenkast_medailles: res.data.boekenkast_medailles,
        boekenkast_items: res.data.boekenkast_items,
        behaalde_medailles: res.data.behaalde_medailles,
        behaalde_items: res.data.behaalde_items,
      });
    })
  }

  handleLeftClick = () => {
    if(this.state.aanzicht === 1){this.setState({aanzicht: 3});}
    else{this.setState({aanzicht: this.state.aanzicht - 1});}
  }

  handleRightClick = () => {
    if(this.state.aanzicht === 3){this.setState({aanzicht: 1});}
    else{this.setState({aanzicht: this.state.aanzicht + 1});}
  }

  render(){
    let boekenkast;
    let buttonTextLeft;
    let buttonTextRight;

    switch(this.state.aanzicht){
      case(1):
        buttonTextLeft = "Profiel";
        buttonTextRight = "Voorwerpen";
        boekenkast = <BoekenkastMedailles kast_kleur_primary={this.state.boekenkast.kast_kleur_primary || "#38290f"} kast_kleur_secondary={this.state.boekenkast.kast_kleur_secondary || "#110d05"} boekenkast_medailles={this.state.boekenkast_medailles} behaalde_medailles={this.state.behaalde_medailles} user_id={this.props.user_id} refreshBoekenkast={this.refreshBoekenkast} />;
        break;
      case(2):
        buttonTextLeft = "Medailles";
        buttonTextRight = "Profiel";
        boekenkast = <BoekenkastItems kast_kleur_primary={this.state.boekenkast.kast_kleur_primary || "#38290f"} kast_kleur_secondary={this.state.boekenkast.kast_kleur_secondary || "#110d05"} boekenkast_items={this.state.boekenkast_items} behaalde_items={this.state.behaalde_items} user_id={this.props.user_id} refreshBoekenkast={this.refreshBoekenkast}/>;
        break;
      case(3):
        buttonTextLeft = "Voorwerpen";
        buttonTextRight = "Medailles";
        boekenkast = <BoekenkastProfiel kast_kleur_primary={this.state.boekenkast.kast_kleur_primary || "#38290f"} kast_kleur_secondary={this.state.boekenkast.kast_kleur_secondary || "#110d05"} naam={this.state.eigenaar.naam} saldo={this.state.eigenaar.saldo} aantal_medailles={this.state.eigenaar.aantal_medailles} aantal_boeken={this.state.eigenaar.aantal_boeken} behaalde_medailles={this.state.behaalde_medailles}/>;
        break;
      default:
        break;
    }

    return(
      <React.Fragment>
        {boekenkast}
        <section className="boekenkastButtonSection">
          <button className="boekenkastButtonSection__button boekenkastButtonSection__button--left u-box-shadow" onClick={this.handleLeftClick}><i className="icon-caret-left"></i> {buttonTextLeft} </button>
          <button className="boekenkastButtonSection__button boekenkastButtonSection__button--right u-box-shadow" onClick={this.handleRightClick}>{buttonTextRight} <i className="icon-caret-right"></i></button>
        </section>
      </React.Fragment>
    );
  }
}

export default Boekenkast;
