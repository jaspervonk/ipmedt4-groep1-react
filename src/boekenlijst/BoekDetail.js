import React from "react";
import "../App.css";
import "./Components/DetailBoekcard.css";
import DetailBoekcard from "./Components/DetailBoekcard";
import DetailBoekHoofdstuk from "./Components/DetailBoekHoofdstuk";
import DetailVerwijder from "./Components/DetailVerwijder";

import axios from "axios";

class BoekDetail extends React.Component {

    state = {
        titel: "",
        auteur: "",
        image: "",
        hoofdstukken: [],
        gelezenHoofdstukken: [],
        aantalHoofdstukken: 0,
        gelezenHoofdstukkenTeller: 0,
        hoofdstukId: "",
        uitdagingen: [],
        id: ""

    };

    //informatie ophalen voor boek details
    componentDidMount() {
        const BASE_URL = 'https://warm-escarpment-39872.herokuapp.com/api/boekenlijst/detail/';
        let boekId = window.location.pathname.split('/')[3];
        axios.get(BASE_URL + boekId).then(res =>{
            this.setState({
                titel: res.data.titel,
                auteur: res.data.auteur,
                image: res.data.image,
                id: res.data.id
            })
        });

        //informatie ophalen van hoofdstukken en uitdagingen
        var HOOFDSTUK_URL = 'https://warm-escarpment-39872.herokuapp.com/api/hoofdstukken/' + boekId;
        axios.get(HOOFDSTUK_URL).then(res =>{
            if(res.data){
                this.setState({
                    hoofdstukken: res.data.hoofdstukken,
                    aantalHoofdstukken: res.data.hoofdstukken.length,
                    uitdagingen: res.data.uitdagingen,
                })
            }
        });

        //informatie ophalen van gelezen hoofdstukken
        var GELEZEN_URL = 'https://warm-escarpment-39872.herokuapp.com/api/hoofdstukken/gelezen/' + boekId + '/' + this.props.user_id;
        axios.get(GELEZEN_URL).then(res =>{
            this.setState({
                gelezenHoofdstukken: res.data.gelezenHoofdstukken,
                gelezenHoofdstukkenTeller: res.data.gelezenHoofdstukken.length,
            })

            //gelezen hoofdstukken die gelijk zijn aan hoofdstukken, afvinken
            for(var i = 0; i < this.state.gelezenHoofdstukkenTeller; i++){
                document.getElementById(this.state.gelezenHoofdstukken[i].hoofdstuk_id).checked=true;
                if(document.getElementById(i + "K")){
                    document.getElementById(i + "K").innerHTML="uitdaging";
                }
            }
        });

    }

    //afvinken van hoofdstuk update de gelezen_hoofdstukken table
    cardClicked = id => {
        let boekId = window.location.pathname.split('/')[3];
        var AFVINKEN_URL = 'https://warm-escarpment-39872.herokuapp.com/api/hoofdstukken/gelezen/' + boekId + "/" + id + "/" + this.props.user_id;

        //check=true, is toevoegen, check=false, is verwijderen
        //gelezenHoofdstukkenTeller wordt geupdate bij elke checkbox die aangeklikt wordt
        if(document.getElementById(id).checked){
            if(document.getElementById(id + "K")){
                document.getElementById(id + "K").innerHTML="uitdaging";
            }
            axios.post(AFVINKEN_URL);
            this.setState({
                gelezenHoofdstukkenTeller: this.state.gelezenHoofdstukkenTeller + 1
            })
        }  else {
            if(document.getElementById(id + "K")){
                document.getElementById(id + "K").innerHTML="&#128274;";
            }
            axios.delete(AFVINKEN_URL);
            this.setState({
                gelezenHoofdstukkenTeller: this.state.gelezenHoofdstukkenTeller - 1
            })
        }
    }

    //verwijder boek in database
    verwijderBoek = id => {
        var VERWIJDER_URL = 'https://warm-escarpment-39872.herokuapp.com/api/boekenlijst/delete/' + id + "/" + this.props.user_id;
        axios.delete(VERWIJDER_URL).then(res =>{
            window.location.replace("/boekenlijst/");
        })
    }




    render(){
        return(
            <article className="detailboek">
                <DetailBoekcard
                titel={this.state.titel}
                auteur={this.state.auteur}
                image={"/bibliotheek/" + this.state.image}
                hoofdstukken={this.state.aantalHoofdstukken}
                gelezenHoofdstukkenTeller={this.state.gelezenHoofdstukkenTeller}
                />

                <DetailBoekHoofdstuk
                hoofdstukken={this.state.hoofdstukken}
                uitdagingen={this.state.uitdagingen}
                uitdagingId={this.state.uitdagingen.id}
                cardClicked={this.cardClicked}
                />

                <DetailVerwijder
                verwijderBoek={this.verwijderBoek}
                id={this.state.id}
                />
            </article>
        );
    }

}

export default BoekDetail;
