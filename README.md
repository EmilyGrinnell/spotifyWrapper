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

### getFeaturedPlaylists(timestamp) -> Promise(Array)

### getNewReleases(limit) -> Promise(Array)

### getRecommendations(limit, artists, genres, tracks) -> Promise(Object)


## Follow

### checkPeopleFollowed(type : String, ids : Array | String) -> Promise(Array)
Check if a number of artists or users are followed
- type : `artist` or `user`
- ids : the ID(s) of the artist(s) or user(s) to check

### checkPlaylistFollowed(playlistId, userIds?) -> Promise(Array)

### followPeople(type, ids) -> Promise()

### followPlaylist(id, public) -> Promise()

### getFollowedArtists(limit, after) -> Promise(Array)

### unfollowPeople(type, ids) -> Promise()

### unfollowPlaylist(id) -> Promise()


## Library

### checkAlbumsAreSaved(ids) -> Promise(Array)

### checkSongsAreSaved(ids) -> Promise(Array)

### getSavedAlbums() -> Promise(Array)

### getSavedSongs() -> Promise(Array)

### unsaveAlbums(ids) -> Promise()

### unsaveSongs(ids) -> Promise()

### saveAlbums(ids) -> Promise()

### saveSongs(ids) -> Promise()


## Personalisation

### getTop(type, limit, offset, time_range) -> Promise(Array)


## Player

### getAvailableDevices() -> Promise(Object)

### getPlaybackState() -> Promise(Object)

### getRecentlyPlayedSongs(limit, after, before) -> Promise(Array)

### getCurrentlyPlaying() -> Promise(Object)

### pausePlayer(device_id) -> Promise()

### setSeek(position_ms, device_id) -> Promise()

### setRepeatState(state, device_id) -> Promise()

### setPlayerVolume(volume_percent, device_id) -> Promise()

### skipSong(device_id) -> Promise()

### previousSong(device_id) -> Promise()

### playSongs(device_id, context_uri, songIds, offset, position_ms) -> Promise()

### resumePlayer(device_id) -> Promise()

### setShuffle(state, device_id) -> Promise()

### setPlaybackDevice(device, play) -> Promise()


## Playlist

### addSongsToPlaylist(playlistIds, songIds, position) -> Promise(Object)

### updatePlaylistInfo(id, info) -> Promise()

### createPlaylist(info) -> Promise(Object)

### getMyPlaylists() -> Promise(Array)

### getPlaylistCoverImage(id) -> Promise(Object)

### getPlaylist(id, fields) -> Promise(Object)

### getPlaylistSongs(id) -> Promise(Array)

### removeSongsFromPlaylist(playlistId, songIds, positions) -> Promise(Object)

### reorderPlaylist(id, start, end, newPosition) -> Promise(Object)

### replacePlaylistSongs(id, songs) -> Promise()

### setPlaylistCoverImage(id, image) -> Promise()

### deletePlaylist(id) -> Promise()


## Search

### search(q, types, market, limit, offset, include_external) -> Promise(Object)


## Song

### getSongAudioAnalysis(id) -> Promise(Object)

### getSongAudioFeatures(ids) -> Promise(Object)

### getSongData(ids) -> Promise(Object)


## Profile

### getUserProfile(id) -> Promise(Object)
