import React from 'react';
import './Genre.css';
import './Bibliotheek.css';
import axios from "axios";
import { Link } from "react-router-dom";
import BibliotheekDesktop from './BibliotheekDesktop';


class Genre extends React.Component{
    state = {
        genres: []
    }
    componentDidMount() {
        axios.get(`https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/choose/genre`)
          .then(res => {
            const genres = res.data;
            this.setState({ genres });
          })
      }

    render(){
        if(window.innerWidth <= 900){
            return(
                    <ul>
                        <h1 className="genre__header"> Kies een Genre! </h1>
                        {this.state.genres.map(genre => <li className="genre">
                            <Link className="genre__naam" data-genre={genre.naam} to={'/bibliotheek/' + genre.naam}>{genre.naam}</Link>
                        </li>)}
                        <li className="genre"><Link className="genre__naam" data-genre="Alle_boeken" to={'/bibliotheek/'}>Alle boeken</Link></li>
                    </ul>
            );
        }else{
            return(
                <BibliotheekDesktop />
            );
        }

    }
}

export default Genre;
