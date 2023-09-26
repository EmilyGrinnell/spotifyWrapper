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
- include_groups : types of album to include, valid options are `album`, `single`, `appears_on`, `compilation`

### getArtistTopSongs(id : String, country? : String) -> Promise(Object)
Get top songs from an artist
- id : the ID of the artist
- country : an [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Defaults to using the country associated with the access token

### getRelatedArtists(id : String) -> Promise(Object)
Get related artists
- id : the ID of the artist to find other artists related to


## Browse

### getCategory()
### getCategoryPlaylists()
### getCategories()
### getFeaturedPlaylists()
### getNewReleases()
### getRecommendations()


## Follow

### checkPeopleFollowed()
### checkPlaylistFollowed()
### followPeople()
### followPlaylist()
### getFollowedArtists()
### unfollowPeople()
### unfollowPlaylist()


## Library

### checkAlbumsAreSaved()
### checkSongsAreSaved()
### getSavedAlbums()
### getSavedSongs()
### unsaveAlbums()
### unsaveSongs()
### saveAlbums()
### saveSongs()


## Personalisation

### getTop()


## Player

### getAvailableDevices()
### getPlaybackState()
### getRecentlyPlayedSongs()
### getCurrentlyPlaying()
### pausePlayer()
### setSeek()
### setRepeatState()
### setPlayerVolume()
### skipSong()
### previousSong()
### playSongs()
### resumePlayer()
### setShuffle()
### setPlaybackDevice()


## Playlist

### addSongsToPlaylist()
### updatePlaylistInfo()
### createPlaylist()
### getMyPlaylists()
### getPlaylistCoverImage()
### getPlaylist()
### getPlaylistSongs()
### removeSongsFromPlaylist()
### reorderPlaylist()
### replacePlaylistSongs()
### setPlaylistCoverImage()
### deletePlaylist()


## Search

### search()


## Song

### getSongAudioAnalysis()
### getSongAudioFeatures()
### getSongData()


## Profile

### getUserProfile()