import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

import {Home} from "./components/home/Home";
import {Tools} from "./components/tools/Tools";
import {Projects} from "./components/projects/Projects";
import {Credits} from "./components/credits/Credits";

import "./index.sass"

class App extends Component {

    static defaultState = {
        style : {
            accent : {
                color : "#D32F2F"
            }
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            viewFullMode : false,
            components : [
                {
                    componentHeight : null,
                    title : "home",
                    children : []
                }, {
                    componentHeight : null,
                    title : "projects",
                    children : ["Jiggles", "StarCannon"].map((value) => ({
                        title : value,
                        componentHeight : null
                    }))
                }, {
                    componentHeight : null,
                    title : "credits",
                    children : []
                }
            ],
            ...App.defaultState
        };

        this.componentHome = React.createRef();
        this.componentTools = React.createRef();
        this.componentProjects = React.createRef();
        this.componentCredits = React.createRef();
    }

    componentDidMount() {
        let accumulator = 0;

        this.setState((prevState) => ({
            components : [this.componentHome, this.componentProjects, this.componentCredits].reduce((acc, componentElement, index) => {
                let component = prevState.components[index];
                let start = accumulator;

                accumulator += componentElement.current.receiveClientHeight();

                return [...acc, {
                    ...component,
                    componentTop : start,
                    componentHeight : accumulator
                }];
            }, [])
        }));

        document.addEventListener("scroll", this.onScrollComponents.bind(this));
    };

    componentWillUnmount() {
        document.removeEventListener("scroll", this.onScrollComponents.bind(this));
    }

    onForcedScrollComponents = (value) => {
        window.scroll({
            top: value,
            left: 0,
            behavior: 'smooth'
        });
    };

    onScrollComponents = (e) => {
        let scrollTop = e.target.documentElement.scrollTop;

        this.componentTools.current.onScrollComponents(scrollTop, 0);
        this.componentProjects.current.onScrollComponents(scrollTop, scrollTop - this.state.components[0].componentHeight);
    };

    onChangeStyle = (style) => {
        this.setState({
            style : (style != null) ? style : App.defaultState.style
        });
    };

    onFullViewComponent = (state) => {
        if(state) {
            this.setState({
                offset : document.documentElement.scrollTop
            });
        }

        let resolved = [];
        [this.componentHome, this.componentCredits].forEach((component) => {
            let promiseResolve = null;
            let promise = new Promise(resolve => promiseResolve = resolve);

            component.current.onDisplayComponent(!state, promiseResolve);

            resolved.push(promise);
        });

        Promise.all(resolved).then(() => {
            if(!state) {
                window.scrollTo(0, this.state.offset);
            }
        });
    };

    render = () => (
        <div id="components" onScroll={this.onScrollComponents}>
            <Home ref={this.componentHome} />
            <Tools ref={this.componentTools}
                   style={this.state.style}
                   components={this.state.components}
                   onForcedScrollComponents={this.onForcedScrollComponents}
                   onFullViewComponent={this.onFullViewComponent}/>
            <Projects
                ref={this.componentProjects}
                onChangeStyle={this.onChangeStyle}
                onFullViewComponent={this.onFullViewComponent}/>
            <Credits ref={this.componentCredits} />
        </div>
    );
}

render(
    <App/>,
    document.getElementById('root')
);
