import { Sprite, Stage } from "@pixi/react";
import { usePageTransition } from "../../services/navigation/animationService";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { DashboardContext } from "../../context/DashboardContext";
import { IoIosArrowBack } from "react-icons/io";

export default function DashSubLinks() {
    const { handleNavigation } = usePageTransition();
    const { appTheme, lemonifylogoset } = useContext(AppContext);
    const { dashboardContent } = useContext(DashboardContext);
    const { category, subcategory, sublinks } = dashboardContent;

    const [subHover, setSubHover] = useState('');
    
    return (
        <div className="sublinks">
            <button 
                onClick={() => handleNavigation('arcadepalace')}
                onMouseEnter={() => setSubHover('arcadepalace')}
                onMouseLeave={() => setSubHover('')}
                className={`sublink ${subcategory.id !== '' ? 'popIn' : 'popOut'} ${subHover === category.to ? 'hovered' : ''}`}>
                    <IoIosArrowBack className='sectionBack' />
                    {subHover === category.to ? <span className='sectionbacktitle'>{category.name}</span> : ''}
            </button>
            {Object.keys(sublinks).map((sublink, index) => {
                if (sublink === subcategory.id) return;
                return (
                    <button
                        key={sublinks[sublink].id}
                        style={{animation : `popIn ${ (1 + (index/10)) /1.8}s ease-in-out`}}
                        className={`sublink ${subcategory.id !== '' ? 'popIn' : 'popOut'} ${sublinks[sublink].name === subHover ? 'hovered' : ''}`}
                        onClick={() => handleNavigation(sublinks[sublink].to)}
                        onMouseEnter={() => setSubHover(sublinks[sublink].name)}
                        onMouseLeave={() => setSubHover('')}>
                            <div>
                                <Stage
                                    width={32}
                                    height={32}
                                    options={{backgroundAlpha: 0}}>
                                    <Sprite
                                        image={lemonifylogoset}
                                        position={sublinks[sublink][appTheme]}
                                        anchor={[0, 0]}
                                        scale={1}
                                    />
                                </Stage>
                            </div>
                            {sublinks[sublink].name === subHover ? <span className='sectionbacktitle'>{sublinks[sublink].name}</span> : ''}
                    </button>
                );
            })}
        </div> 
    )
}