import IconHandler from "../components/_utils/IconHandler";

export default function Landing() {

    const spriteSheet = 'landing-sprites.svg';

    const iconDict = ['computer', 'mouse', 'tablet'];

    return (
        <section id='Landing'>
            <div className="bg-props">
                {iconDict.map(icon => (
                    <IconHandler key={icon} file={spriteSheet} name={`${icon}-props`} className={`${icon}`} />
                ))}
            </div>
            <div className="logo-content">
                <IconHandler file='brand-sprites.svg' name='lemonify-colour-icon' className='lemon-logo' />
                <h1 className="lemonify">Lemonify</h1>
            </div>

        </section>
    )
}