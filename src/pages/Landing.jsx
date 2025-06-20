import {useContext, useEffect, useState} from "react";
import computer from '../assets/images/statics/brand/landing/computer.svg';
import mouse from '../assets/images/statics/brand/landing/mouse.svg';
import tablet from '../assets/images/statics/brand/landing/tablet.svg';
import logo from '../assets/images/statics/brand/landing/Lemonify_Logo_Alpha 1.png';

export default function Landing() {

    return (
        <section id='Landing'>
            <div>
                <img 
                    src={computer} 
                    alt="computer"
                    className="computer" />
                <img 
                    src={mouse} 
                    alt="mouse"
                    className="mouse" />
                <img
                    src={tablet} 
                    alt="tablet"
                    className="tablet" />
            </div>
            <img 
                src={logo} 
                alt=""
                className="lemon-logo" />

        </section>
    )
}