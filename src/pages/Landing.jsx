import {useContext, useEffect, useState} from "react";
import {AnimationContext} from "../context/AnimationContext";
import Notebook from "../components/dashboard/Notebook";

export default function Landing() {

    const { setAnimus } = useContext(AnimationContext);

    useEffect(() => {
        setAnimus(prevState => {
            return {
                ...prevState,
                lemonifyComp: true,
            }
        })
        return () => setAnimus(prevState => {
            return {
                ...prevState,
                lemonifyComp: false,
            }
        });
    }, [setAnimus]);

    return (
        <section id='Landing'>

        </section>
    )
}