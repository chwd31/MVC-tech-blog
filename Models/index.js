const User = require('./user');
const Post = require('./post');

// Define associations between models
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post };
