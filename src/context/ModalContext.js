import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    const [open, setOpen] = useState(false);

    const closed = () => {
        setOpen(false);
        setTitle(null);
        setContent(null);
    }

    const modalContextValue = {
        content, title, open, closed, 
        setContent, setTitle, setOpen,
    };

    return (
        <ModalContext.Provider value={modalContextValue}>
            {children}
        </ModalContext.Provider>
    );
}