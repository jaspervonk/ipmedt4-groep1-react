import React from "react";
import axios from "axios";
import './BoekenkastItems.css';

class BoekenkastItems extends React.Component{
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

  updateItem = (slot, item_id) => {
    this.togglePopup(slot);
    const BASE_URL = "https://warm-escarpment-39872.herokuapp.com/api/boekenkast/update/item/";
    axios.put(BASE_URL +  this.props.user_id, {"slot": slot, "item_id": item_id, _method: 'patch'})
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

            <article className="itemsSection__container">
              <ul className="itemsSection__bookshelf" style={{background: this.props.kast_kleur_secondary}}>
                <li className="itemSection__shelfBook itemsSection__shelfBook--red">
                  <div className="itemsSection__shelfBook__Label--high"></div>
                </li>
                <li className="itemSection__shelfBook itemsSection__shelfBook--green">
                  <div className="itemsSection__shelfBook__Label--low"></div>
                </li>
                <li className="itemSection__shelfBook itemsSection__shelfBook--yellow">
                  <div className="itemsSection__shelfBook__Label--high"></div>
                </li>
                <li className="itemSection__shelfBook itemsSection__shelfBook--purple itemsSection__shelfBook--tilted">
                  <div className="itemsSection__shelfBook__Label--high"></div>
                  <div className="itemsSection__shelfBook__Label--low"></div>
                </li>
                <li className="itemSection__shelfBook itemsSection__shelfBook--blue">
                  <div className="itemsSection__shelfBook__Label--high"></div>
                </li>
              </ul>
              <ul className="itemsSection__itemshelf" style={{background: this.props.kast_kleur_secondary}}>
                {this.props.boekenkast_items.map((item, index) =>
                  <li slot={index+1} className="itemsSection__itemslot" key={index}>
                    <a className="itemsSection__button" onClick={() => this.togglePopup(index+1)}>
                      <figure className="itemsSection__itemslot__figure">
                        <img className="itemsSection__itemslot__image" src={item.image} alt={item.naam} />
                      </figure>
                    </a>
                  </li>
                )}
              </ul>
            </article>

          }

          {this.state.popup &&

            <article className="itemsPopup">
              <h1 className="itemsPopup__header"> Kies een Item </h1>
              <ul className="itemsPopup__list">
              {this.props.behaalde_items.map((item, index) =>
                <li slot={index+1} className="itemsPopup__listItem" key={index}>
                  <a className="itemsPopup__itemCard" onClick={() => this.updateItem(this.state.selectedSlot, item.id)}>
                    <figure className="itemsPopup__itemCard__figure">
                      <img className="itemsPopup__itemCard__image" src={item.image} alt={item.naam + " Medaille"} />
                    </figure>
                    <section className="itemsPopup__itemCard__beschrijving">
                      <h1 className="itemsPopup__itemCard__beschrijving__header"> {item.naam} </h1>
                      <p className="itemsPopup__itemCard__beschrijving__text"> {item.beschrijving} </p>
                    </section>
                  </a>
                </li>
                )}
                </ul>
                <button className="itemsPopup__button" onClick={() => this.togglePopup(0)}> <i className="icon-caret-left"></i> Annuleren  </button>
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

export default BoekenkastItems;
