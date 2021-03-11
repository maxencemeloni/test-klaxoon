import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {BookmarksContext} from "../../../contexts/BookmarksProvider";

function Media({media}) {
    let history = useHistory();
    const {editMedia} = useContext(BookmarksContext);


    const handleDelete = e => {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        editMedia(id, 'delete');
    }

    const handleEdit = e => {
        e.preventDefault();
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        history.push('/edit/' + id);
    }
    return (
        <tr data-id={media.id}>
            <td>{media.id}</td>
            <td>{media.title}</td>
            <td>
                <ul>
                    {media.tags && media.tags.map((elem, i) =>
                        <li key={i} style={{marginRight: "3px"}}>{elem}</li>
                    )}
                </ul>
            </td>
            <td>{media.type}</td>
            <td>
                <a href={media.author_url} title={media.author_name}
                   target="_blank">{media.author_name}</a>
            </td>
            <td>{media.upload_date}</td>
            <td>{media.duration}</td>
            <td>{media.width}</td>
            <td>{media.height}</td>
            <td>
                {media.type === 'video' &&
                    <>
                        <div id="preview" dangerouslySetInnerHTML={{__html: media.html}}/>
                        <p>
                            <a href={media.url} title="" target="_blank">
                                {media.url}
                            </a>
                        </p>
                    </>
                }
                {media.type === 'photo' &&
                <>
                    <div id="preview"><a href={media.web_page} target="_blank"><img src={media.thumbnail_url} alt="" width="240"/></a></div>
                    <a href={media.web_page} title="" target="_blank">
                        {media.web_page}
                    </a>
                </>
                }
            </td>
            <td>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
}

export default Media;
