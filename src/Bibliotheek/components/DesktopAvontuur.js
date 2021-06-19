import React from 'react';
import "../../App.css"
import '../Genre.css';
import '../BibliotheekDesktop.css';
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";

class BibliotheekDesktop extends React.Component{
    state = {
        boeken: [],
        liked: false,
        boek_id: 0,
    }

    componentDidMount = (props) => {
        axios.get(`http://127.0.0.1:8000/api/bibliotheek/`)
          .then(res => {
            const boeken = res.data;
            this.setState({ boeken: boeken.boeken });
            this.setState({ favorieteBoeken: boeken.favorieten })
            const id = boeken.boeken[0].id;
            if(boeken.favorieten.includes(id) === true){
              this.setState({liked: true});
            }else{
              this.setState({liked: false});
            }
          });
    }

    render(){
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "0px",
            slidesToShow: 5,
            speed: 700,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />
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

        function NextArrow(props) {
            const { className, style, onClick } = props;
            return (
              <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
              />
            );
          }
          
        function PrevArrow(props) {
            const { className, style, onClick } = props;
            return (
              <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
              />
            );
          }

        return(
            <section>
                <section className="genre">
                    <p data-genre="Avontuur" className="genre__naam">Avontuur</p>
                </section>                
                <Slider {...settings}>
                    {this.state.boeken.map(boek => <ul>
                        <li className="bookcard">
                            <figure className="like">
                                <button 
                                  className="hartje"
                                  id="js--hartje"
                                  data-liked = {this.state.heartColor}
                                  onClick={() => {this.setState(boek.id); this.handleClick();}}
                                ></button></figure>
                            <Link to={"/details/" + boek.id}>
                                <img className="bookcard__cover" src={boek.image} alt={"Omslag van boek " + boek.titel} />
                            </Link>
                        </li>
                </ul>)}
                </Slider>
            </section>
        );
    }
}

export default BibliotheekDesktop;