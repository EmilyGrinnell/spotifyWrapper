function checkAlbumsAreSaved(ids = [])
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single album ID, change it to an array

    return this.makeRequest(`me/albums/contains?ids=${ids.slice(0, 50).join(",")}`);
    //Check if a list of albums have been saved
}

function checkSongsAreSaved(ids = [])
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single song ID, change it to an array

    return this.makeRequest(`me/tracks/contains?ids=${ids.slice(0, 50).join(",")}`);
    //Check if a list of songs have been saved
}

function getSavedAlbums()
{
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`me/albums${this.formQueryString({
                limit : 50,
                offset : ret.length
            })}`).catch(reject);

            ret.push(...body.items);
            //Fetch each page of albums
        } while(body.next);

        resolve(ret);
        //Get current user's saved albums
    });
}

function getSavedSongs()
{
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`me/tracks/${this.formQueryString({
                limit : 50,
                offset : ret.length
            })}`).catch(reject);

            ret.push(...body.items);
            //Fetch each page of songs
        } while (body.next);

        resolve(ret);
        //Get current user's saved songs
    });
}

function unsaveAlbums(ids = [])
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`me/albums?ids=${ids.slice(0, 50).join(",")}`, "DELETE");
    //Unsave a number of albums
}

function unsaveSongs(ids = [])
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`me/tracks?ids=${ids.slice(0, 50)}`, "DELETE");
    //Unsave a number of songs
}

function saveAlbums(ids = [])
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`me/albums?ids=${ids.slice(0, 50).join(",")}`, "PUT");
    //Save a number of albums
}

function saveSongs(ids = [])
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`me/tracks?ids=${ids.slice(0, 50).join(",")}`, "PUT");
    //Save a number of songs
}

module.exports = {
    checkAlbumsAreSaved,
    checkSongsAreSaved,
    getSavedAlbums,
    getSavedSongs,
    unsaveAlbums,
    unsaveSongs,
    saveAlbums,
    saveSongs
};