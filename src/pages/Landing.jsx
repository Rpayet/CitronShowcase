import {useContext, useEffect} from "react";
import {AnimationContext} from "../context/AnimationContext";
import Menu from "../components/landing/menu/Menu";
import Resume from "../components/landing/resume/Resume";

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
            <Resume />
            <Menu />
        </section>
    )
}