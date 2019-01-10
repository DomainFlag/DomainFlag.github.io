import React from 'react';
import {Component} from 'react';

import render from './Animation';

import background from "../../resources/home/stardust.jpg";
import cv from "./../../assets/Cristian_Chivriga_Resume.pdf";

import "./Home.sass";

const imageStyle = {
    backgroundImage : `url(${background})`,
    backgroundRepeat : 'repeat',
    backgroundSize : 'contain'
};

export class Home extends Component {
    constructor(props) {
        super(props);

        this.component = React.createRef();
        this.rootAnimation = React.createRef();
    }

    componentDidMount = () => {
        let viewPortHeight = this.component.current.clientHeight;
        let viewPortWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.offsetWidth,
            document.documentElement.clientWidth);

        render(this.rootAnimation, viewPortWidth, viewPortHeight);
    };

    receiveClientHeight = () => {
        return this.component.current.clientHeight;
    };

    render = () => (
        <section id="home" ref={this.component}>
            <img id="home_background" style={imageStyle}/>

            <div id="home_animation" ref={this.rootAnimation}/>

            <div id="welcoming_container">
                <div id="container_elements">
                    <a href="https://github.com/DomainFlag" target="_blank" rel="noopener noreferrer" className="welcoming_images_container">
                        Github
                    </a>
                    <a href={cv} target="_blank" rel="noopener noreferrer" className="welcoming_images_container">
                        Resume
                    </a>
                </div>
            </div>
            <div id="welcoming_text">
                <div id="welcoming_text_container">
                    <h1 id="welcoming_text_header">Hi! I'm Cristian.</h1>
                    <h1 id="welcoming_text_subheader">I am a 21 years old CS student who is passionated about software development, driven to build things that matter.</h1>
                </div>
            </div>
        </section>
    )
}