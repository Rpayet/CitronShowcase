import {useContext, useEffect, useState} from "react";
import {AnimationContext} from "../context/AnimationContext";

export default function Landing() {

    const { setAnimus } = useContext(AnimationContext);

    useEffect(() => {
        setAnimus(prevState => {
            return {
                ...prevState,
                dashboardComp: {
                    open: false,
                    transition: false,
                },
                lemonifyComp: true,
            }
        })
        return () => setAnimus(prevState => {
            return {
                ...prevState,
                dashboardComp: {
                    open: true,
                    transition: false,
                },
                lemonifyComp: false,
            }
        });
    }, [setAnimus]);

    return (
        <section id='Landing'>

        </section>
    )
}