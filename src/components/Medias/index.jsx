import React, {useContext} from 'react';
import {BookmarksContext} from "../../contexts/BookmarksProvider";
import Media from "./Media";
import Pagination from "./Pagination";
import {Link} from "react-router-dom";

function Medias() {
    const {setMediasPerPage, mediasToDisplay} = useContext(BookmarksContext);

    return (
        <section>
            <table>
                <thead>
                <tr>
                    <td colSpan="2">
                        <label htmlFor="medias-per-page">Medias per page : </label>
                        <select id="medias-per-page" onChange={e => setMediasPerPage(e.target.value)}>
                            <option>5</option>
                            <option>10</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Type</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Url</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {mediasToDisplay.length > 0 && mediasToDisplay.map((elem, i) =>
                    <Media media={elem} key={i}/>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="11">
                        <Pagination />
                    </td>
                </tr>
                </tfoot>
            </table>
            <Link to="/add">Add a media</Link>
        </section>);
}

export default Medias;
