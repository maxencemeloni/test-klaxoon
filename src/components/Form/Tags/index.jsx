import React, {useState} from "react";

function Tags({tags, setTags}) {
    const [tagInput, setTagInput] = useState('');

    const deleteTag = e => {
        e.preventDefault();
        let tagsTmp = [...[], ...tags];
        let list = tagsTmp.filter(elem => elem !== e.target.getAttribute('data-name'));
        setTags(list);
    };

    const createTag = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let tag = e.target.value.trim();
            if (tag.length > 0) {
                let tagsTmp = [...tags, tag];
                setTags(tagsTmp);
                setTagInput('');
            }
        }
    };

    return (
        <div>
            <p>
                <label htmlFor="tags">Tags</label>
            </p>
            <p>
                <input
                    placeholder="Tags"
                    id="tags"
                    name="tags"
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={createTag}
                    autoComplete="off"
                />
            </p>
            <p>
                <i>
                    Set your tag and press Return to add it
                </i>
            </p>
            <div>
                <ul id="tags-list">
                    {tags.length > 0 && tags.map((tag, i) => (
                        <li key={i}>
                            <span>{tag}</span>
                            <button
                                onClick={deleteTag} data-name={tag}>
                                x
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>);
}

export default Tags;
