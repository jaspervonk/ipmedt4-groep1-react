import React from "react";
import "../App.css"
import "./Components/Boekcard.css";
import BoekcardList from "./Components/BoekcardList";
import EmptyBoekcard from "./Components/EmptyBoekcard";


import axios from "axios";

class Boekenlijst extends React.Component {

    state = {
        boeken: [],
    };

    //informatie ophalen voor de boekcards
    componentDidMount() {
        const BASE_URL = 'https://warm-escarpment-39872.herokuapp.com/api/boekenlijst/'
        axios.get(BASE_URL + this.props.user_id).then(res =>{
            console.log(res.data);
            this.setState({
                boeken: res.data.boeken,
            })
        });

        
    }


    render(){
        
        //checken of de user boeken heeft
        if(this.state.boeken.length === 0){
           return (<EmptyBoekcard />
            );

        } else{
            
            return(
                <BoekcardList 
                    boeken={this.state.boeken}
                />
            );
        }
    }

}
    
export default Boekenlijst;