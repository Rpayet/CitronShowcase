import { useContext, useEffect, useState } from "react";
import { AnimationContext } from "../../../../context/AnimationContext";
import { MkContext } from "../../../../context/MkContext";
import InputField from "../../../_utils/InputField";
import MkCard from "../_utils/MkCard"
import { MdFirstPage, MdLastPage } from "react-icons/md";

export default function EventsList({}) {

    const { mkPageAnim, setMkPageAnim } = useContext(AnimationContext);

    const { tournaments } = useContext(MkContext);

    const [cardId, setCardId] = useState();

    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    const eventListInput = {
        id: 'EventListInput',
        type: 'text',
        placeholder: 'Rechercher un tournoi',
        idClassName: mkPageAnim ? 'open' : 'closed',
        inputClassName: 'input',
    };

    useEffect(() => {
        const setResponsiveItemsPerPage = () => {
            if (window.matchMedia('(max-width: 600px)').matches) {
                setItemsPerPage(3);
            } else if (window.matchMedia('(max-width: 900px)').matches) {
                setItemsPerPage(6);
            } else {
                setItemsPerPage(9);
            }
        };

        setResponsiveItemsPerPage();
        window.addEventListener('resize', setResponsiveItemsPerPage);
        
        return () => window.removeEventListener('resize', setResponsiveItemsPerPage);
    
    }, []);

    const paginatedTournaments = tournaments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        setMkPageAnim(true);
    }, []);

    return (
        <div id='EventsList'>
            <div className={`list-menu ${mkPageAnim ? 'open' : 'closed'}`}>
                <div>
                    <InputField inputData={eventListInput} />
                </div>
            </div>
            <div className={`list-sorter ${mkPageAnim ? 'open' : 'closed'}`}>
                <div className={`list-card`}> 
                    {paginatedTournaments.map((tournament, index) => (
                        <MkCard 
                            key={tournament.id}
                            fadeKey={index}
                            tournament={tournament} 
                            setCardId={setCardId} 
                            cardId={cardId} />
                    ))}
                </div>
                <div className={`list-pagination`}>
                    <div className="pagination">
                        <button 
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-btn">
                            <MdFirstPage />
                        </button>
                        <button 
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === Math.ceil(tournaments.length / itemsPerPage)}
                            className="pagination-btn">
                            <MdLastPage />
                        </button>
                    </div>
                </div>
            </div>
            
        </div>

    )
}