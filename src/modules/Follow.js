function checkPeopleFollowed(type, ids) {
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a single string ID, convert it to an array

    return this.makeRequest(`me/following/contains${this.formQueryString({
        type,
        ids : ids.join(","),
    })}`);
    //Check current user is following a artists or users
}

async function checkPlaylistFollowed(playlistId, userIds = []) {
    if (typeof(userIds) == "string") userIds = [userIds];
    //If userIds is a single string ID, convert it to an array

    if (!userIds.length) userIds.push((await this.getUserProfile()).id);
    //If no user ID is specified, use the ID of the current user

    return this.makeRequest(`playlists/${playlistId}/followers/contains?ids=${userIds.slice(0, 5).join(",")}`);
    //Check if a playlist is followed by a number of users
}

function followPeople(type, ids) {
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`me/following${this.formQueryString({
        type,
        ids : ids.slice(0, 50).join(","),
    })}`, "PUT");
    //Follow artists or users
}

function followPlaylist(id, isPublic) {
    return this.makeRequest(`playlists/${id}/followers`, "PUT", isPublic ? "" : JSON.stringify({public : isPublic}));
    //Follow a playlist
}

function getFollowedArtists(limit, after /* = null */) {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let body;

        do {
            body = await this.makeRequest(`me/following${this.formQueryString({
                type : "artist",
                limit : Math.min(limit, 50) || 50,
                after : body ? body.artists.items[body.artists.items.length - 1].id : after,
            })}`).catch(reject);
            //Fetch each page of followed artists

            ret.push(...body.artists.items.slice(0, limit - ret.length));
        } while(body.next && ret.length < limit);

        resolve(ret);
        //Get current user's followed artists
    });
}

function unfollowPeople(type, ids) {
    if (typeof(ids) == "string") ids = [ids];
    //If ids is a string of a single ID, convert it to an array

    return this.makeRequest(`me/following${this.formQueryString({
        type,
        ids : ids.slice(0, 50).join(","),
    })}`, "DELETE");
    //Unfollow a number of artists or users
}

function unfollowPlaylist(id) {
    return this.makeRequest(`playlists/${id}/followers`, "DELETE")
    //Unfollow a playlist
}

module.exports = {
    checkPeopleFollowed,
    checkPlaylistFollowed,
    followPeople,
    followPlaylist,
    getFollowedArtists,
    unfollowPeople,
    unfollowPlaylist,
};