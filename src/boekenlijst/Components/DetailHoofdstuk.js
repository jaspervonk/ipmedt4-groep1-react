import React from "react";
import "./DetailHoofdstuk.css";

class DetailHoofdstuk extends React.Component {

    onCardClicked = () => {
        this.props.cardClicked(this.props.id);
    }

    componentDidUpdate = () => {
        // krijg gelezenHoofdstukken binnen via props (altijd)


        // check of deze niet leeg is, anders skip .checked=true
        // if this.props.gelezenHoofdstukken yadayada
        // for(var i = 0; i < gelezenHoofdstukken.length; i++){
        //     document.getElementById(gelezenHoofdstukken[i].hoofdstuk_id).checked=true;
        //     if(document.getElementById(i + "K")){
        //         document.getElementById(i + "K").innerHTML="uitdaging";
        //     }
        // }
    }

    //Elk hoofdstuk als component, checkbox met id van hoofdstuk_id
    render(){
        return(
            <section className="afvinksection">
                <h3 className="afvinksection__titel">{this.props.titel}</h3>
                <label className="afvinksection__checkbox">
                    <input type="checkbox" id={this.props.id} onClick={this.onCardClicked}></input>
                    <span className="afvinksection__checkmark"></span>
                </label>
                
            </section>
        );
        }
}

export default DetailHoofdstuk;