import { BiSolidCrown } from "react-icons/bi";

export default function Crown({player}) {

    const { crown } = player;

    return (
        <section id='Crown'>
            <BiSolidCrown />
            <p>{crown}</p>
        </section>
    );
}