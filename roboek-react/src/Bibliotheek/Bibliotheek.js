import React from 'react';
import './Bibliotheek.css';
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Favoriet from './components/Favoriet';

class Searchbar extends React.Component{
  state = {
    genre: "",
    persons: [], 
    boek_id: '',
    bgColor: "",
    liked: []
  }
  
  componentDidMount() {
    this.setState({
      genre: window.location.pathname.split('/')[2]
    })
    let genreReq = window.location.pathname.split('/')[2];
    axios.get(`http://127.0.0.1:8000/api/bibliotheek/` + genreReq)
      .then(res => {
        const boeken = res.data.boeken;
        const favorieten = res.data.favorieten;
        this.setState({ persons: boeken, liked: favorieten });
        console.log(this.state.liked);
      })
  }
  render(){
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <Arrow type="next" />,
      prevArrow: <Arrow type="prev" />
    };

    function Arrow(props) {
      let className = props.type === "next" ? "nextArrow" : "prevArrow";
      className += " arrow";
      console.log(className);
      const char = props.type === "next" ? "👉" : "👈";
      return (
        <span className={className} onClick={props.onClick}>
          {char}
        </span>
      );
    }
    
    const addToFavorites = (id) =>{
      this.setState({ boek_id: id, bgColor: "red" })
      console.log(this.state.bgColor);
      axios.post('http://127.0.0.1:8000/api/bibliotheek/favorite/' + id, {"id": id})
        .then(res => {  
          const favorite = res.data
          this.setState({ boek_id: favorite })
          console.log(this.state.boek_id);
          console.log(res);


        });
    }

    const DeleteFromFavorites = (id) =>{
      this.setState({ boek_id: id })
      console.log("boek id = " + this.state.boek_id);
      axios.delete('http://127.0.0.1:8000/api/bibliotheek/favorite/' + id, {"id": id})
        .then(res => {  
          const favorite = res.data
          this.setState({ boek_id: favorite })
          console.log(this.state.boek_id);
          console.log(res);
        });
    }

    return (
      <section>
        <h1>Bibliotheek</h1>
        <section className="genre">
            <p data-genre={this.state.genre} className="genre__naam">{this.state.genre}</p>
        </section>
        <Slider {...settings}>
            {this.state.persons.map(boek => <div>
                <article className="bookcard">
                    <Favoriet 
                      favoriet={boek.id}
                      liked={this.state.liked}
                      clickHandler={addToFavorites}
                      key={boek.id}
                    />
                    <Link to={"/details/" + boek.id}>
                      <img className="bookcard__cover" src={boek.image} alt="cover {boek.titel}"/>
                    </Link>
                    <section className="u-buttonSection">
                        <Link to={"/details/" + boek.id} className="u-button">Ontdek mij</Link>
                    </section>
                </article>
            </div>)}
        </Slider>
      </section>
    );
  }
}
export default Searchbar;