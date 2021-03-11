import React, {useContext, useState, useEffect} from 'react';
import {Link, useParams, useHistory} from "react-router-dom";
import {addMedia, detectPlatform, getMedias, getMedia} from '../../utils/medias';
import {BookmarksContext} from "../../contexts/BookmarksProvider";
import Tags from "./Tags";
import "./Form.scss";

const urls = {
    vimeo: 'https://vimeo.com/api/oembed.json?url=',
    flickr: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.flickr.com/services/oembed/?format=json&url=')
}

function Form() {
    let {id} = useParams();
    let history = useHistory();
    const {setMedias, setMediasToDisplay, toDisplay, editMedia} = useContext(BookmarksContext);
    const [url, setUrl] = useState('');
    const [error, setError] = useState(null);
    const [tags, setTags] = useState('');
    const [tmpMedia, setTmpMedia] = useState({});

    useEffect(() => {
        if (id !== undefined) {
            let media = getMedia(id);
            setTmpMedia(media[0]);
            setUrl(media[0].url);
            setTags(media[0].tags ?? []);
        }
    }, []);

    const handleSubmitMedia = e => {
        e.preventDefault();
        tmpMedia.tags = tags;
        if (id === undefined) {
            setMedias(addMedia(tmpMedia))
            setMediasToDisplay(toDisplay(getMedias()));
        } else {
            editMedia(id, tmpMedia);
            setMediasToDisplay(toDisplay(getMedias()));
        }

        history.push('/');
    }

    const handleFetchOEmbedMedia = e => {
        e.preventDefault();
        if (url !== '') {
            const type = detectPlatform(url);
            setError(null)
            if (type) {
                fetch(urls[type] + encodeURIComponent(url))
                    .then(headers => {
                        return (headers.status === 200) ? headers.json() : null;
                    })
                    .then(data => {
                        if (data !== null) {
                            if (data.contents !== undefined) {
                                data = JSON.parse(data.contents);
                            }
                            data.url = url;
                            setTmpMedia(data);
                        } else {
                            setError('No media found, check the url');
                        }
                    }).catch(err => setError(err));
            } else {
                setError('Unknown medias provider')
            }
        }
    }

    return (
        <section id="form-media">
            <Link to="/">Go back</Link>
            <form method="post" action="" onSubmit={handleSubmitMedia}>
                <p>
                    <input type="text" id="url" name="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="Url" readOnly={id !== undefined}/>
                    {id === undefined &&<button onClick={handleFetchOEmbedMedia}>Fetch Media</button>}
                </p>
                {id === undefined && <ul className="demo-links">
                    <li><strong>Demo Links :</strong></li>
                    <li>https://www.flickr.com/photos/183999830@N06/51016144156/in/explore-2021-03-09/</li>
                    <li>https://vimeo.com/393439575</li>
                    <li>https://vimeo.com/360822771</li>
                </ul>}

                {error !== null && <p>Error : {error}</p>}
                {(tmpMedia && Object.keys(tmpMedia).length > 0 || id) && <>
                    <p>
                        {tmpMedia.title} - {tmpMedia.author_name}
                    </p>
                    {tmpMedia.type === 'video' && <div id="preview" dangerouslySetInnerHTML={{__html: tmpMedia.html}}/>}
                    {tmpMedia.type === 'photo' && <div id="preview"><a href={tmpMedia.web_page} target="_blank"><img src={tmpMedia.thumbnail_url} alt="" width="240"/></a></div>}
                    <Tags tags={tags} setTags={setTags}/>
                </>
                }
                <p>
                    {Object.keys(tmpMedia).length > 0 && <button>Save Media</button>}
                </p>
            </form>
        </section>
    );
}

export default Form;
