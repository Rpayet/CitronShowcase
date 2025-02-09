import { useContext, useEffect, useState } from "react";
import { AnimationContext } from "../../../../context/AnimationContext";
import { MkContext } from "../../../../context/MkContext";
import InputField from "../../../_utils/InputField";
import MkCard from "../_utils/MkCard"
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { isPageRefreshed } from "../../../../services/navigation/navigationService";

export default function EventsList({}) {

    const { animus, setAnimus } = useContext(AnimationContext);
    const { mktrialsComp } = animus;
    const { tournaments, switchCardSprites } = useContext(MkContext);

    const [cardId, setCardId] = useState();
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventListClassName, setEventListClassName] = useState('closed');

    const eventListInput = {
        id: 'EventListInput',
        type: 'text',
        placeholder: 'Rechercher un tournoi',
        idClassName:  mktrialsComp ? 'open' : 'closed',
        inputClassName: 'input',
    };

    const paginatedTournaments = tournaments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePagination = (direction) => {
        if (direction === 'next') {
            setEventListClassName('outLeft');
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setEventListClassName('inRight');
            }, 290);
        } else if (direction === 'prev') {
            setEventListClassName('outRight');
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setEventListClassName('inLeft');
            }, 290);
        }
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


    useEffect(() => {
        if (tournaments && tournaments.length > 0 && switchCardSprites) {
            setAnimus(prevState => ({
                ...prevState,
                mktrialsComp: true,
            }));
            setEventListClassName('open');
        }

        return () => setAnimus(prevState => ({
            ...prevState,
            mktrialsComp: false,
        }));;
        
    }, [tournaments, switchCardSprites]);

    return (
        <section id='MkPages'>
            <div className={`list-sorter ${mktrialsComp ? 'open' : 'closed'}`}>
                <div className={`list-card ${eventListClassName}`}> 
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
                            onClick={() => handlePagination('prev')}
                            disabled={currentPage === 1}
                            className="pagination-btn">
                            <MdFirstPage />
                        </button>
                        <button 
                            onClick={() => handlePagination('next')}
                            disabled={currentPage === Math.ceil(tournaments.length / itemsPerPage)}
                            className="pagination-btn">
                            <MdLastPage />
                        </button>
                    </div>
                </div>
            </div>
            
        </section>

    )
}