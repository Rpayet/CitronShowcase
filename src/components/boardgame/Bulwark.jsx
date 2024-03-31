import { TbBuildingCastle } from "react-icons/tb";

export default function Bulwark({ player }) {

    const { bulwark } = player;

    return (
        <section id='Bulwark'>
            <TbBuildingCastle />
            <p>{bulwark}</p>
            <TbBuildingCastle />
        </section>
    );
}