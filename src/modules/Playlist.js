function addSongs(playlistId, songIds = [], position) {
    return new Promise(async (resolve, reject) => {
        if (typeof(songIds) == "string") songIds = [songIds];
        //If song ID is a string of a single ID, convert it to an array

        let splitIds = [];
        while (songIds.length) splitIds.push(songIds.splice(0, 50));
        //API Supports up to 100 items at a time but sometimes returns an error when doing so

        do {
            await this.makeRequest(`playlists/${playlistId}/tracks`, "POST", JSON.stringify({
                uris : splitIds[0].map(id => `spotify:track:${id}`),
                position,
            })).catch(reject);
            //Add the song(s) to the playlist

            splitIds.splice(0, 1);
        } while (splitIds.length)

        resolve();
    });
}

function updateInfo(id, info = {}) {
    return this.makeRequest(`playlists/${id}`, "PUT", JSON.stringify(info));
    //Update a playlist's information
}

async function createPlaylist(info = {}) {
    return this.makeRequest(`users/${(await this.getUserProfile()).id}/playlists`, "POST", JSON.stringify(info));
    //Create a playlist
}

function getMyPlaylists() {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`me/playlists?limit=50&offset=${ret.length}`).catch(reject);
            ret.push(...body.items);
            //Fetch each page of playlists until we reach the last one
        } while(body.next);

        resolve(ret);
        //Return the fetched playlists
    });
}

function getCoverImage(id) {
    return this.makeRequest(`playlists/${id}/images`);
    //Get the cover image of a playlist
}

function getPlaylist(id, fields) {
    if (typeof(fields) == "string") fields = [fields];
    //If field is a single string field, convert it to an array

    return this.makeRequest(`playlists/${id}${this.formQueryString({fields})}`);
    //Return data about playlist
}

function getSongs(id) {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;
        
        do {
            body = await this.makeRequest(`playlists/${id}/tracks?offset=${ret.length}`).catch(reject);
            ret.push(...body.items);
            //Fetch each page of songs until we reach the last one
        } while (body.next);

        resolve(ret);
        //Return the fetched songs
    });
}

function removeSongs(playlistId, songIds = [], positions = {}) {
    if (typeof(songIds) == "string") songIds = [songIds];
    //If songIds is a string, convert it to an array

    let tracks = [];
    for (let x = 0; x < songIds.length; x ++) {
        tracks.push({uri : `spotify:track:${songIds[x]}`});
        if (positions[songIds[x]]) tracks[x].positions = positions[songIds[x]];
        //Add track ID and position, if any, to list of tracks to be removed
    }

    return this.makeRequest(`playlists/${playlistId}/tracks`, "DELETE", JSON.stringify({tracks}));
    //Remove given songs from playlist
}

function reorderSongs(id, start, end, newPosition) {
    return this.makeRequest(`playlists/${id}/tracks/`, "PUT", JSON.stringify({
        range_start : start,
        range_length : end - start + 1,
        insert_before : newPosition,
    }));
    //Move a range of songs in a playlist to a different index
}

function replaceSongs(id, songs = "") {
    if (typeof(songs) == "string") songs = [songs];
    //If songs is a string, convert it to an array

    return this.makeRequest(`playlists/${id}/tracks${this.formQueryString({uris : songs.map(song => `spotify:track:${song}`).join(",")})}`, "PUT");
    //Replace all songs in the playlist with the given songs
}

function setCoverImage(id, image) {
    return this.makeRequest(`playlists/${id}/images`, "PUT", Buffer.from(image).toString("base64"));
    //Set a playlist's cover image
}

module.exports = {
    addSongs,
    updateInfo,
    createPlaylist,
    getMyPlaylists,
    getCoverImage,
    getPlaylist,
    getSongs,
    removeSongs,
    reorderSongs,
    replaceSongs,
    setCoverImage,
};