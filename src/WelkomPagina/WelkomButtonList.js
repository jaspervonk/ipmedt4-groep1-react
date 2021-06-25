import React from 'react';
import axios from 'axios'; // Post request voor gebruiker namen

import './WelkomButtonList.css'

export default class WelkomButtonList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {voornaam: "",leukenaam: ""};

    this.onChangeVoornaam = this.onChangeVoornaam.bind(this);
    this.onChangeLeukenaam = this.onChangeLeukenaam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeVoornaam (e) {
    this.setState({ voornaam: e.target.value })
  }
  onChangeLeukenaam (e) {
    this.setState({ leukenaam: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault();

    const userObject = {
      voornaam: this.state.voornaam,
      leukenaam: this.state.leukenaam
    };

    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
       }
    }

    axios.defaults.headers.post['header1'] = 'value'

    axios.post("https://warm-escarpment-39872.herokuapp.com/api/user/create", userObject, config)
      .then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });

    this.setState({ voornaam: "", leukenaam: "" })
    window.location.replace("/boekenlijst")
  }

  render() {
    return (
      <section className="naamInput" >
        <form className="naamInput__form" onSubmit={this.onSubmit}>
          <input type="text" id="voornaam" placeholder="Voer hier je naam in" className="naamInput__form__input"
            onChange={this.onChangeVoornaam}
            value={this.state.voornaam}
          />
          <input type="text" id="leukenaam" placeholder="Vul een leuke naam in" className="naamInput__form__input"
            onChange={this.onChangeLeukenaam}
            value={this.state.leukenaam}
          />
          <button type="submit" className="submitBtn">Klaar</button>
        </form>
      </section>
    );
  }
}
