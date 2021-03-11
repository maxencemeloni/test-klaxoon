import React, {useContext} from 'react';
import {BookmarksContext} from '../../contexts/BookmarksProvider';
import {reset} from "../../utils/medias";

function Aside() {
    const {setMediasToDisplay, setCurrentPage, setPages} = useContext(BookmarksContext);

    const handleEmptyMedia = e => {
        e.preventDefault();
        reset();
        setMediasToDisplay([]);
        setCurrentPage(1);
        setPages([]);
    }
    return (
        <aside>
            <button onClick={handleEmptyMedia}>Empty medias</button>
        </aside>
    );
}

export default Aside;
