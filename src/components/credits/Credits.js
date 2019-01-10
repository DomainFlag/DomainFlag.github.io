import React from 'react';
import {Component} from 'react';

import render from './Animation';

import land from "../../resources/credits/home.svg";
import boat_1 from "../../resources/credits/boat_1.png";
import boat_2 from "../../resources/credits/boat_2.png";
import boat_3 from "../../resources/credits/boat_3.png";

import "./Credits.sass";

export class Credits extends Component {
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
        <section id="footer" ref={this.component}>
            <div id="footer_background" ref={this.rootAnimation}/>

            <img id="land" src={land} alt="Home Land"/>
                <div className="footer_container">
                    <img id="boat_1" src={boat_1} alt="Moving boat"/>
                    <img id="boat_2" src={boat_2} alt="Moving boat"/>
                    <img id="boat_3" src={boat_3} alt="Moving boat"/>
                    <img id="boat_4" src={boat_1} alt="Moving boat"/>
                    <div className="footer_row"/>
                    <div className="footer_row">
                        <h1 className="contact_text">No more scrolling, ugh... do some clicking instead.</h1>
                        <a href="mailto:Cchivriga@hotmail.com"
                           className="contact_address">Contact Me</a>
                    </div>
                </div>
                <p className="rights">© 2019 Cristian Chivriga. All rights reserved.</p>
        </section>
    )
}