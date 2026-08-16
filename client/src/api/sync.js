/**
 * Local-only sync logic (No Backend Required)
 * The app natively persists data to localStorage, so these functions
 * now act as no-ops to prevent breaking existing components that call them.
 */

const getLocalUsers = () => JSON.parse(localStorage.getItem('localUsers') || '[]');
const saveLocalUsers = (users) => localStorage.setItem('localUsers', JSON.stringify(users));

export const pullUserLibrary = async (userId) => {
  const users = getLocalUsers();
  const user = users.find(u => u._id === userId);
  
  if (user) {
    // Restore the user's saved data into active localStorage
    if (user.liked) localStorage.setItem('liked', JSON.stringify(user.liked));
    else localStorage.removeItem('liked');
    
    if (user.recentlyPlayed) localStorage.setItem('recentlyPlayed', JSON.stringify(user.recentlyPlayed));
    else localStorage.removeItem('recentlyPlayed');
    
    if (user.customPlaylists) localStorage.setItem('customPlaylists', JSON.stringify(user.customPlaylists));
    else localStorage.removeItem('customPlaylists');
    
    if (user.following) localStorage.setItem('following', JSON.stringify(user.following));
    else localStorage.removeItem('following');
  }
  return null;
};

export const pushUserLibrary = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return null;
  
  const users = getLocalUsers();
  const userIndex = users.findIndex(u => u._id === userId);
  
  if (userIndex > -1) {
    // Save active localStorage state into the user's profile
    try {
      const liked = JSON.parse(localStorage.getItem('liked'));
      if (liked) users[userIndex].liked = liked;
    } catch(e) {}
    
    try {
      const recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed'));
      if (recentlyPlayed) users[userIndex].recentlyPlayed = recentlyPlayed;
    } catch(e) {}
    
    try {
      const customPlaylists = JSON.parse(localStorage.getItem('customPlaylists'));
      if (customPlaylists) users[userIndex].customPlaylists = customPlaylists;
    } catch(e) {}
    
    try {
      const following = JSON.parse(localStorage.getItem('following'));
      if (following) users[userIndex].following = following;
    } catch(e) {}
    
    saveLocalUsers(users);
  }
  return null;
};
