import axios from 'axios'

// Homepage
async function homepageData() {
  try {
    const language = localStorage.getItem('languages') || 'english'
    const params = { language: language.toLowerCase() }
    return await handleApi(params, '/api/modules')
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    throw error
  }
}

// Search
async function searchAll(searchText) {
  try {
    if (!searchText) {
      return
    }
    const params = { query: searchText }
    return await handleApi(params, '/api/search/all')
  } catch (error) {
    console.error('Error fetching playback song', error)
    throw error
  }
}

async function searchSpecific(type, query, page) {
  try {
    if (!type && !query) {
      return
    }
    // type should be 'songs' || 'albums' || 'artists' || 'playlists'
    const params = {
      page: page || 1,
      query: query,
    }
    return await handleApi(params, `/api/search/${type}`)
  } catch (error) {
    console.error('Error fetching playback song', error)
    throw error
  }
}

// Songs
async function songDetails(id) {
  try {
    if (id) {
      localStorage.setItem('playbackId', id)
      return await handleApi({ id: id }, '/api/songs')
    } else {
      const playbackId = localStorage.getItem('playbackId')
      if (playbackId) return
      const params = { id: playbackId }
      return await handleApi(params, '/api/songs')
    }
  } catch (error) {
    console.error('Error fetching playback song', error)
    throw error
  }
}

// Albums
async function albumDetails(albumId) {
  try {
    if (!albumId) {
      return
    }
    const params = { id: albumId }
    return await handleApi(params, '/api/albums')
  } catch (error) {
    console.error('Error fetching playlist details:', error)
    throw error
  }
}

// Playlist
async function playlistDetails(playlistId) {
  try {
    if (!playlistId) {
      return
    }
    const params = { id: playlistId }
    return await handleApi(params, '/api/playlists')
  } catch (error) {
    console.error('Error fetching playlist details:', error)
    throw error
  }
}

// Artists
async function artistDetails(artistId) {
  try {
    if (!artistId) {
      return
    }
    const params = { id: artistId }
    return await handleApi(params, '/api/artists')
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

async function artistSongs(artistId, page, category, sort) {
  try {
    if (!artistId) {
      return
    }
    const params = {
      page: page || 1,
      category: category || null, // alphabetical or latest
      sort: sort || null, // asc or desc
    }
    return await handleApi(params, `/api/artists/${artistId}/songs`)
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

async function artistAlbums(artistId, page, category, sort) {
  try {
    if (!artistId) {
      return
    }
    const params = {
      page: page || 1,
      category: category || null, // alphabetical or latest
      sort: sort || null, // asc or desc
    }
    return await handleApi(params, `/api/artists/${artistId}/albums`)
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

async function recommendedSongs(songId) {
  try {
    if (!songId) {
      return
    }
    const params = { id: songId }
    return await handleApi(params, `/api/songs/recommendations/`)
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

//Lyrics
async function lyrics(songName, artistName) {
  try {
    if (!songName || !artistName) {
      return null
    }
    // The inputs are passed with '+' replacing spaces, so revert them
    const cleanSongName = songName.replaceAll('+', ' ')
    const cleanArtistName = artistName.replaceAll('+', ' ')
    
    const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(cleanArtistName)}/${encodeURIComponent(cleanSongName)}`)
    if (response && response.status === 200) {
      return { data: { lyrics: response.data.lyrics } }
    }
    return null
  } catch (error) {
    console.error('Error fetching lyrics:', error)
    return null
  }
}

// Helper to recursively decode HTML entities in API responses
function decodeHtmlEntities(obj) {
  if (typeof obj === 'string') {
    return obj
      .replace(/&quot;?/g, '"')
      .replace(/&amp;?/g, '&')
      .replace(/&#039;?/g, "'")
      .replace(/&lt;?/g, '<')
      .replace(/&gt;?/g, '>')
  } else if (Array.isArray(obj)) {
    return obj.map(decodeHtmlEntities)
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {}
    for (const key in obj) {
      newObj[key] = decodeHtmlEntities(obj[key])
    }
    return newObj
  }
  return obj
}

// Common Method
async function handleApi(params, url) {
  try {
    const userId = localStorage.getItem('userId') || process.env.USERID_DEFAULT
    const options = {
      method: 'GET',
      url: url,
      params: params,
      headers: {
        userid: `${userId}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.request(options)
    if (response && response.status === 200) {
      return decodeHtmlEntities(response.data)
    } else {
      throw new Error('Failed to fetch data from API')
    }
  } catch (error) {
    console.error('An error occured:', error)
  }
}

export {
  homepageData,
  searchAll,
  searchSpecific,
  songDetails,
  albumDetails,
  playlistDetails,
  artistDetails,
  artistSongs,
  artistAlbums,
  recommendedSongs,
  lyrics,
}
