import axios from 'axios';

/**
 * Sync logic to backup and restore localStorage data using the new MongoDB backend
 */

export const pullUserLibrary = async (userId) => {
  if (!userId) return;
  try {
    const response = await axios.get(`/api/local-sync/pull/${userId}`);
    if (response.data) {
      const { liked, recentlyPlayed, customPlaylists, following } = response.data;
      
      localStorage.setItem('liked', JSON.stringify(liked || []));
      localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed || []));
      localStorage.setItem('customPlaylists', JSON.stringify(customPlaylists || []));
      localStorage.setItem('following', JSON.stringify(following || []));
      
      return response.data;
    }
  } catch (error) {
    console.error('Failed to pull user library from MongoDB:', error);
  }
};

export const pushUserLibrary = async (type, data) => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  
  try {
    await axios.post('/api/local-sync/push', {
      userId,
      type,
      data
    });
  } catch (error) {
    console.error(`Failed to sync ${type} to MongoDB:`, error);
  }
};
