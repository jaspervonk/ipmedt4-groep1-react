import React from 'react';
import '../App.css';
import './Genre.css';
import './BibliotheekDesktop.css';

import Genre from "./components/DesktopGenreSlinder";

class BibliotheekDesktop extends React.Component{
    
    render(){
        return(
            <article>
                <Genre genre="Avontuur" />
                <Genre genre="Dieren&Natuur" cssData="DierenNatuur"/>
                <Genre genre="Griezelverhaal" />
                <Genre genre="Humor" />
                <Genre genre="Sprookjes" />
                <Genre genre="Vriendschap&Verliefd" cssData="VriendschapVerliefd" />
            </article>
        );
    }
}

export default BibliotheekDesktop;