import { usePageTransition } from "../../services/navigation/animationService";

export default function DashSubLinks({sublinks}) {
    const { handleNavigation } = usePageTransition();
    
    return (
        <div className="sublinks">
            {Object.keys(sublinks).map((key) => {
                return (
                    <button
                        key={key}
                        className="sublink"
                        onClick={() => handleNavigation(sublinks[key].to)}>
                            <p>{sublinks[key].name}</p>
                    </button>
                );
            })}
        </div> 
    )
}