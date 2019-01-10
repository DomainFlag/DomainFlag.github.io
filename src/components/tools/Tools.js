import React from 'react';
import {Component} from 'react';

import rectangle_shape from "./../../resources/tools/rectangle.svg";
import triangle_shape from "./../../resources/tools/triangle.svg";

import "./Tools.sass";

export class Tools extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollPosition : 0,
            activeComponent : this.props.components[0]
        };
    }

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
        this.setState({
            activeComponent : component
        });

        this.props.onForcedScrollComponents(component.componentTop);
    };

    render = () => (
        <section id="tools">
            <p className="tools-header">{this.state.activeComponent.title.toUpperCase()}</p>
            <div className="tools-utils">
                {
                    this.props.components.map(component => (
                        <img src={rectangle_shape} key={component.title} onClick={this.setOnActiveComponent.bind(this, component)}
                             className={"tools-shape tools-shape-main " + (this.state.activeComponent === component ? "tools-shape-active" : "tools-shape-disabled")} />
                    ))
                }
            </div>
        </section>
    )
}

// class ToolsBuilder {
//     constructor(sections) {
//         console.log(sections);
//         this.sections = sections;
//         this.activeComponent = null;
//
//         this.builder();
//     }
//
//     builder() {
//         let currentValue = 0;
//
//         this.thresholds = [];
//         this.sections.forEach((component) => {
//             let threshold = {
//                 component,
//                 value : currentValue
//             };
//
//             let sec = document.createElement("img");
//             sec.src = "./assets/images/tools/rectangle.svg";
//             sec.className = "tools-shape tools-shape-main tools-shape-disabled";
//             sec.addEventListener("click", () => {
//                 this.setOnActiveComponent(component);
//
//                 this.setOnScrollPosition(threshold.value);
//             });
//
//             tools.appendChild(sec);
//
//             component.element = sec;
//
//             this.thresholds.push(threshold);
//
//             if(component.children instanceof Array) {
//                 let provCurrentValue = currentValue;
//
//                 component.children.forEach((child) => {
//                     let threshold = {
//                         component : child,
//                         value : provCurrentValue
//                     };
//
//                     let subSec = document.createElement("img");
//                     subSec.src = "./assets/images/tools/triangle.svg";
//                     subSec.className = "tools-shape tools-shape-secondary tools-shape-disabled";
//
//                     subSec.addEventListener("click", () => {
//                         this.setOnActiveComponent(child);
//
//                         this.setOnScrollPosition(threshold.value);
//                     });
//
//                     tools.appendChild(subSec);
//
//                     child.element = subSec;
//
//                     provCurrentValue += child.content.clientHeight;
//
//                     this.thresholds.push(threshold);
//                 });
//             }
//
//             currentValue += component.content.clientHeight;
//         });
//
//         this.setOnScrollActive(document.documentElement.scrollTop);
//         this.setOnScrollListener();
//     }
//
//     setOnScrollPosition(value) {
//         window.scroll({
//             top: value,
//             left: 0,
//             behavior: 'smooth'
//         });
//     }
//
//     setOnScrollActive(scrollPosition) {
//         let it = 0;
//
//         while(it < this.thresholds.length && scrollPosition + document.documentElement.clientHeight / 2 >= this.thresholds[it].value) {
//             it++;
//         }
//
//         it--;
//
//         let currentComponent = this.thresholds[it].component;
//
//         if(this.activeComponent !== currentComponent) {
//             this.setOnActiveComponent(currentComponent);
//         }
//     }
//
//     setOnScrollListener() {
//         document.addEventListener("scroll", () => {
//             this.setOnScrollActive(document.documentElement.scrollTop);
//         });
//     }
//
//     setOnActiveComponent(component) {
//         let element = null;
//
//         if(this.activeComponent != null) {
//             element = this.activeComponent.element;
//
//             element.className = element.className.split(" ").slice(0, -1).join(" ") + " tools-shape-disabled";
//         }
//
//         this.activeComponent = component;
//
//         toolsHeader.textContent = component.title.toUpperCase();
//
//         element = this.activeComponent.element;
//         element.className = element.className.split(" ").slice(0, -1).join(" ") + " tools-shape-active";
//     }
// }