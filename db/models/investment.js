var db = require('../config');

var Investment = db.Model.extend({
  tableName: 'investments',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User, 'user_id');
  }
});

module.exports = Investment;
