function getAudioAnalysis(id)
{
    return this.makeRequest(`audio-analysis/${id}`);
    //Get audio analysis for a song
}

function getAudioFeatures(ids)
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single id, convert it to an array

    return this.makeRequest(`audio-features${ids.length == 1 ? `/${ids[0]}` : `?ids=${ids.slice(0, 100).join(",")}`}`);
    //Get audio features for a song
}

function getSongs(ids)
{
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single id, convert it to an array

    return this.makeRequest(`tracks${ids.length == 1 ? `/${ids[0]}` : `?ids=${ids.slice(0, 50).join(",")}`}`);
    //Get song data
}

module.exports = {
    getAudioAnalysis, //+
    getAudioFeatures, //+
    getSongs //+
};