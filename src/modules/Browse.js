function getCategory(id) {
    return this.makeRequest(`browse/categories/${id}`);
    //Get info about a category
}

function getCategoryPlaylists(id) {
    return this.makeRequest(`browse/categories/${id}/playlists`);
    //Get a category's playlists
}

function getCategories() {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`browse/categories${this.formQueryString({
                limit : 50,
                offset : ret.length,
            })}`).catch(reject);
            //Fetch each page of categories

            ret.push(...body.categories.items);
        } while(body && body.categories.next);

        resolve(ret);
        //Get all available categories
    });
}

function getFeaturedPlaylists(timestamp) {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`browse/featured-playlists${this.formQueryString({
                limit : 50,
                offset : ret.length,
                timestamp,
            })}`).catch(reject);
            //Get each page of featured playlists

            ret.push(...body.playlists.items);
        } while (body && body.playlists.next);

        resolve(ret);
        //Get featured playlists at the specified timestamp, or the current one
    });
}

function getNewReleases(limit) {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`browse/new-releases${this.formQueryString({
                limit : Math.min(limit, 50) || 50,
                offset : ret.length,
            })}`).catch(reject);
            //Get each page of new releases

            ret.push(...body.albums.items.slice(0, limit - ret.length));
        } while (body.next);

        resolve(ret);
        //Get new releases
    });
}

function getRecommendations(limit, artists = [], genres = [], tracks = []) {
    let length = 0;

    if (typeof(artists) == "string") artists = [artists];
    if (typeof(genres) == "string") genres = [genres];
    if (typeof(tracks) == "string") tracks = [tracks];
    //For each type, if the type is a string of a single ID, convert it to an array

    for (let type of [artists, genres, tracks]) {
        type = type.slice(0, 5 - length);
        length += type.length;
        //Only allow up to 5 seeds
    }

    return this.makeRequest(`recommendations${this.formQueryString({
        limit : Math.min(limit, 100) || 20,
        seed_artists : artists.join(","),
        seed_genres : genres.join(","),
        seed_tracks : tracks.join(","),
    })}`);
    //Get recommendations
}

module.exports = {
    getCategory,
    getCategoryPlaylists,
    getCategories,
    getFeaturedPlaylists,
    getNewReleases,
    getRecommendations,
};