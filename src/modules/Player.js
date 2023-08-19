function getDevices() {
    return this.makeRequest("me/player/devices");
    //Get available devices
}

function getPlaybackState() {
    return this.makeRequest("me/player/");
    //Get current playback state
}

function getRecentlyPlayed(limit, after, before) {
    return new Promise(async (resolve, reject) => {
        let ret = [];
        let opts = {
            limit : Math.min(limit, 50) || 50,
        };
        let body;

        if (after) opts.after = after;
        else opts.before = before;
        //Ensure only before or after is sent

        do {
            body = await this.makeRequest(`me/player/recently-played${this.formQueryString(opts)}`).catch(reject);
            ret.push(...body.items.slice(0, limit - ret.length));
        } while(body.next && ret.length < limit);
        //Get 50 results at a time until we reach the provided limit

        resolve(ret);
        //Get recently played songs from before or after a certain time
    });
}

function getCurrentlyPlaying() {
    return this.makeRequest("me/player/currently-playing");
    //Get currently playing song
}

function pause(device_id) {
    return this.makeRequest(`me/player/pause${this.formQueryString({device_id})}`, "PUT")
    //Pause playback
}

function seek(position_ms, device_id) {
    return this.makeRequest(`me/player/seek${this.formQueryString({
        position_ms,
        device_id,
    })}`, "PUT");
    //Seek to specified position in currently playing track
}

function setRepeat(state, device_id) {
    return this.makeRequest(`me/player/repeat${this.formQueryString({
        state,
        device_id,
    })}`, "PUT");
    //Set repeat state
}

function setVolume(volume_percent, device_id) {
    return this.makeRequest(`me/player/volume${this.formQueryString({
        volume_percent,
        device_id,
    })}`, "PUT");
    //Set playback volume
}

function skip(device_id) {
    return this.makeRequest(`me/player/next${this.formQueryString({device_id})}`, "POST");
    //Skip to the next song
}

function previous(device_id) {
    return this.makeRequest(`me/player/previous${this.formQueryString({device_id})}`, "POST");
    //Skip to the previous song
}

function play(device_id, context_uri, songIds, offset, position_ms) {
    //context_uri = context_uri || "";
    let opts = {
        context_uri,
        position_ms,
    };

    if (typeof(songIds) == "string") songIds = [songIds];
    if (songIds && songIds.length) {
        delete opts.context_uri;
        opts.uris = songIds.map(song => `spotify:track:${song}`);
        //Ensure only context_uri or uris is specified
    }

    if (opts.uris || opts.context_uri.startsWith("spotify:album:") || opts.context_uri.startsWith("spotify:user:"))  {
        if (typeof(offset) == "number") opts.offset = {position : offset};
        else opts.offset = {uri : offset};
        //Set offset
    }
    else throw new Error("Offset cannot be used if context is not an album or playlist and song IDs are given");
    //Ensure an offset can be used

    return this.makeRequest(`me/player/play${this.formQueryString({device_id})}`, "PUT", JSON.stringify(opts));
    //Play a song or number of songs
}

function resume(device_id) {
    return this.makeRequest(`me/player/play${this.formQueryString({device_id})}`, "PUT");
    //Resume playback
}

function shuffle(state, device_id) {
    return this.makeRequest(`me/player/shuffle${this.formQueryString({
        state,
        device_id,
    })}`, "PUT");
    //Set shuffle state
}

function transferPlayback(device, play) {
    return this.makeRequest("me/player/", "PUT", JSON.stringify({
        device_ids : [device],
        play,
    }));
    //Transfer playback to another device
}

module.exports = {
    getDevices,
    getPlaybackState,
    getRecentlyPlayed,
    getCurrentlyPlaying,
    pause,
    seek,
    setRepeat,
    setVolume,
    skip,
    previous,
    play,
    resume,
    shuffle,
    transferPlayback,
};