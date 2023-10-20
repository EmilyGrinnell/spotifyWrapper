const request = require("request");
const eventEmitter = require("events");

const Album = require("./modules/Album.js");
const Artist = require("./modules/Artist.js");
const Browse = require("./modules/Browse.js");
const Follow = require("./modules/Follow.js");
const Library = require("./modules/Library.js");
const Personalisation = require("./modules/Personalisation.js");
const Player = require("./modules/Player.js");
const Playlist = require("./modules/Playlist.js");
const Search = require("./modules/Search.js");
const Track = require("./modules/Track.js");
const User = require("./modules/UserProfile.js");

class API extends eventEmitter {
    constructor(accessToken, refreshToken, clientId, clientSecret) {
        super();

        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.clientId = clientId;
        this.clientSecret = clientSecret;

        this.getAlbums = Album.getAlbums;
        this.getAlbumSongs = Album.getSongs;
        //Album functions

        this.getArtists = Artist.getArtists;
        this.getArtistAlbums = Artist.getAlbums;
        this.getArtistTopSongs = Artist.getTopSongs;
        this.getRelatedArtists = Artist.getRelatedArtists;
        //Artist functions

        this.getCategory = Browse.getCategory;
        this.getCategoryPlaylists = Browse.getCategoryPlaylists;
        this.getCategories = Browse.getCategories;
        this.getFeaturedPlaylists = Browse.getFeaturedPlaylists;
        this.getNewReleases = Browse.getNewReleases;
        this.getRecommendations = Browse.getRecommendations;
        //Browse functions

        this.checkPeopleFollowed = Follow.checkPeopleFollowed;
        this.checkPlaylistFollowed = Follow.checkPlaylistFollowed;
        this.followPeople = Follow.followPeople;
        this.followPlaylist = Follow.followPlaylist;
        this.getFollowedArtists = Follow.getFollowedArtists;
        this.unfollowPeople = Follow.unfollowPeople;
        this.unfollowPlaylist = Follow.unfollowPlaylist;
        //Follow functions

        this.checkAlbumsAreSaved = Library.checkAlbumsAreSaved;
        this.checkSongsAreSaved = Library.checkSongsAreSaved;
        this.getSavedAlbums = Library.getSavedAlbums;
        this.getSavedSongs = Library.getSavedSongs;
        this.unsaveAlbums = Library.unsaveAlbums;
        this.unsaveSongs = Library.unsaveSongs;
        this.saveAlbums = Library.saveAlbums;
        this.saveSongs = Library.saveSongs;
        //Library functions

        this.getTop = Personalisation;
        //Personalisation function

        this.getAvailableDevices = Player.getDevices;
        this.getPlaybackState = Player.getPlaybackState;
        this.getRecentlyPlayedSongs = Player.getRecentlyPlayed;
        this.getCurrentlyPlaying = Player.getCurrentlyPlaying;
        this.pausePlayer = Player.pause;
        this.setSeek = Player.seek;
        this.setRepeatState = Player.setRepeat;
        this.setPlayerVolume = Player.setVolume;
        this.skipSong = Player.skip;
        this.previousSong = Player.previous;
        this.playSongs = Player.play;
        this.resumePlayer = Player.resume;
        this.setShuffle = Player.shuffle;
        this.setPlaybackDevice = Player.transferPlayback;
        //Player functions

        this.addSongsToPlaylist = Playlist.addSongs;
        this.updatePlaylistInfo = Playlist.updateInfo;
        this.createPlaylist = Playlist.createPlaylist;
        this.getMyPlaylists = Playlist.getMyPlaylists;
        this.getPlaylistCoverImage = Playlist.getCoverImage;
        this.getPlaylist = Playlist.getPlaylist;
        this.getPlaylistSongs = Playlist.getSongs;
        this.removeSongsFromPlaylist = Playlist.removeSongs;
        this.reorderPlaylist = Playlist.reorderSongs;
        this.replacePlaylistSongs = Playlist.replaceSongs;
        this.setPlaylistCoverImage = Playlist.setCoverImage;
        //Playlist functions

        this.search = Search;
        //Search function

        this.getSongAudioAnalysis = Track.getAudioAnalysis;
        this.getSongAudioFeatures = Track.getAudioFeatures;
        this.getSongData = Track.getSongs;
        //Track functions

        this.getUserProfile = User;
        //User profile function
    }

    makeRequest(path, method = "GET", form = {}, refresh = true) {
        return new Promise((resolve, reject) => {
            request({
                url : `https://api.spotify.com/v1/${path}`,
                method,
                form,
                json : true,
                headers : {
                    Authorization : `Bearer ${this.accessToken}`,
                },
            }, async (err, res, body) => {
                if (body && body.error && body.error.message == "The access token expired" && refresh) {
                    await this.refreshAccessToken();
                    resolve(await this.makeRequest(path, method, form, false));
                    //Refresh the access token and make the request again without trying to refresh the token again
                }
                else if (body && body.error) reject(body.error.message);
                else resolve(body);
            });
        });
    }

    refreshAccessToken() {
        return new Promise((resolve, reject) => {
            request({
                url : "https://accounts.spotify.com/api/token",
                method : "POST",
                json : true,
                form : {
                    grant_type : "refresh_token",
                    refresh_token : this.refreshToken,
                },
                headers : {
                    Authorization : `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64")}`,
                },
            }, (err, res, body) => {
                if (body && body.error) {
                    this.emit("refresh_failed", body.error_description);
                    return reject(body.error_description);
                }
                
                this.accessToken = body.access_token;
                this.emit("token_refreshed", body.access_token);
                resolve(body.access_token);
                //Refresh the access token
            });
        });
    }

    formQueryString(params) {
        let str = "";

        for (let x = 0; x < Object.keys(params).length; x ++) {
            let param = Object.keys(params)[x];

            if (![null, undefined].includes(params[param])) str += `${x ? "&" : "?"}${param}=${params[param]}`;
            //Add parameter to string, ignoring undefined parameters
        }

        return str;
    }
}

module.exports = API;