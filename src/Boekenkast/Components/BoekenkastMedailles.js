import React from "react";
import axios from "axios";
import './BoekenkastMedailles.css';

class BoekenkastMedailles extends React.Component{
  state = {
    popup: false,
    selectedSlot: 0,
  }

  togglePopup = (index) => {
    this.setState({
      popup: !this.state.popup,
      selectedSlot: index,
    })
  }

  updateMedaille = (slot, medaille_id) => {
    this.togglePopup(slot);
    const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/boekenkast/update/medaille/";
    axios.put(BASE_URL +  this.props.user_id, {"slot": slot, "medaille_id": medaille_id, _method: 'patch'})
      .then(res => {
        this.props.refreshBoekenkast();
      });
  }


  render(){
    return(
      <React.Fragment>
        <article className="boekenkast">
          <section className="boekenkastSection--top" style={{background: this.props.kast_kleur_primary}}>
            {!this.state.popup &&

              <article className="medaillesSection">
                <h1 className="medaillesSection__header"> Medailles </h1>
                <ul className="medaillesSection__list">
                  {this.props.boekenkast_medailles.map((medaille, index) =>
                    <li slot={index+1} className="medaillesSection__listItem" key={index}>
                      <a className="medailleSection__button" onClick={() => this.togglePopup(index+1)}>
                        <figure className="medaillesSection__medailleslot">
                          <img className="medaillesSection__medailleslot__image" src={medaille.image} alt={medaille.naam + " Medaille"} />
                        </figure>
                      </a>
                    </li>
                  )}
                </ul>
              </article>

            }

            {this.state.popup &&

              <article className="medaillesPopup">
                <h1 className="medaillesPopup__header"> Kies een Medaille </h1>
                <ul className="medaillesPopup__list">
                {this.props.behaalde_medailles.map((medaille, index) =>
                  <li slot={index+1} className="medaillesPopup__listItem" key={index}>
                    <a className="medaillesPopup__medailleCard" onClick={() => this.updateMedaille(this.state.selectedSlot, medaille.id)}>
                      <figure className="medaillesPopup__medailleCard__figure">
                        <img className="medaillesPopup__medailleCard__image" src={medaille.image} alt={medaille.naam + " Medaille"} />
                      </figure>
                      <section className="medaillesPopup__medailleCard__beschrijving">
                        <h1 className="medaillesPopup__medailleCard__beschrijving__header"> {medaille.naam} </h1>
                        <p className="medaillesPopup__medailleCard__beschrijving__text"> {medaille.beschrijving} </p>
                      </section>
                    </a>
                  </li>
                )}
                </ul>
                <button className="medaillesPopup__button" onClick={() => this.togglePopup(0)}> <i className="icon-caret-left"></i> Annuleren  </button>
              </article>

            }
          </section>
          <section className="boekenkastSection--bottom" style={{background: this.props.kast_kleur_primary}}>
          </section>
        </article>

      </React.Fragment>
    );
  }
}

export default BoekenkastMedailles;
