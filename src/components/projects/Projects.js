import React from 'react';
import {Component} from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import logo from "./../../resources/projects/ic_logo_round.svg";

import image_1 from "./../../resources/projects/image_1.png";
import image_2 from "./../../resources/projects/screenshot.png";

import gradient from "./../../resources/projects/gradient.png";

import "./Projects.sass";

import render from "./Animation";

const gradientStyle = {
    backgroundImage : `url(${gradient})`,
    backgroundRepeat : 'repeat',
    backgroundSize : 'contain'
};

class Project extends Component {

    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="row" style={gradientStyle}>
            <div className="column_container">
                <div className="logo_container">
                    {
                        this.props.project.logo && <img src={this.props.project.logo} alt="Project Logo"/>
                    }
                </div>
                <div className="text_container">
                    <h1 className="text_container_header">{this.props.project.header}</h1>
                    <h2 className="text_container_subheader">
                        {
                            this.props.project.tools.reduce((prev, curr) => [
                                prev, <span className="slash_style" key={prev}>&nbsp;/&nbsp;</span>, curr
                            ])
                        }
                    </h2>
                    <p className="text_container_paragraph">{this.props.project.content}</p>
                </div>
            </div>
            <div className="column_container">
                <img className="img_portfolio" src={this.props.project.images[0]}/>
            </div>
        </div>
    );
}

export class Projects extends Component {

    static projects = [{
        header : "Jiggles",
        logo : logo,
        tools : ["Android", "NodeJS", "Python", "MongoDB"],
        content : "Interactive streaming and social media service that brings music lovers " +
            "together by connecting users through content sharing, by providing " +
            "access to millions of songs and many more…",
        images : [image_1]
    }, {
        header : "StarCannon",
        logo : null,
        tools : ["C++", "OpenGL", "WebGL", "Java"],
        content : "A cross-platform game engine for Desktop/Web platform built on " +
            "OpenGL/WebGL, that simulates procedural generated terrain combining game " +
            "elements.",
        images : [image_2]
    }];

    constructor(props) {
        super(props);

        this.component = React.createRef();
        this.rootAnimation = React.createRef();
    }


    componentDidMount = () => {
        let viewPortHeight = this.rootAnimation.current.clientHeight;
        let viewPortWidth = Math.max(this.rootAnimation.current.scrollWidth, this.rootAnimation.current.offsetWidth,
            this.rootAnimation.current.clientWidth);

        render(this.rootAnimation, viewPortWidth, viewPortHeight);
    };

    receiveClientHeight = () => {
        return this.component.current.clientHeight;
    };

    render = () => (
        <section id="projects" ref={this.component}>
            <div className="animation" ref={this.rootAnimation}/>
            <div className="projects">
                <CSSTransitionGroup
                    component={React.Fragment}
                    transitionName="project"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={300}>
                    {
                        Projects.projects.map((project, index) => (
                            <Project project={project} key={index}/>
                        ))
                    }
                </CSSTransitionGroup>
            </div>
        </section>
    )
}