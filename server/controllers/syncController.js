const UserLibrary = require('../models/UserLibrary');

// Pull user library
exports.pullLibrary = async (req, res) => {
  try {
    const { userId } = req.params;
    let library = await UserLibrary.findOne({ userId });
    
    if (!library) {
      library = new UserLibrary({ userId });
      await library.save();
    }
    
    res.json(library);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Push user library updates
exports.pushLibrary = async (req, res) => {
  try {
    const { userId, type, data } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Validate type
    const validTypes = ['liked', 'recentlyPlayed', 'customPlaylists', 'following'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid sync type' });
    }

    let library = await UserLibrary.findOne({ userId });
    if (!library) {
      library = new UserLibrary({ userId });
    }
    
    library[type] = data;
    await library.save();
    
    res.json({ success: true, message: `${type} synced successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
