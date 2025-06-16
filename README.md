# Features
- [Album](#album)
- [Artist](#artist)
- [Browse](#browse)
- [Follow](#follow)
- [Library](#library)
- [Personalisation](#personalisation)
- [Player](#player)
- [Playlist](#playlist)
- [Search](#search)
- [Song](#song)
- [Profile](#profile)


## Album

### getAlbums(ids : Array | String) -> Promise(Object)
Get information about an album(s)
- ids : the ID(s) of the album(s)

### getAlbumSongs(id : String) -> Promise(Array)
Get a list of songs on an album
- id : the ID of the album


## Artist

### getArtists(ids : Array | String) -> Promise(Object)
Get information about an artist(s)
- ids : the ID(s) of the artist(s)

### getArtistAlbums(id : String, include_groups? : Array) -> Promise(Array)
Get a list of albums from an artist
- id : the ID of the artist
- include_groups : types of album to include, valid options are `album`, `single`, `appears_on`, `compilation`. Includes all types by default

### getArtistTopSongs(id : String, country? : String) -> Promise(Object)
Get top songs from an artist
- id : the ID of the artist
- country : an [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to using the country associated with the access token

### getRelatedArtists(id : String) -> Promise(Object)
Get related artists
- id : the ID of the artist to find other artists related to


## Browse

### getCategory(id : String) -> Promise(Object)
Get information about a category
- id : the ID of the category

### getCategoryPlaylists(id : String) -> Promise(Object)
Get a category's playlists
- id : the ID of the category

### getCategories() -> Promise(Array)
Get all available categories

### getFeaturedPlaylists(timestamp? : String) -> Promise(Array)
Get a list of featured playlists
- timestamp : an [ISO 8601 format timestamp](https://en.wikipedia.org/wiki/ISO_8601) to fetch results from. Defaults to current time if not provided

### getNewReleases(limit : Number) -> Promise(Array)
Get a list of featured new album releases
- limit : the maximum number of results to fetch

### getRecommendations(limit : Number, artists : Array | String, genres : Array | String, tracks : Array | String) -> Promise(Object)
Get a list of recommended songs
- limit : the maximum number of results to fetch. Maximum is 100
- artists : the ID(s) of the artist(s) to get recommendations based on
- genres : the ID(s) of the genres(s) to get recommendations based on
- tracks : the ID(s) of the tracks(s) to get recommendations based on

IDs can be provided for any number of types, but at least 1 is required and no more than 5 can be provided


## Follow

### checkPeopleFollowed(type : String, ids : Array | String) -> Promise(Array)
Check if a number of artists or users are followed
- type : `artist` or `user`
- ids : the ID(s) of the artist(s) or user(s) to check

### checkPlaylistFollowed(playlistId : String, userIds? : Array | String) -> Promise(Array)
Check if a number of users follow a playlist
- playlistId : the ID of the playlist to check
- userIds : the ID(s) of the user(s) to check. Defaults to the current user if not provided

### followPeople(type : String, ids : Array | String) -> Promise()
Follow a number of artists or users
- type : `artist` or `user`
- ids : the ID(s) of the artist(s) or user(s) to follow

### followPlaylist(id : String, isPublic : Boolean) -> Promise()
Follow a playlist
- id : the ID of the playlist to follow
- isPublic : if `true`, the playlist will be included in the user's public playlists

### getFollowedArtists(limit : Number, after? : String) -> Promise(Array)
Get the current user's followed artists
- limit : the maximum number of follows to fetch
- after : artist ID. If provided, only follows after this artist will be returned

### unfollowPeople(type : String, ids : Array | String) -> Promise()
Unfollow a number of users
- type : `artist` or `user`
- ids : the ID(s) of the artist(s) or user(s) to unfollow

### unfollowPlaylist(id : String) -> Promise()
Unfollow a playlist
- id : the ID of the playlist to unfollow


## Library

### checkAlbumsAreSaved(ids : Array | String) -> Promise(Array)
Check if a number of albums are saved
- ids : the ID(s) of the album(s) to check

### checkSongsAreSaved(ids : Array | String) -> Promise(Array)
Check if a number of songs are saved
- ids : the ID(s) of the song(s) to check

### getSavedAlbums() -> Promise(Array)
Get the current user's saved albums

### getSavedSongs() -> Promise(Array)
Get the current user's saved songs

### unsaveAlbums(ids : Array | String) -> Promise()
Unsave a number of albums
- ids : the ID(s) of the album(s) to unsave

### unsaveSongs(ids : Array | String) -> Promise()
Unsave a number of songs
- ids : the ID(s) of the song(s) to unsave

### saveAlbums(ids : Array | String) -> Promise()
Save a number of albums
- ids : the ID(s) of the album(s) to save

### saveSongs(ids : Array | String) -> Promise()
Save a number of songs
- ids : the ID(s) of the song(s) to save


## Personalisation

### getTop(type : String, limit : Number, offset? : Number, time_range? : String) -> Promise(Array)
Get the current user's top artists or songs
- type : `artists` or `tracks`
- limit : The maximum number of results to return
- offset : The index of the first value to return
- time_range : `long_term` (several years), `medium_term` (~6 months) or `short_term` (~4 weeks)


## Player

### getAvailableDevices() -> Promise(Object)
Get a list of the current user's available devices

### getPlaybackState() -> Promise(Object)
Get information about the user's current playback state

### getRecentlyPlayedSongs(limit : Number, after : Number, before : Number) -> Promise(Array)
Get the current user's recently played songs
- limit : maximum number of results to fetch
- after : Unix timestamp. If specified, only results after this time will be returned
- before : Unix timestamp. If specified, only results before this time will be returned

Only `after` or `before` can be provided. If a value is given for both, only `after` will be used

### getCurrentlyPlaying() -> Promise(Object)
Get the song the user is currently listening to

### pausePlayer(device_id? : String) -> Promise()
Pause playback on the specified device
- device_id : the ID of the device to pause playback on. Defaults to using the user's currently active device

### setSeek(position_ms : Number, device_id? : String) -> Promise()
Seeks to the given position in the user's currently playing song
- position_ms : the position in milliseconds to seek to
- device_id : the ID of the device to seek on. Defaults to using the user's currently active device

### setRepeatState(state : String, device_id? : String) -> Promise()
Set the current repeat mode
- state : `track`, `context` or `off`
- device_id : the ID of the device to set the repeat mode on. Defaults to using the user's currently active device

### setPlayerVolume(volume_percent : Number, device_id? : String) -> Promise()
Set the current playback volume
- volume_percent : the volume to set to between `0` and `100`
- device_id : the ID of the device to adjust the volume on. Defaults to using the user's currently active device

### skipSong(device_id? : String) -> Promise()
Skip to the next song
- device_id : the ID of the device to skip on. Defaults to using the user's currently active device

### previousSong(device_id? : String) -> Promise()
Skip to the previous song
- device_id : the ID of the device to skip on. Defaults to using the user's currently active device

### playSongs(device_id? : String, context_uri : String, songIds : Array | String, offset? : Number | String, position_ms? : Number) -> Promise()
Start playback for the current user
- device_id : the ID of the device to start playback on. Defaults to using the user's currently active device
- context_uri : the URI of the context to play from
- songIds : the ID(s) of the song(s) to play
- offset : a position number or song URI to begin playback from
- position_ms : how far into the song to begin playback from

Only one of `context_uri` or `songIds` can be provided. If values are provided for both, `songIds` will be used

### resumePlayer(device_id? : String) -> Promise()
Unpause playback
- device_id : the ID of the device to unpause playback on. Defaults to using the user's currently active device

### setShuffle(state : Boolean, device_id? : String) -> Promise()
Set the current shuffle mode
- state : `true` to turn on shuffle, `false` to turn it off
- device_id : the ID of the device to set the shuffle mode on. Defaults to using the user's currently active device

### setPlaybackDevice(device : String, play : Boolean) -> Promise()
Transfer playback to another device
- device : the ID of the device to switch playback to
- play : set to `true` to automatically unpause playback on the new device


## Playlist

### addSongsToPlaylist(playlistId : String, songIds : Array | String, position? : Number) -> Promise(Object)
Add a number of songs to a playlist
- playlistId : the ID of the playlist to add the songs to
- songIds : the ID(s) of the song(s) to add
- position : the position in the playlist to add the new songs. Defaults to adding to the end of the playlist

### updatePlaylistInfo(id : String, info : {name? : String, public? : Boolean, collaborative? : Boolean, description? : String}) -> Promise()
Update playlist details
- id : the ID of the playlist to update
- info : the new details to be updated

### createPlaylist(info : {name? : String, public? : Boolean, collaborative? : Boolean, description? : String}) -> Promise(Object)
Create a new playlist
- info : the details of the playlist to be created

### getMyPlaylists() -> Promise(Array)
Get the current user's playlists

### getPlaylistCoverImage(id : String) -> Promise(Object)
Get the cover image of a playlist
- id : the ID of the playlist

### getPlaylist(id : String, fields : Array | String) -> Promise(Object)
Get information about a playlist
- id : the ID of the playlist
- fields : the fields to be returned

### getPlaylistSongs(id : String) -> Promise(Array)
Get songs on a playlist
- id : the ID of the playlist

### removeSongsFromPlaylist(playlistId : String, songIds : Array | String, positions : Object) -> Promise(Object)
Remove songs from a playlist
- playlistId : the ID of the playlist
- songIds : the ID(s) of the song(s) to remove
- positions : the position(s) of the song(s) to be removed. Keys are song IDs and values are positions

### reorderPlaylist(id : String, start : Number, end : Number, newPosition : Number) -> Promise(Object)
Reorder songs on a playlist
- id : the ID of the playlist
- start : the position of the first song to be reordered
- end : the position of the last song to be reordered
- newPosition : the position to insert the new songs

### replacePlaylistSongs(id : String, songs : Array | String) -> Promise()
Replace all songs on a playlist
- id : the ID of the playlist
- songs : the ID(s) of the new song(s) to fill the playlist with

### setPlaylistCoverImage(id : String, image : Buffer) -> Promise()
Set a new cover image for a playlist
- id : the ID of the playlist
- image : the image data for the cover image to be replaced with


## Search

### search(q : String, types : Array[String], market : String, limit : Number, offset : Number, include_external : String) -> Promise(Object)
Fetch search results
- q : search query
- types : the types of results to fetch. Can include any of `album`, `artist`, `playlist` and `track`
- market : an [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to using the country associated with the access token
- limit : the maximum number of results to fetch
- offset : the index of the first value to return
- include_external : can be set to `audio` to include externally hosted audio content

## Song

### getSongAudioAnalysis(id : String) -> Promise(Object)
Get audio analysis for a song
- id : the ID of the song

### getSongAudioFeatures(ids : Array | String) -> Promise(Object)
Get audio features for a number of songs
- ids : the ID(s) of the song(s)

### getSongData(ids : Array | String) -> Promise(Object)
Get information about a number of songs
- ids : the ID(s) of the song(s)


## Profile

### getUserProfile(id? : String) -> Promise(Object)
Get information about a user's profile
- id : the ID of the user, defaults to checking own profile if not provided