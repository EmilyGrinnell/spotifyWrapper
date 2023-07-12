function getAlbums(ids)
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`albums?ids=${ids.slice(0, 50).join(",")}`);
    //Get a number of albums
}

function getSongs(id)
{
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`albums/${id}/tracks${this.formQueryString({
                limit : 50,
                offset : ret.length
            })}`).catch(reject);
            //Get each page of songs

            ret.push(...body.items);
        } while(body.next);

        resolve(ret);
        //Get songs on an album
    });
}

module.exports = {
    getAlbums,
    getSongs
};