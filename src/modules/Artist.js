function getArtists(ids)
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`artists?ids=${ids.slice(0, 50).join(",")}`);
    //Get data about a number of artists
}

function getAlbums(id, include_groups = ["album", "single", "appears_on", "compilation"])
{
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`artists/${id}/albums${this.formQueryString({
                include_groups : include_groups.join(","),
                limit : 50,
                offset : ret.length
            })}`).catch(reject);
            //Get each page of albums

            ret.push(...body.items);
        } while(body.next);

        resolve(ret);
        //Get an artist's albums
    });
}

function getTopSongs(id, country = "from_token")
{
    return this.makeRequest(`artists/${id}/top-tracks?country=${country}`);
    //Get an artist's top songs
}

function getRelatedArtists(id)
{
    return this.makeRequest(`artists/${id}/related-artists`);
    //Get artists related to the given artists
}

module.exports = {
    getArtists,
    getAlbums,
    getTopSongs,
    getRelatedArtists
};