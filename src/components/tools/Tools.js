import React from 'react';
import {Component} from 'react';

import "./Tools.sass";

export class Tools extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display : true,
            scrollPosition : 0,
            activeComponent : this.props.components[0]
        };
    }

    componentDidUpdate = () => {
        if(this.state.promise) {
            this.state.promise();

            this.setState({
                promise : null
            });
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.components !== this.props.components) {
            this.setState({
                activeComponent : nextProps.components[0]
            })
        }
    };

    onResolveCurrentComponent = (scrollPosition) => {
        let component;
        for(let i = 0; i < this.props.components.length; i++) {
            component = this.props.components[i];

            if(scrollPosition < component.componentHeight - window.innerHeight / 2) {
                return component;
            }
        }

        return component;
    };

    onScrollComponents = (scrollPosition) => {
        this.setState({
            scrollPosition
        });

        let activeCurrentComponent = this.onResolveCurrentComponent(scrollPosition);

        if(activeCurrentComponent !== this.state.activeComponent) {
            this.setState({
                activeComponent : activeCurrentComponent
            });
        }
    };

    setOnActiveComponent = (component) => {
        this.props.onFullViewComponent(false);

        this.setState({
            activeComponent : component
        });

        this.props.onForcedScrollComponents(component.componentTop);
    };

    onDisplayComponent = (state, promise) => {
        this.setState({
            promise,
            display : state
        });
    };

    render = () => (
        <section id="tools" style={{display : (this.state.display ? "flex" : "none")}}>
            <p className="tools-header" style={this.props.style.accent}>{this.state.activeComponent.title.toUpperCase()}</p>
            <div className="tools-utils">
                {
                    this.props.components.map(component => (
                        <div key={component.title}
                             style={{border : "1.75px solid " + this.props.style.accent.color}}
                             onClick={this.setOnActiveComponent.bind(this, component)}
                             className={"tools-shape tools-shape-main " + (this.state.activeComponent === component
                                 ? "tools-shape-active" : "tools-shape-disabled")} />
                    ))
                }
            </div>
        </section>
    )
}