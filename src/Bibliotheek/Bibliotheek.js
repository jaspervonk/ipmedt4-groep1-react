import React from 'react';
import './Bibliotheek.css';
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Favoriet from './components/Favoriet';

class Bibliotheek extends React.Component{
  state = {
    genre: "",
    persons: [],
    boek_id: 0,
    heartColor: false,
    liked: []
  }

  componentDidMount() {
    let pathname = window.location.pathname.split('/')[2];
    if(pathname !== undefined){
      this.setState({
        genre: window.location.pathname.split('/')[2]
      })
      let genreReq = window.location.pathname.split('/')[2];
      axios.get(`https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/` + genreReq)
        .then(res => {
          const boeken = res.data.boeken;
          const favorieten = res.data.favorieten;
          this.setState({ persons: boeken, liked: favorieten});
        })
    }else{
      axios.get(`https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/`)
      .then(res => {
        const boeken = res.data.boeken;
        const favorieten = res.data.favorieten;
        this.setState({ persons: boeken, liked: favorieten});
      })
    }
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if(this.state.liked.includes(this.state.boek_id)){
      axios.post('https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/favorite/' + this.state.boek_id, {"id": this.state.boek_id, "genre": this.state.genre}).then(res => {
        const favos = res.data;
        const id = favos.boeken.id;
        if(favos.favorieten.includes(id) === true){
          this.setState({heartColor: true});
        }else{
          this.setState({heartColor: ""});
        }
      });
    }else{
      axios.delete('https://warm-escarpment-39872.herokuapp.com/api/bibliotheek/favorite/delete/' + this.state.boek_id, {id: this.state.boek_id, genre: this.state.genre}).then(res => {
        const boeken = res.data;
        const id = boeken.boeken[0].id;
        if(boeken.favorieten.includes(id) === true){
          this.setState({heartColor: true});
        }else{
          this.setState({heartColor: ""});
        }
      });
    }
  };

  render(){
    const settings = {
      dots: false,
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
      const char = props.type === "next" ? "👉" : "👈";
      return (
        <span className={className} onClick={props.onClick}>
          {char}
        </span>
      );
    }

    let checkIfLiked = (id) => {
      if(this.state.liked.includes(id) === true){
        return true;
      }else{
        return false;
      }
    }

    return (
      <section>
        <section className="genre">
            <p data-genre={this.state.genre} className="genre__naam">{this.state.genre}</p>
        </section>
        <Slider {...settings}>
            {this.state.persons.map(boek => <div>
                <article className="bookcard">
                <Favoriet boek_id={boek.id} favorieten={this.state.liked} liked={checkIfLiked(boek.id)}/>
                <Link to={"/details/" + boek.id}>
                  <img className="bookcard__cover" src={boek.image} alt={"cover " + boek.titel + " " + boek.genre_naam} />
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
export default Bibliotheek;
