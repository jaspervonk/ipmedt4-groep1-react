import React from 'react';
import "./Woordzoeker.css";
import "../App.css";
import axios from "axios";
import WoordzoekerMatrix from "./components/WoordzoekerMatrix";
import WoordzoekerInvoer from "./components/WoordzoekerInvoer";
import WoordzoekerGevonden from "./components/WoordzoekerGevonden";
import WoordzoekerBericht from "./components/WoordzoekerBericht";

const letters = "abcdefghijklmnopqrstuvwxyz";
const lijst = document.getElementsByClassName("woordzoeker__matrix_letter")
var puzzelId;
var woordenMatrix;
var geradenWoorden = [];
var aantalGeradenWoorden = geradenWoorden.length;
var result = ""
var aantalFout = 0;
var telOp = true;
var lengteWoord;
var teGeradenWoorden;
var aantalWoorden;


class WoordzoekerPuzzel extends React.Component {
  state = {
    puzzelId: "",
    bericht: "",
    list: [],
    gevonden: 0,
    matrix: "",
    antwoorden: "",
    woordzoekerMatrix: []
  };


//Haalt de informatie uit de API
  componentDidMount() {
    const BASE_URL = 'https://warm-escarpment-39872.herokuapp.com/api/puzzel/'
    let puzzelId = window.location.pathname.split('/')[4];
    axios.get(BASE_URL+ puzzelId)
      .then(res => {
        if(res.data){
          if(res.data.soort === "Woordzoeker"){
            this.setState({matrix: res.data.vraag, antwoorden: res.data.antwoorden, puzzelId: res.data.id})
            this.flipMatrixAxis(this.state.matrix)
            this.maakMatrix()
          } else {
            //window.location.replace("/")
          }

        } else {
          //window.location.replace("/")
        }
      })
  }

//Maakt de matrix op basis van de API invoer
  maakMatrix = () => {
    puzzelId = this.state.puzzelId
    woordenMatrix = this.state.matrix;
    teGeradenWoorden = this.state.antwoorden.split(" ");
    aantalWoorden = teGeradenWoorden.length;
    for(var i = 0; i < woordenMatrix.length; i++){
      let letter;
      if(woordenMatrix[i] === "0"){
        letter = letters[Math.floor(Math.random() * 26)];
      } else {
        letter = woordenMatrix[i];
      }
      let invoer = <li key={i} className="woordzoeker__matrix_letter"> {letter} </li>
      this.setState({
        woordzoekerMatrix: [...this.state.woordzoekerMatrix, invoer]
      })
    }
  }

//Laat de hint knop zien na paar keer fout antwoord ingevoerd te hebben
  showHint = () => {
    if(aantalFout === 2){
      document.getElementById("js--hint-button").style.display = "block";
      aantalFout = 0
    } else {
      aantalFout += 1;
    }
  }

//Geeft een hint als de hint knop wordt ingedrukt
  geefHint = () => {
    for(var i = 0; i < aantalWoorden; i++){
      var antwoorden = this.state.antwoorden.split(" ")
      if(this.state.list.includes(antwoorden[i])){
      } else {
        document.getElementById("js--hint-button").style.display = "none";
        this.streepDoorHorizontaal(antwoorden[i], "true");
        this.streepDoorVerticaal(antwoorden[i], "true");
        break;
      }
    }
  }

//Checkt of het woord in de woordzoeker zit
  checkWoord = (event) => {
    var antwoorden = this.state.antwoorden.split(" ")
      if(event.key === "Enter" || event === "Enter" ){
        var ingevoerdeWoord = document.getElementById("woord").value;
        ingevoerdeWoord = ingevoerdeWoord.toLowerCase();
        for(var i = 0; i < aantalWoorden; i++){
          if(ingevoerdeWoord === ""){
            this.setState({
              bericht: "Je hebt niks ingevoerd. Probeer opnieuw!"
            });
            {this.veranderKleur("#FF8847")};
            telOp = false;
            break;
          } else {
            if(antwoorden[i] === ingevoerdeWoord){
              if(this.state.list.includes(ingevoerdeWoord)){
                this.setState({
                  bericht: "Je hebt dat woord al ingevoerd. Probeer opnieuw!"
                });
                {this.veranderKleur("#FF8847")};
                telOp = false;
                break;
              } else {
                document.getElementById("woord").value = null;
                this.setState({
                  list: [...this.state.list, ingevoerdeWoord],
                  gevonden: this.state.gevonden + 1,
                  bericht: "Hoera! dat woord zit er in, ga zo door!"
                });
                document.getElementById("js--hint-button").style.display = "none";
                aantalGeradenWoorden += 1;
                geradenWoorden.push(ingevoerdeWoord);
                {this.veranderKleur("#A1EDA5")};
                this.streepDoorHorizontaal(ingevoerdeWoord);
                this.streepDoorVerticaal(ingevoerdeWoord);
                aantalFout = 0;
                if(aantalGeradenWoorden === aantalWoorden){
                  setTimeout(function(){ window.location.replace("/gefeliciteerd/" + puzzelId); }, 1000);
                }
                break;
              }
            } else {
              this.setState({
                bericht: "Dit woord zit er niet in. Probeer opnieuw!"
              });
              {this.veranderKleur("#FF8847")};
              telOp = true;
            }
          }
        }
        if(telOp){
          {this.showHint()};
        }
      }
  }
//Geeft de kleur van de hint
  veranderKleur = (kleur, hint) => {
    document.getElementById("js--bericht").style.background = kleur;
  }

//Draait de code van de matrix om zodat hij te lezen is voor verticaal
  flipMatrixAxis = (horizontalMatrix, width = 10, height = 10) => {
      for (let widthIndex = 0; widthIndex < width; widthIndex++) {
          for (let heightIndex = 0; heightIndex < height; heightIndex++) {
              result += horizontalMatrix[(heightIndex * height) + widthIndex]
          }
      }
  }

//Zoekt het woord of hij verticaal is en streept hem door
  streepDoorVerticaal = (woord, hint) => {
    var positie;
    lengteWoord = woord.length;
    var plekInVerticaal = result.search(woord);
    var array = plekInVerticaal.toString().split("")
    if(array.length === 2){
      positie = array[1] + array[0];
    } else {
      positie = array[0] + 0;
    }
    positie = parseInt(positie);
    for(var i = 0; i < lengteWoord; i++){
      var plekInLijstVerticaal = positie + (i * 10);
      if(plekInVerticaal < 0){
        break;
      } else {
        if(hint){
          this.geefKleur(plekInLijstVerticaal, "oranje");
          break;
        } else {
          this.geefKleur(plekInLijstVerticaal, "groen");
        }
      }
    }
  }

//Zoekt het woord of hij horizontaal is en streept hem door
  streepDoorHorizontaal = (woord, hint) => {
    lengteWoord = woord.length;
    var plekInHorizontaal = this.state.matrix.search(woord);
    for(var i = 0; i < lengteWoord; i++){
        var plekInLijstHorizontaal = plekInHorizontaal + i;
        if(plekInLijstHorizontaal < 0){
          break;
        } else {
          if(hint){
            this.geefKleur(plekInLijstHorizontaal, "oranje");
            break;
          } else {
            this.geefKleur(plekInLijstHorizontaal, "groen");
          }
        }
    }
  }

//Geeft de kleur in de woordzoeker
  geefKleur = (plekInLijst, kleur) => {
    if(kleur === "groen"){
      lijst.item(plekInLijst).style.backgroundColor = "#A1EDA5";
    } else {
      lijst.item(plekInLijst).style.backgroundColor = "#FF8847";
    }
  }

//rendert de html
  render(){
    return (
      <article className="woordzoeker">
        <WoordzoekerMatrix matrix={this.state.woordzoekerMatrix}/>
        <WoordzoekerInvoer gevonden={this.state.gevonden} aantal={aantalWoorden} functie={this.checkWoord}/>
        <WoordzoekerBericht bericht={this.state.bericht} functie={this.geefHint}/>
        <WoordzoekerGevonden list={this.state.list}/>
      </article>
    )
  }
}
export default WoordzoekerPuzzel;
