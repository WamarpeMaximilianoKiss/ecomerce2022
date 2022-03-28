import React from 'react';
import Slider from "react-slick";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export default function Carousel(props) {

    var settings = {
        dots: props.dots,
        infinite: props.infinite,
        speed: props.speed,
        slidesToShow: props.slidesToScroll,
        slidesToScroll: props.slidesToScroll,
        autoplay: props.autoplay,
    };



    return (
        <div>
            <Slider {...settings}>
                {
                    props.imagenes?.map(imagen => (
                        <div>
                            <img src={imagen.link_imagen} width={props.width} height={props.height}></img>
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}