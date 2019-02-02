import React from 'react';
import {Component} from 'react';

import logo1 from "./../../resources/projects/logo-icon.svg";
import logo2 from "./../../resources/projects/logo.png";

import image_1 from "./../../resources/projects/image_1.png";
import image_2 from "./../../resources/projects/image_2.png";
import image_3 from "./../../resources/projects/screenshot.png";

import design_1 from "./../../resources/projects/design_3.png";
import front_1 from "./../../resources/projects/front_1.png";
import front_2 from "./../../resources/projects/front_1_2.png";
import front_2_1 from "./../../resources/projects/front_2_1.png";

import bar_top from "./../../resources/projects/bar_top.png";
import bar_bottom from "./../../resources/projects/bar_bottom.png";

import video from "./../../resources/projects/Video.mp4";

import gradient1 from "./../../resources/projects/gradient.png";
import gradient2 from "./../../resources/projects/gradient-violet.png";
import gradient3 from "./../../resources/projects/gradient-blue.png";
import gradient4 from "./../../resources/projects/gradient-black.png";

import "./Projects.sass";

import render from "./Animation";

const images = require.context('./../../resources/projects/albums', false, /\.(png|jpe?g|svg)$/);

const snippetFull = {
    maxHeight: "720px",
    maxWidth: "720px"
};

const snippetPrimary = {
    active : {
        zIndex : 1,
        maxHeight: "520px",
        maxWidth: "260px",
        transform: "translate(-50%, -50%)"
    },
    normal : {
        zIndex : 1,
        maxHeight: "440px",
        maxWidth: "220px",
        transform: "translate(-50%, -50%)"
    }
};

const snippetSecondary = {
    active : {
        zIndex : 0,
        maxHeight: "440px",
        maxWidth: "220px",
        transform: "translate(-50%, calc(-50% + 25px))"
    },
    normal : {
        zIndex : 0,
        maxHeight: "360px",
        maxWidth: "180px",
        transform: "translate(-50%, calc(-50% + 25px))"
    }
};

class Showcase extends Component {

    static rowLens = [5, 7];
    static offset = 40;
    static deviation = 20;
    static size = 75;
    static prob = 0.2;
    static threshold = 1 / Showcase.prob - 1;

    constructor(props) {
        super(props);

        this.state = {
            distribution : this.sampleFromDistribution()
        };
    }

    componentDidMount = () => {
        setInterval(this.updateComponent, 2000);
    };

    componentWillUnmount = () => {
        clearInterval(this.updateComponent);
    };

    updateComponent = () => {
        this.setState({
            distribution : this.sampleFromDistribution()
        });
    };

    sampleFromDistribution = () => this.props.showcase.reduce((acc, item) => {
        if(Math.random() / Showcase.prob > Showcase.threshold)
            acc.add(item);

        return acc;
    }, new Set([]));

    render = () => {
        let col = 0;
        let row = 0;
        let total = Showcase.rowLens.reduce((acc, val) => acc + val);

        return (
            <div className="column_container">
                {
                    this.props.showcase.map((item, index) => {
                        if(row < Showcase.rowLens.length && col >= Showcase.rowLens[row]) {
                            row++;

                            col = 0;
                        }

                        let len = row >= Showcase.rowLens.length ? this.props.showcase.length - total : Showcase.rowLens[row];
                        let offsetX = ((len % 2 === 0) ? 1 : - 1) * Showcase.offset / 2;

                        // Same width/height and offset
                        let offsetY = offsetX;

                        let translationX = offsetX + (Showcase.size + Showcase.offset) * (col - Math.floor(len / 2));
                        let translationY = offsetY + (Showcase.size + Showcase.offset) * (Showcase.rowLens.length - 1 - row)
                            + (((col + row) % 2 === 1) - 0.5) * 2 * Showcase.deviation;

                        let style = {
                            width : Showcase.size + "px",
                            height : Showcase.size + "px",
                            opacity : (this.state.distribution.has(item) ? 1.0 : 0.1),
                            transform : "translate(" + translationX + "px, " + translationY + "px)"
                        };

                        col++;

                        return (
                            <img src={item} key={item} className="showcase_item" style={style}/>
                        )
                    })
                }
            </div>
        )
    };
}

class Renderer extends Component {
    constructor(props) {
        super(props);

        this.renderer = React.createRef();
        this.frame = React.createRef();
    }

    componentDidMount = () => {
        if(this.frame.current) {
            document.addEventListener("scroll", this.onScrollRenderer.bind(this));

            if(this.props.active)
                this.frame.current.play();
        }
    };

    componentWillUnmount = () => {
        if(this.frame.current) {
            document.addEventListener("scroll", this.onScrollRenderer.bind(this));

            if(this.props.active)
                this.frame.current.pause();
        }
    };

    onScrollRenderer = () => {
        if(this.props.active) {
            let rect = this.renderer.current.getBoundingClientRect();

            if(
                rect.top >= - this.renderer.current.clientHeight &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + this.renderer.current.clientHeight &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ) {
                if(this.frame.current.paused)
                    this.frame.current.play();
            } else {
                if(!this.frame.current.paused)
                    this.frame.current.pause();
            }
        }
    };

    render = () => {
        let lenImages = this.props.step.images.length;

        return (
            <div className="row" ref={this.renderer} style={{
                display : this.props.visible ? "flex" : "none",
                backgroundImage : `url(${this.props.step.style.gradient})`,
                backgroundRepeat : 'repeat',
                ...(this.props.step.style.background && this.props.step.style.background),
                ...(this.props.active && this.props.step.style.size)
            }}>
                <div className="row_container" style={this.props.step.direction}>
                    <div className="column_container">
                        <div className="text_container">
                            {
                                this.props.step.header ? (
                                    <h1 className="text_container_header">{this.props.step.header}</h1>
                                ) : (
                                    <h1 className="text_container_header" style={{...this.props.step.style.header}}>
                                        {this.props.step.title}
                                    </h1>
                                )
                            }
                            {
                                this.props.step.tools && (
                                    <h2 className="text_container_subheader">
                                        {
                                            this.props.step.tools.reduce((prev, curr) => [
                                                prev, <span className="slash_style"
                                                            key={prev}>&nbsp;/&nbsp;</span>, curr
                                            ])
                                        }
                                    </h2>
                                )
                            }
                            {
                                this.props.step.content.map((content) => (
                                    <p className="text_container_paragraph" style={{
                                        width : lenImages === 0 && "75%",
                                        textAlign : this.props.step.type ? "center" : "left",
                                        ...(this.props.step.style.text && this.props.step.style.text)
                                    }}>
                                        {content}
                                    </p>
                                ))
                            }
                            {
                                this.props.step.link && (
                                    <a href={this.props.step.link} target="_blank" rel="noopener noreferrer" className="text_container_link">
                                        Progress
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    {
                        lenImages > 0 ? (
                            <div className="column_container">
                                {
                                    this.props.step.images.map((image, index) => {
                                        let active = this.props.active ? "active" : "normal";
                                        let style = lenImages === 1 ? snippetFull : index % 2 === 1 ? snippetPrimary[active] : snippetSecondary[active];

                                        return (
                                            <img className={(lenImages > 1 && "img_portfolio")} style={{
                                                left: lenImages > 1 && (90 * (index + 1 + ((this.props.active && lenImages !== 1) && (index - 1) * 0.4)) / (lenImages + 1) + "%"),
                                                position : (lenImages > 1 && "absolute"),
                                                ...style
                                            }} src={image}/>
                                        )
                                    })
                                }
                            </div>
                        ) : this.props.step.videos ? (
                            <div className="column_container">
                                <div className="container_pulse container_pulse_fast"/>
                                <div className="container_pulse container_pulse_slow"/>
                                <div className="portfolio_interaction">
                                    <img className="portfolio_bar" src={bar_top}/>
                                    <video ref={this.frame} className="video_portfolio">
                                        <source src={this.props.step.videos[0]} type="video/mp4"/>
                                    </video>
                                    <img className="portfolio_bar" src={bar_bottom}/>
                                </div>
                            </div>
                        ) : this.props.step.showcase && (
                            <Showcase showcase={this.props.step.showcase}/>
                        )
                    }
                </div>
                {
                    this.props.step.logo && <img className="brand_container" src={this.props.step.logo} alt="Project Logo"/>
                }
            </div>
        )
    };
}

class Project extends Component {
    constructor(props) {
        super(props);

        this.component = React.createRef();

        this.state = {
            step : 0,
            active : false
        };
    }

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
        <div className="row_steps" style={{display : (this.props.onVisible ? "flex" : "none")}}>
            {
                this.props.project.steps.map((step, index) => (
                    <Renderer key={"" + this.props.index + index} step={{...step}} stepLen={this.state.step} style={{...this.props.project.style}}
                        overview={this.overview} visible={this.state.active || index === 0} active={this.state.active}/>
                ))
            }
            {
                !this.state.active && (
                    <div className="project_overview" onClick={this.overview.bind(this, true)}>
                        <p className="project_action_text">Click to overview</p>
                    </div>
                )
            }
            <div className="project_other" style={{position : (this.state.active ? "fixed" : "absolute")}}>
                <a href={this.props.project.link} className="project_action_link" target="_blank" rel="noopener noreferrer">
                    Work
                </a>
                {
                    this.state.active && (
                        <p className="project_action_text" onClick={this.overview.bind(this, false)}>Close</p>
                    )
                }
            </div>
        </div>
    );
}

export class Projects extends Component {

    static projects = [{
        style : {
            accent : {
                color : "#FFB61E"
            }
        },
        link : "https://github.com/DomainFlag/Jiggles",
        steps : [{
            header : "Jiggles",
            logo : logo1,
            tools : ["Android", "Java", "Python", "JavaScript", "MongoDB"],
            direction : {
                flexDirection : "row"
            },
            content : ["Interactive streaming and social media service designed and built in " +
                " Android that brings music lovers together by connecting users through content " +
                " sharing, by providing access to millions of songs and many more…"
            ],
            style : {
                size : {
                    height : "100vh"
                },
                accent : {
                    color : "#FFB61E"
                },
                gradient : gradient1
            },
            images : [front_2, front_1, design_1]
        }, {
            title : "More then that",
            content : ["Rich and abundant content of music remains still not known to the user, " +
                " where recommendation systems are not fully the way to go."
            ],
            type : "outline",
            style : {
                size : {
                    height : "80vh"
                },
                accent : {
                    color : "#C3272B"
                },
                header : {
                    color : "#C3272B",
                    fontFamily : "Rubik",
                    fontSize : "20px",
                    textAlign : "left"
                },
                text : {
                    color : "#001E1E",
                    fontWeight : "bold",
                    fontSize : "32px",
                    textAlign : "left"
                },
                background : {
                    backgroundColor : "#FFFFFF"
                },
                gradient : null
            },
            images : []
        }, {
            title : "Make it social",
            direction : {
                flexDirection : "row-reverse"
            },
            content : ["My focus was to create a platform where people share and explore" +
                " new music right away. Empowering users to put into spotlight their favourite" +
                " artists and follow those that will take them to a never ending search of" +
                " playful sweet new tones.",

                "The app makes it easy to follow anyone be it a new friend or old one that you" +
                " already have connected from social medias as Facebook. With 2 types of" +
                " content currently supported, either a text/image/audio usual based post or a" +
                " liked/followed notification are more then enough to display your own" +
                " stunning music collection.",

                "Your social feed is always up-to-date as a remote server(NodeJs) connected to" +
                " Firebase Cloud Messaging servers pushes instantly your fresh content" +
                " to your app. Never miss a thing be it someone replying back with a B-side to" +
                " your adored track or your favorite artist you are following releasing a new" +
                " album."
            ],
            style : {
                size : {
                    height : "125vh"
                },
                accent : {
                    color : "#FFB61E"
                },
                gradient : gradient3
            },
            images : [front_2_1]
        }, {
            title : "As good as any music player",
            direction : {
                flexDirection : "row"
            },
            content : ["An app intended for music can't be one without being able to play it." +
            " Right?",

                "The application is making use of Spotify SDK, where any music is available" +
                " right away at your hands. Even if you don't have an actual spotify account, you" +
                " can freely fallback to an offline player implemented with Exoplayer and" +
                " connected with the remote server for you to renew your dusty music artworks" +
                " using the Spotify Web API.",

                "Any media can be synced through Bluetooth in a matter of seconds. A chunked based" +
                " custom protocol is internally designed for audio source to be deconstructed and" +
                " reconstructed on the fly to the other end of any device." +
                " Whether you are listening to the same very beat as your friend, need some" +
                " upbeat tune to get job done while being off from your desk but having your" +
                " phone, or syncing the whole house for a party so everybody would know Daft" +
                " Punk is playing at your house."
            ],
            style : {
                size : {
                    height : "120vh"
                },
                accent : {
                    color : "#FFB61E"
                },
                gradient : gradient2
            },
            videos : [video],
            images : []
        }, {
            title : "Forthcoming",
            direction : {
                flexDirection : "row"
            },
            content : [
                "My effort goes now for creating new features and constantly learning along the" +
                " way. Starting from data-driven systems like singing-along your favourite" +
                " track, music recommendation system, smart playlists based on tracks whose" +
                " theirs repeat button were being smashed lately and many more..."
            ],
            link : "https://github.com/DomainFlag/DataScienceNotes",
            style : {
                size : {
                    height : "80vh"
                },
                accent : {
                    color : "#FFB61E"
                },
                background : {
                    backgroundColor : "#FFFFFF"
                },
                gradient : gradient4
            },
            type : "",
            showcase : images.keys().map(images),
            images : []
        }]
    }, {
        style : {
            accent : {
                color : "#FFB3A7"
            }
        },
        steps : [{
            header : "StarCannon",
            logo : logo2,
            tools : ["C++", "Java", "OpenGL", "WebGL"],
            direction : {
                flexDirection : "row"
            },
            content : [
                "A cross-platform 3D game engine for Desktop/Web platform built on " +
                "OpenGL/WebGL, that simulates procedural generated terrain combining game " +
                "elements."
            ],
            style : {
                size : {
                    height : "100vh"
                },
                accent : {
                    color : "#FFB3A7"
                },
                gradient : gradient4
            },
            images : [image_3]
        }, {
            title : "Overview",
            direction : {
                flexDirection : "row"
            },
            content : [
                "A cross-platform 3D game engine for Desktop/Web platform built on " +
                "OpenGL/WebGL, that simulates procedural generated terrain combining game " +
                "elements."
            ],
            style : {
                size : {
                    height : "30vh"
                },
                accent : {
                    color : "#FFB3A7"
                },
                gradient : gradient2
            },
            images : [image_3]
        }]
    }];

    constructor(props) {
        super(props);

        this.state = {
            activeFullView : false,
            activeProject : 0,
            activeProjectOffset : 32
        };

        this.component = React.createRef();
        this.rootAnimation = React.createRef();
        this.scrollableContainer = React.createRef();
        this.scrollableComponent = React.createRef();
        this.activeProject = React.createRef();
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
        this.props.onChangeStyle(state ? Projects.projects[this.state.activeProject].style : null);
    };

    onScrollComponents = (scrollPosition, offsetStart) => {
        // Project is focused
        let size = (this.scrollableContainer.current.clientHeight - document.documentElement.clientHeight) / Projects.projects.length;

        if(!this.state.activeFullView && this.scrollableComponent.current.getBoundingClientRect().top === 0) {
            let offset = this.scrollableComponent.current.offsetTop;
            let offsetY = (offset % size);
            let activeNewProject = (offset - offsetY) / size;

            // We hit the limit
            if(activeNewProject > Projects.projects.length - 1) {
                activeNewProject = 1;

                offsetY = size;
            }

            let offsetX = Math.max(32, offsetY / size * this.activeProject.current.clientWidth);
            if(this.state.activeProjectOffset !== offsetX) {
                if(this.state.activeProject !== activeNewProject) {
                    this.setState({
                        activeProject : activeNewProject,
                        activeProjectOffset : offsetX
                    });
                } else {
                    this.setState({
                        activeProjectOffset : offsetX
                    });
                }
            }
        }
    };

    render = () => (
        <section id={this.state.activeFullView ? "projects_full" : "projects"} ref={this.component}>
            <div className="animation" ref={this.rootAnimation} style={{display : (this.state.activeFullView ? "none" : "flex")}}/>
            <div className="project_scroll" style={
                {
                    height: !this.state.activeFullView && "80%"
                }
            } ref={this.scrollableContainer}>
                <div className="project_fixed" ref={this.scrollableComponent} style={{
                    height: !this.state.activeFullView && "100vh"
                }}>
                    <div className={"project " + (this.state.activeFullView ? "project_full" : "project_small")} ref={this.activeProject}>
                        {
                            Projects.projects.map((project, index) => (
                                <Project
                                    project={project}
                                    key={index}
                                    index={index}
                                    onVisible={index === this.state.activeProject}
                                    onFullViewComponent={this.onHighlightComponent}/>
                            ))
                        }
                        {
                            !this.state.activeFullView && <div className="progress" style={{
                                width: this.state.activeProjectOffset + "px",
                                backgroundColor : Projects.projects[this.state.activeProject].style.accent.color}}/>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}