import {useContext, useEffect} from "react";
import {AnimationContext} from "../context/AnimationContext";
import Menu from "../components/landing/menu/Menu";
import Resume from "../components/landing/resume/Resume";

export default function Landing() {

    const { animations } = useContext(AnimationContext);
    const [ landingPageAnim, setLandingPageAnim ] = animations.landing;

    useEffect(() => {
        setLandingPageAnim(true);
        return () => setLandingPageAnim(false);
    }, [setLandingPageAnim]);

    return (
        <section id='Landing'>
            <Resume landingPageAnim={landingPageAnim} />
            <Menu landingPageAnim={landingPageAnim}  />
        </section>
    )
}