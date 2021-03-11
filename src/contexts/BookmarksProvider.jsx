import {createContext, useState, useEffect} from 'react';
import {editMedias, getMedias} from "../utils/medias";

export const BookmarksContext = createContext(null);

export const BookmarksProvider = ({children}) => {
    const [medias, setMedias] = useState([]);
    const [mediasToDisplay, setMediasToDisplay] = useState([]);
    const [mediasPerPage, setMediasPerPage] = useState(5);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const toDisplay = (data) => {
        return data.slice((currentPage - 1) * mediasPerPage, ((currentPage - 1) * mediasPerPage) + mediasPerPage)
    };

    const editMedia = (id, toEdit = null) => {
        const index = medias.findIndex(elem => elem.id === parseInt(id));
        if (index > -1) {
            let tmpMedias = [...medias];
            tmpMedias.splice(index, 1);
            tmpMedias.push(toEdit)
            setMedias(tmpMedias);
            setMediasToDisplay(toDisplay(tmpMedias));
            editMedias(tmpMedias);
        }
    }

    useEffect(() => {
        setMediasToDisplay(toDisplay(medias));
    }, [currentPage, mediasPerPage])

    useEffect(() => {
        setMedias(getMedias());
    }, []);

    useEffect(() => {
        const countMedia = medias.length;
        const countPages = Math.ceil(countMedia / mediasPerPage);
        let tmpPages = [];
        let i;
        for (i = 1; i <= countPages; i++) {
            tmpPages.push(i);
        }
        setPages(tmpPages);
        setCurrentPage(1);
    }, [medias, mediasPerPage]);

    return (
        <BookmarksContext.Provider value={{toDisplay, medias, setMedias, mediasToDisplay, setMediasToDisplay, mediasPerPage, setMediasPerPage, pages, setPages, currentPage, setCurrentPage, editMedia}}>
            {children}
        </BookmarksContext.Provider>
    );
};

