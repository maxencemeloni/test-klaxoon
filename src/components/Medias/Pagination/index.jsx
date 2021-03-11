import React, {useContext} from 'react';
import {BookmarksContext} from "../../../contexts/BookmarksProvider";
import './Pagination.scss';
function Pagination() {
    const {setCurrentPage, pages, currentPage} = useContext(BookmarksContext);

    const handleSetCurrentPage = e => {
        e.preventDefault();
        setCurrentPage(parseInt(e.target.innerHTML));
    };
    return (
        <ul>
            {pages.map((page, i) => <li key={i}>
                <button className={page === currentPage ? 'active' : ''}
                        onClick={handleSetCurrentPage}>{page}</button>
            </li>)}
        </ul>
    );
}

export default Pagination;
