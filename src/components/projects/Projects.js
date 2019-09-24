import React from 'react';
import {Component} from 'react';

import {projects} from "./Content";

import bar_top from "./../../resources/projects/bar_top.png";
import bar_bottom from "./../../resources/projects/bar_bottom.png";

import render from "./Animation";

import "./Projects.sass";


class MultiImageContainer extends Component {

    static RATIO_ACTIVE = 150;
    static RATIO_INACTIVE = 125;

    render = () => (
        <div className="column_container">
            {
                this.props.images.map((image, index) => {
                    let active = this.props.active ? "active" : "normal";
                    let styleClassName = "img_portfolio " + (index % 2 === 1 ? "snippet-primary-" : "snippet-secondary-") + active;
                    let ratio = this.props.active ? MultiImageContainer.RATIO_ACTIVE : MultiImageContainer.RATIO_INACTIVE;

                    // Offset from center
                    let style = {
                        left: "calc(50% - " + (ratio * (index - 1) + "px")
                    };

                    return (
                        <img key={index} className={styleClassName} style={style} src={image}  alt="showcase img"/>
                    )
                })
            }
        </div>
    )
}

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
                            <img src={item} key={item} className="showcase_item" style={style} alt="showcase item"/>
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
                <div className="row_container">
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
                                this.props.step.content.map((content, index) => (
                                    <p className="text_container_paragraph" key={index} style={{
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
                                        Progress so far
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    {
                        (lenImages === 1) ? (
                            <div className="column_container">
                                <img key={this.props.step.images[0]} className="snippet-full"
                                     src={this.props.step.images[0]}  alt="showcase img"/>
                            </div>
                        ) : (lenImages > 1) ? (
                            <MultiImageContainer images={this.props.step.images} active={this.props.active}/>
                        ) : this.props.step.videos ? (
                            <div className="column_container">
                                {
                                    this.props.step.frame && ["fast", "slow"].map((pulse) => (
                                        <div key={pulse} className={"container_pulse" + " container_pulse_" + pulse}/>
                                    ))
                                }
                                <div className="portfolio_interaction">
                                    {
                                        this.props.step.frame && (
                                            <img className="portfolio_bar" src={bar_top} alt="item frame"/>
                                        )
                                    }
                                    <video ref={this.frame} className={"video_portfolio video-style-" + this.props.step.videoStyle}>
                                        <source src={this.props.step.videos[0]} type="video/mp4"/>
                                    </video>
                                    {
                                        this.props.step.frame && (
                                            <img className="portfolio_bar" src={bar_bottom} alt="item frame"/>
                                        )
                                    }
                                </div>
                            </div>
                        ) : this.props.step.showcase && (
                            <Showcase showcase={this.props.step.showcase}/>
                        )
                    }
                </div>
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
            <div className="project_other">
                <div className="project-container">
                    {
                        this.props.project.logo && <img className="brand_asset" src={this.props.project.logo} alt="Project Logo"/>
                    }
                </div>
                <div className="project-container">
                    <a href={this.props.project.link} className="project_action_link" target="_blank" rel="noopener noreferrer">
                        Github
                    </a>
                    {
                        this.state.active && (
                            <p className="project_action_text" onClick={this.overview.bind(this, false)}>Close</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export class Projects extends Component {

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

    onResizeEvent = (event) => {

    };

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
        this.props.onChangeStyle(state ? projects[this.state.activeProject].style : null);
    };

    onScrollComponents = (scrollPosition, offsetStart) => {
        // Project is focused
        let size = (this.scrollableContainer.current.clientHeight - document.documentElement.clientHeight) / projects.length;

        if(!this.state.activeFullView && this.scrollableComponent.current.getBoundingClientRect().top === 0) {
            let offset = this.scrollableComponent.current.offsetTop;
            let offsetY = (offset % size);
            let activeNewProject = (offset - offsetY) / size;

            // We hit the limit
            if(activeNewProject > projects.length - 1) {
                activeNewProject = 1;

                offsetY = size;
            }

            let offsetX = Math.floor(offsetY / size * 100);
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
                            projects.map((project, index) => (
                                <Project
                                    project={project}
                                    key={index}
                                    index={index}
                                    onVisible={index === this.state.activeProject}
                                    onFullViewComponent={this.onHighlightComponent}/>
                            ))
                        }
                        {
                            !this.state.activeFullView &&
                            <div className="progress" style={{color : projects[this.state.activeProject].style.accent.color}}>
                                {this.state.activeProjectOffset + "%"}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}