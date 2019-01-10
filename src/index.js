import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

import {Home} from "./components/home/Home";
import {Tools} from "./components/tools/Tools";
import {Projects} from "./components/projects/Projects";
import {Credits} from "./components/credits/Credits";

import "./index.sass"

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            ]
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
        this.componentTools.current.onScrollComponents(e.target.documentElement.scrollTop);
    };

    render = () => (
        <div id="components" onScroll={this.onScrollComponents} >
            <Home ref={this.componentHome} />
            <Tools ref={this.componentTools} components={this.state.components} onForcedScrollComponents={this.onForcedScrollComponents}/>
            <Projects ref={this.componentProjects} />
            <Credits ref={this.componentCredits} />
        </div>
    );
}

render(
    <App/>,
    document.getElementById('root')
);
