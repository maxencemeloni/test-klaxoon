function reset() {
    localStorage.setItem('data', JSON.stringify([]));
}

/**
 *
 * @param a
 * @param b
 * @returns {number}
 */
function compare(a, b) {
    let diff = 0;
    if (a.id <  b.id) {
        diff = 1;
    } else if (a.id >  b.id) {
        diff = -1;
    }
    return diff;
}

/**
 *
 * @returns {any}
 */
function getMedias() {
    let data = JSON.parse(localStorage.getItem('data'));
    if (data === null) {
        data = [];
        localStorage.setItem('data', JSON.stringify(data));
    }
    data.sort(compare);
    return data;
}

/**
 *
 * @param id
 * @returns {*}
 */
function getMedia(id) {
    return JSON.parse(localStorage.getItem('data')).filter(elem => {
        return elem.id === parseInt(id)
    });
}

/**
 *
 * @param newData
 * @returns {any}
 */
function addMedia(newData) {
    let data = getMedias();
    if (typeof data !== 'object') {
        data = [];
    }
    newData.id = data.length === 0 ? 1 : data.reduce((max, p) => p.id > max ? p.id : max, data[0].id) + 1;
    data.push(newData);
    data.sort(compare);
    localStorage.setItem('data', JSON.stringify(data));
    return data;
}

/**
 *
 * @param medias
 */
function editMedias(medias) {
    localStorage.setItem('data', JSON.stringify(medias));
}

/**
 *
 * @param link
 * @returns {null}
 */
function detectPlatform(link) {
    let type = null;
    if (link.search('vimeo') > -1) {
        type = 'vimeo';
    } else if (link.search('flickr') > -1) {
        type = 'flickr';
    }
    return type;
}

export {reset, getMedias, addMedia, detectPlatform, editMedias, getMedia}
