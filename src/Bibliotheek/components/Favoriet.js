import React from 'react';
import '../Genre.css';
import '../Bibliotheek.css';
import axios from "axios";

class Favoriet extends React.Component{
    state = {
        favoriete_boeken: this.props.favorieten,
        boek_id: '',
        heartColor: this.props.liked
    }

    addToFavorites = (props) =>{
        axios.post('https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/favorite/' + this.props.boek_id, {"id": this.props.boek_id})
          .then(res => {  
            const favorite = res.data.favorieten;
            console.log(favorite);
            this.setState({favoriete_boeken: favorite});
          });
    };

    DeleteFromFavorites = (props) =>{
        axios.delete('https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/favorite/delete/' + this.props.boek_id, {"id": this.props.boek_id})
        .then(res => {  
            console.log(res.data);
            const favorite = res.data.favorieten;
            console.log(favorite);
            this.setState({favoriete_boeken: favorite});
          });
    }

    updateHeart = (props) => {
        const boekId = this.props.boek_id;
        const favos = this.state.favoriete_boeken;
        this.setState({favoriete_boeken: favos})

        console.log(favos);
        console.log(boekId);

        if(favos.includes(boekId) === true){
            console.log("Eruit");
            this.setState({heartColor: false});
            this.DeleteFromFavorites();
        }else{
            console.log("Erin");
            this.setState({heartColor: true});
            this.addToFavorites();
        }
    };
    
    onloadHeart = (props) => {
        console.log("Running");
        if(this.props.favoriete_boeken.includes(this.props.allIds) === true){
            this.setState({heartColor: true});
        }else{
            this.setState({heartColor: false});
        }
    }

    render(){
        return (
            <figure className="like">
                <button 
                    className="hartje"
                    id="js--hartje"
                    data-liked = {this.state.heartColor}
                    onClick = {this.updateHeart}
                ></button>   
            </figure>
        );
    }
    
}

export default Favoriet;