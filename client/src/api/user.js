// Local-only user authentication (No Backend Required)

const getLocalUsers = () => JSON.parse(localStorage.getItem('localUsers') || '[]');
const saveLocalUsers = (users) => localStorage.setItem('localUsers', JSON.stringify(users));

// User Register
const register = async (userData) => {
  try {
    const users = getLocalUsers();
    if (users.find(u => u.email === userData.email)) {
      return { error: 'User already exists' };
    }
    const newUser = {
      _id: [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      email: userData.email,
      password: userData.password, 
      username: 'New User',
      languages: ['English'],
      profilePic: null
    };
    users.push(newUser);
    saveLocalUsers(users);
    return { data: { ...newUser, userId: newUser._id } };
  } catch (error) {
    return { error: 'Registration failed' };
  }
};

// User Login
const login = async (userData) => {
  try {
    const users = getLocalUsers();
    const user = users.find(u => u.email === userData.email && u.password === userData.password);
    if (user) {
      sessionStorage.setItem('authToken', 'mock_token_' + user._id);
      localStorage.setItem('userId', user._id);
      return { data: { ...user, userId: user._id }, message: 'Successfully Logged In' };
    }
    return { error: 'Invalid email or password' };
  } catch (error) {
    return { error: 'Login failed' };
  }
};

// Update Username
const updateUsername = async (data) => {
  try {
    const users = getLocalUsers();
    const userIndex = users.findIndex(u => u._id === data.userId);
    if (userIndex > -1) {
      users[userIndex].username = data.username;
      saveLocalUsers(users);
      return users[userIndex];
    }
    return { error: 'User not found' };
  } catch (error) {
    return { error: 'Update failed' };
  }
};

// Update ProfilePic
const imageUploader = async (pic, userId) => {
  try {
    const users = getLocalUsers();
    const userIndex = users.findIndex(u => u._id === userId);
    if (userIndex > -1) {
      // Mock upload by just using a fake URL or reading it as a data URL
      // For simplicity in the mock, we'll just return a success state. 
      // Realistically, converting the file to Base64 to store in localStorage would work.
      return { success: true }; 
    }
    return { error: 'User not found' };
  } catch (error) {
    return { error: 'Upload failed' };
  }
};

// Add Languages
const addLanguages = async (data) => {
  try {
    const users = getLocalUsers();
    const userIndex = users.findIndex(u => u._id === data.userId);
    if (userIndex > -1) {
      users[userIndex].languages = data.languages;
      saveLocalUsers(users);
      return users[userIndex];
    }
    return { error: 'User not found' };
  } catch (error) {
    return { error: 'Failed to update languages' };
  }
};

const updateOptions = async (body, action, url) => {
  // Originally used for custom backend updates, now a no-op since localStorage handles it.
  return { success: true };
};

export {
  register,
  login,
  updateUsername,
  imageUploader,
  addLanguages,
  updateOptions,
};
