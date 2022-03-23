import React from 'react';
import Slider from "react-slick";


export default function Carousel(props) {

    var settings = {
        dots: props.dots,
        infinite: props.infinite,
        speed: props.speed,
        slidesToShow: props.slidesToScroll,
        slidesToScroll: props.slidesToScroll
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    props.imagenes?.map(imagen => (
                        <div>
                            <img src={imagen.link_imagen} width="100%"></img>
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}