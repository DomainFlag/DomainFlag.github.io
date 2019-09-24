import React from 'react';
import {Component} from 'react';

import animator from './Animation';

import background from "../../resources/home/stardust.jpg";
import cv from "./../../assets/resume.pdf";

import "./Home.sass";

const imageStyle = {
    backgroundImage : `url(${background})`,
    backgroundRepeat : 'repeat',
    backgroundSize : 'contain'
};

export class Home extends Component {

    static BIRTHDAY_DATE_SECRET = "02/21/1997";

    constructor(props) {
        super(props);

        this.state = {
            display : true,
            age : this.computeAge()
        };

        this.animator = null;
        this.component = React.createRef();
        this.rootAnimation = React.createRef();
    }

    componentDidMount = () => {
        this.draw();
    };

    draw = () => {
        let viewPortHeight = this.component.current.clientHeight;
        let viewPortWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.offsetWidth,
            document.documentElement.clientWidth);

        if(this.animator == null) {
            this.animator = animator(this.rootAnimation)
        }

        this.animator.render(viewPortWidth, viewPortHeight);
    };

    onResizeEvent = (event) => {
        this.draw();
    };

    componentDidUpdate = () => {
        if(this.state.promise) {
            this.state.promise();

            this.setState({
                promise : null
            });
        }
    };

    receiveClientHeight = () => {
        return this.component.current.clientHeight;
    };

    onDisplayComponent = (state, promise) => {
        this.setState({
            promise,
            display : state
        });
    };

    computeAge = () => {
        let birth = new Date(Home.BIRTHDAY_DATE_SECRET);
        let offset = (new Date()).getTime() - birth.getTime();

        return Math.floor(offset / 1000 / 3600 / 24 / 365);
    };

    render = () => (
        <section id="home" ref={this.component} style={{display : (this.state.display ? "flex" : "none")}}>
            <div id="home_background" style={imageStyle}/>

            <div id="home_animation" ref={this.rootAnimation}/>

            <div id="welcoming_container">
                <div id="container_elements">
                    <a href="https://github.com/DomainFlag" target="_blank" rel="noopener noreferrer">
                        Github
                    </a>
                    <a href="https://www.linkedin.com/in/cchivriga/" target="_blank" rel="noopener noreferrer">
                        Linkedin
                    </a>
                    <a href={cv} target="_blank" rel="noopener noreferrer">
                        Resume
                    </a>
                </div>
            </div>
            <div id="welcoming_text">
                <div id="welcoming_text_container">
                    <h1 id="welcoming_text_header">Hi! I'm Cristian.</h1>
                    <h1 id="welcoming_text_subheader">I am a { this.state.age } years old CS student about to graduate,
                        passionate about software development and driven to build things that matter.</h1>
                </div>
            </div>
        </section>
    )
}