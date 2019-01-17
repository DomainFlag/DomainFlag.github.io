import React from 'react';
import {Component} from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

import logo1 from "./../../resources/projects/logo-icon.svg";
import logo2 from "./../../resources/projects/logo.png";

import image_1 from "./../../resources/projects/image_1.png";
import image_2 from "./../../resources/projects/image_2.png";
import image_3 from "./../../resources/projects/screenshot.png";

import gradient1 from "./../../resources/projects/gradient.png";
import gradient2 from "./../../resources/projects/gradient-violet.png";

import "./Projects.sass";

import render from "./Animation";

class Project extends Component {
    constructor(props) {
        super(props);

        this.component = React.createRef();

        this.state = {
            step : 0,
            active : false
        }
    }

    next = (step) => {
        this.setState({
            step
        });
    };

    overview = (state) => {
        this.setState({
            active : state,
            ...(!state && {
                step : 0
            })
        });

        this.props.onFullViewComponent(state);
    };

    render = () => (
        <div className={"row " + (this.state.active ? "row_full" : "row_small")} style={this.props.project.style.gradient} ref={this.component}>
            <div className="row_container">
                <div className="column_container">
                    <div className="text_container">
                        {
                            this.state.step === 0 ? (
                                <h1 className="text_container_header">{this.props.project.header}</h1>
                            ) : (
                                <h1 className="text_container_title"
                                    style={this.props.project.style.accent}>{this.props.project.steps[this.state.step].title}</h1>
                            )
                        }
                        {
                            this.props.project.steps[this.state.step].tools && (
                                <h2 className="text_container_subheader">
                                    {
                                        this.props.project.steps[this.state.step].tools.reduce((prev, curr) => [
                                            prev, <span className="slash_style"
                                                        key={prev}>&nbsp;/&nbsp;</span>, curr
                                        ])
                                    }
                                </h2>
                            )
                        }
                        <p className="text_container_paragraph">{this.props.project.steps[this.state.step].content}</p>
                    </div>
                </div>
                <div className="column_container">
                    <img className="img_portfolio" src={this.props.project.steps[this.state.step].images[0]}/>
                </div>
            </div>
            {
                <img className="brand_container" src={this.props.project.logo} alt="Project Logo"/>
            }
            <CSSTransitionGroup
                component={React.Fragment}
                transitionName="overview"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {
                    !this.state.active ? (
                        <div className="project_action" onClick={this.overview.bind(this, true)}>
                            <p className="project_action_text">Click to overview</p>
                        </div>
                    ) : (
                        <div className="project_finish" onClick={this.overview.bind(this, false)}>
                            <p className="project_action_text">Close</p>
                        </div>
                    )
                }
            </CSSTransitionGroup>
            {
                this.state.active && (
                    <div className="project_action">
                        {
                            this.props.project.steps.map((_, index) => (
                                <div className="project_interaction_component" onClick={this.next.bind(this, index)}>
                                    <div style={{border : "1.5px solid " + this.props.project.style.accent.color}}
                                        className={"project_interaction_circle " + (this.state.step === index
                                            && "project_interaction_circle_primary")}/>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export class Projects extends Component {

    static projects = [{
        header : "Jiggles",
        logo : logo1,
        style : {
            accent : {
                color : "#FFB61E"
            },
            gradient : {
                backgroundImage : `url(${gradient1})`,
                backgroundRepeat: 'repeat'
            }
        },
        steps : [{
            tools : ["Android", "Java", "Python", "JavaScript", "MongoDB"],
            content : "Interactive streaming and social media service that brings music lovers " +
                "together by connecting users through content sharing, by providing " +
                "access to millions of songs and many more…",
            images : [image_1]
        }, {
            title : "Overview",
            content : "I am currently working on what seems to me what a streaming service should" +
                " be: accessible, fun but not distracting while enabling music lovers to share" +
                " and explore with his friends sweet new tones.",
            images : [image_2]
        }, {
            title : "Experience",
            content : "Streaming and social media service that brings music lovers " +
                "together by connecting users through content sharing, by providing " +
                "access to millions of songs and many more…",
            images : [image_1]
        }, {
            title : "Future",
            content : "Streaming and social media service that brings music lovers " +
                "together by connecting users through content sharing, by providing " +
                "access to millions of songs and many more…",
            images : [image_1]
        }]
    }, {
        header : "StarCannon",
        logo : logo2,
        style : {
            accent : {
                color : "#FFB61E"
            },
            gradient : {
                backgroundImage : `url(${gradient2})`,
                backgroundRepeat: 'repeat'
            }
        },
        steps : [{
            tools : ["C++", "Java", "OpenGL", "WebGL"],
            content : "A cross-platform 3D game engine for Desktop/Web platform built on " +
                "OpenGL/WebGL, that simulates procedural generated terrain combining game " +
                "elements.",
            images : [image_3]
        }, {
            title : "Overview",
            content : "A cross-platform game engine for Desktop/Web platform built on " +
                "OpenGL/WebGL, that simulates procedural generated terrain combining game " +
                "elements.",
            images : [image_3]
        }]
    }];

    constructor(props) {
        super(props);

        this.state = {
            activeFullView : false,
            activeProject : Projects.projects[1]
        };

        this.component = React.createRef();
        this.rootAnimation = React.createRef();
    }

    componentDidMount = () => {
        let viewPortHeight = this.component.current.clientHeight;
        let viewPortWidth = Math.max(this.rootAnimation.current.scrollWidth, this.rootAnimation.current.offsetWidth,
            this.rootAnimation.current.clientWidth);

        render(this.rootAnimation, viewPortWidth, viewPortHeight);
    };

    receiveClientHeight = () => {
        return this.component.current.clientHeight;
    };

    onHighlightComponent = (state) => {
        this.props.onFullViewComponent(state);

        this.setState({
            activeFullView : state
        });

        // default style in case of minimize
        this.props.onChangeStyle(state ? this.state.activeProject.style : null);
    };

    onScrollComponents = (scrollPosition, offsetStart) => {
        // if(offsetStart * 2 > this.receiveClientHeight() - window.innerHeight) {
        //     this.setState({
        //         activeProject : Projects.projects[1]
        //     });
        // } else {
        //     this.setState({
        //         activeProject : Projects.projects[0]
        //     });
        // }
    };

    render = () => (
        <section id={this.state.activeFullView ? "projects_full" : "projects"} ref={this.component}>
            <div className="animation" ref={this.rootAnimation} style={{display : (this.state.activeFullView ? "none" : "flex")}}/>
            <div className="projects">
                <CSSTransitionGroup
                    component={React.Fragment}
                    transitionName="project"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={300}>
                    {
                        <Project
                            project={this.state.activeProject}
                            key={this.state.activeProject.header}
                            onFullViewComponent={this.onHighlightComponent}/>
                    }
                </CSSTransitionGroup>
            </div>
        </section>
    )
}