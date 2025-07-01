import {useContext, useEffect, useState} from "react";
import computer from '../assets/images/statics/brand/landing/computer.svg';
import mouse from '../assets/images/statics/brand/landing/mouse.svg';
import tablet from '../assets/images/statics/brand/landing/tablet.svg';
import logo from '../assets/images/statics/brand/landing/Lemonify_Logo_Alpha 1.png';
import IconHandler from "../components/_utils/IconHandler";

export default function Landing() {

    const spriteSheet = 'landing-sprites.svg';

    const iconDict = ['computer', 'mouse', 'tablet'];

    return (
        <section id='Landing'>
            {iconDict.map(icon => (
                <IconHandler key={icon} file={spriteSheet} name={`${icon}-props`} className={`${icon}`} />
            ))}
            <img 
                src={logo} 
                alt=""
                className="lemon-logo" />

        </section>
    )
}